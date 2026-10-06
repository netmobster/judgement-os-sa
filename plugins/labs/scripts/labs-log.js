#!/usr/bin/env node
// labs-log.js: the only writer of the Judgement OS log: the settings' `log` (jos-settings.js), by
// default ~/.claude/judgement-os/log.jsonl. State lives in the operator's folder, never in a plugin. Append-only: a line is never rewritten. A
// verdict that arrives later (the strong judge running in the background) is its own line,
// joined to the first by `call`.
//
//   node labs-log.js add '<json>'            one line: see FIELDS below
//   node labs-log.js show [--run <id>] [--last N]
//   node labs-log.js summary [--run <id>]    counts for the results page (never percentages)
//   node labs-log.js cases [--batch <id>]    one case batch, judged against each case's expectation
//   node labs-log.js blind                   every /labs:try and Jay's blind picks, in counts
//   node labs-log.js --test
//
// Test override: JAY_LABS_LOG (the file path).

const fs = require('fs');
const path = require('path');
const os = require('os');

// The install's settings say where the log lives (jos-settings). JAY_LABS_LOG still wins, for tests.
const LOG = process.env.JAY_LABS_LOG || require('./jos-settings').logPath();
const VERDICTS = ['proceed', 'clarify', 'challenge', 'redirect'];
const CONFIDENCE = ['low', 'medium', 'high'];
const SETTLED = ['jay', 'user', 'picker', 'typed', 'dismissed', 'rule', 'named'];
const MODELS = ['sonnet', 'opus'];
const PICKS = ['sonnet', 'opus', 'both', 'neither'];
// FIELDS
//   call        id shared by every line about one consultation (required)
//   run         "cases" | "live" | "blind" (required)
//   batch       one run of the case set, e.g. "cases-20261001-2240" (cases only)
//   case, name  A..E and the case's name (cases only)
//   expected    the case's expected outcome, e.g. "challenge → project" (cases only)
//   note        a remark about a whole batch, such as how it was run. Its call is the batch id
//   scenario    what morning a /labs:try was about ("Today (live board and handoff)", or Jay's)
//   ruleWouldAsk, forced   would the rule alone have asked; did Jay say "ask anyway"
//   order       blind runs: [judge 1's model, judge 2's model], drawn by code at random
//   pick        blind runs: the model Jay preferred, or "both" or "neither"; judge: the number he saw
//   point       the marked decision, e.g. "boot.style"
//   consulted   bool: did the "consult only if" rule fire
//   default     boot's own pick
//   model       "sonnet" | "opus" (when a verdict is attached)
//   verdict, confidence, why, fact, suggestion   the judge's answer
//   invalid     true when the answer didn't parse or broke a rule; `reason` says which
//   ms          judge latency in milliseconds
//   shown       bool: was it put in front of Jay
//   final       what actually happened (the style used, or the redirect taken)
//   settledBy   "jay" or "user" (the person answered the Second Opinion; "user" since 2 Oct) | "picker" (the normal style picker,
//               nothing shown) | "typed" (he named the style before any picker) | "dismissed"
//               | "rule" (the skill's own pick stood, nothing shown) | "named" (Jay named the answer)
//   consultWhy  why the rule asked the judge (every marked decision logs it; the primitive's audit list)
//   shownModel  which judge's answer is the one used and shown (open line). Missing means sonnet, which
//               is what every call before 1 Oct 23:45 used. Calls since 2 Oct use `combined` instead
//   role        "small" | "big": which of the two judges gave this verdict (2 Oct). Missing on older
//               lines, and on /labs:try and /labs:cases, which compare models rather than seats
//   combined    the two judges' outcome, written by record.js combine: {show, rule, lead, suggestion,
//               other, agreed, raised, late, small, big}. The last one for a call is the one that counts
const ROLES = ['small', 'big'];

function validate(e) {
  const errs = [];
  if (!e.call) errs.push('call is required');
  if (!['cases', 'live', 'blind'].includes(e.run)) errs.push('run must be cases, live or blind');
  if (e.verdict !== undefined && !VERDICTS.includes(e.verdict)) errs.push(`verdict must be one of ${VERDICTS.join(', ')}`);
  if (e.confidence !== undefined && !CONFIDENCE.includes(e.confidence)) errs.push(`confidence must be one of ${CONFIDENCE.join(', ')}`);
  if (e.verdict && e.verdict !== 'proceed' && !e.fact) errs.push('a non-proceed verdict must name the fact it rests on (rule: no invented motives)');
  if (e.settledBy !== undefined && !SETTLED.includes(e.settledBy)) errs.push(`settledBy must be one of ${SETTLED.join(', ')}`);
  if (e.pick !== undefined && !PICKS.includes(e.pick)) errs.push(`pick must be one of ${PICKS.join(', ')}`);
  if (e.role !== undefined && !ROLES.includes(e.role)) errs.push(`role must be one of ${ROLES.join(', ')}`);
  if (e.order !== undefined && !(Array.isArray(e.order) && e.order.length === 2 && e.order.every(m => MODELS.includes(m)) && e.order[0] !== e.order[1])) errs.push('order must be both models, each once');
  return errs;
}

function add(e) {
  const errs = validate(e);
  if (errs.length) throw new Error(errs.join('; '));
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  const line = Object.assign({ at: new Date().toISOString() }, e);
  fs.appendFileSync(LOG, JSON.stringify(line) + '\n');
  return line;
}

function all() {
  try { return fs.readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)); }
  catch (e) { return []; }
}

function group(rows) {
  const calls = new Map();
  rows.forEach(r => { if (!calls.has(r.call)) calls.set(r.call, []); calls.get(r.call).push(r); });
  return calls;
}

// "/day:checkin", "/checkin" and "the end-of-day check-in" all come down to …checkin.
const norm = s => String(s || '').toLowerCase().replace(/^\s*\/(day:)?/, '').replace(/[^a-z0-9]/g, '');
const same = (a, b) => !!a && !!b && (norm(a) === norm(b) || norm(a).includes(norm(b)) || norm(b).includes(norm(a)));

// Does a verdict line fit a case's expectation? "challenge → project", "clarify or challenge →
// general", "redirect → /day:checkin", "proceed". A clarify needn't name a target.
function matches(expected, v) {
  if (!expected || !v || !v.verdict) return false;
  const [lhs, rhs] = expected.split('→').map(s => s && s.trim());
  if (!lhs.split(/\s+or\s+/).includes(v.verdict)) return false;
  if (!rhs) return true;
  if (v.verdict === 'clarify') return !v.suggestion || norm(v.suggestion).includes(norm(rhs));
  return !!v.suggestion && norm(v.suggestion).includes(norm(rhs));
}

// Counts only. Never a percentage or a score (Jay's rule).
// `point` narrows it to one marked decision (boot.style, sexyhtml.style…), judged by each call's open line.
function summary(run, point) {
  // judgesInterrupted: the two judges' outcome reached Jay. judgesHeldBack: a judge disagreed and
  // the interrupt rule kept it quiet. lateAnswers: answers dropped for passing the timeout.
  const s = { calls: 0, noCall: 0, consultations: 0, byModel: {}, invalidByModel: {}, modelsAgreed: 0, modelsDisagreed: 0, judgesInterrupted: 0, judgesHeldBack: 0, lateAnswers: 0, shownToJay: 0, jayTook: 0, jayKept: 0, medianMs: {} };
  const ms = {};
  group(all().filter(r => !run || r.run === run)).forEach(lines => {
    if (lines.every(l => l.note && l.consulted === undefined && !l.verdict && !l.final)) return;   // a batch note
    if (point && (lines.find(l => l.point) || {}).point !== point) return;
    s.calls++;
    const open = lines.find(l => l.consulted !== undefined) || lines[0];
    if (open.consulted === false) { s.noCall++; return; }
    s.consultations++;
    const verdicts = lines.filter(l => l.verdict);
    verdicts.forEach(v => {
      const m = v.model || 'unknown';
      s.byModel[m] = s.byModel[m] || { proceed: 0, clarify: 0, challenge: 0, redirect: 0 };
      s.byModel[m][v.verdict]++;
      if (v.ms) (ms[m] = ms[m] || []).push(v.ms);
    });
    lines.filter(l => l.invalid).forEach(l => { const m = l.model || 'unknown'; s.invalidByModel[m] = (s.invalidByModel[m] || 0) + 1; });
    const byM = {};
    verdicts.forEach(v => { byM[v.role || v.model] = v.verdict + ':' + norm(v.suggestion); });   // a seat, or a model before 2 Oct
    if (Object.keys(byM).length >= 2) { if (new Set(Object.values(byM)).size === 1) s.modelsAgreed++; else s.modelsDisagreed++; }
    const comb = (lines.filter(l => l.combined).pop() || {}).combined;
    if (comb) {
      if (comb.show) s.judgesInterrupted++;
      else if ((comb.raised || []).length) s.judgesHeldBack++;
      s.lateAnswers += (comb.late || []).length;
    }
    const close = lines.filter(l => l.final).pop();
    if (close && close.shown) {
      s.shownToJay++;
      // Since 2 Oct the combined outcome is what was shown, its second option included.
      const used = comb || verdicts.find(v => v.model === (open.shownModel || 'sonnet')) || verdicts[0];
      if (used && (same(close.final, used.suggestion) || same(close.final, used.other))) s.jayTook++;
      else if (close.final === open.default) s.jayKept++;
    }
  });
  Object.entries(ms).forEach(([m, arr]) => { const a = arr.slice().sort((x, y) => x - y); s.medianMs[m] = a[Math.floor((a.length - 1) / 2)]; });
  return s;
}

function batches() {
  const seen = [];
  all().filter(r => r.run === 'cases' && r.batch).forEach(r => { if (!seen.includes(r.batch)) seen.push(r.batch); });
  return seen;
}

// One case batch, one row per case, each model's verdict judged against the expectation.
function cases(batch) {
  const b = batch || batches().pop();
  if (!b) return { batch: null, rows: [], notes: [] };
  const rows = [], notes = [];
  group(all().filter(r => r.run === 'cases' && r.batch === b)).forEach(lines => {
    if (!lines.some(l => l.case)) { lines.filter(l => l.note).forEach(l => notes.push(l.note)); return; }
    const open = lines.find(l => l.case) || lines[0];
    const row = { case: open.case, name: open.name, consulted: open.consulted, default: open.default, expected: open.expected, models: {} };
    lines.filter(l => l.verdict || l.invalid).forEach(v => {
      row.models[v.model] = v.invalid
        ? { invalid: true, reason: v.reason || 'no valid answer', ms: v.ms }
        : { verdict: v.verdict, confidence: v.confidence, why: v.why, fact: v.fact, suggestion: v.suggestion, ms: v.ms, asExpected: matches(open.expected, v) };
    });
    rows.push(row);
  });
  rows.sort((x, y) => String(x.case).localeCompare(String(y.case)));
  return { batch: b, rows, notes };
}

// Every /labs:try, newest last: what was asked, what each judge said, and Jay's blind pick.
function blind() {
  const out = [];
  group(all().filter(r => r.run === 'blind')).forEach(lines => {
    const open = lines.find(l => l.consulted !== undefined) || lines[0];
    const models = {};
    lines.filter(l => l.verdict || l.invalid).forEach(v => {
      models[v.model] = v.invalid ? { invalid: true, reason: v.reason, ms: v.ms }
        : { verdict: v.verdict, confidence: v.confidence, why: v.why, fact: v.fact, suggestion: v.suggestion, ms: v.ms };
    });
    const p = lines.filter(l => l.pick).pop();
    out.push({ call: open.call, at: open.at, scenario: open.scenario, default: open.default, consulted: open.consulted, ruleWouldAsk: open.ruleWouldAsk, forced: open.forced, order: open.order, models, pick: p ? p.pick : null, judge: p ? p.judge : null, why: p ? p.why : null });
  });
  return out;
}

// Counts only. A try with no pick yet is "open"; one where no judge was asked is "noCall".
function blindPicks() {
  const s = { tries: 0, noCall: 0, open: 0, sonnet: 0, opus: 0, both: 0, neither: 0 };
  blind().forEach(b => {
    s.tries++;
    if (!b.consulted) s.noCall++;
    else if (!b.pick) s.open++;
    else s[b.pick]++;
  });
  return s;
}

if (require.main === module) {
  const [cmd, ...rest] = process.argv.slice(2);
  const opt = k => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : undefined; };
  if (cmd === '--test') {
    const tmp = path.join(os.tmpdir(), `labs-log-test-${process.pid}.jsonl`);
    process.env.JAY_LABS_LOG = tmp;
    delete require.cache[require.resolve(__filename)];
    const L = require(__filename);
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const throws = f => { try { f(); return false; } catch (e) { return true; } };
    try { fs.unlinkSync(tmp); } catch (e) {}
    ok('rejects a missing call id', throws(() => L.add({ run: 'cases' })));
    ok('rejects a bad verdict', throws(() => L.add({ call: 'x', run: 'cases', verdict: 'maybe' })));
    ok('rejects a challenge with no fact', throws(() => L.add({ call: 'x', run: 'cases', verdict: 'challenge', confidence: 'high' })));
    ok('rejects an unknown settledBy', throws(() => L.add({ call: 'x', run: 'live', final: 'bare', settledBy: 'judge' })));
    ok('accepts rule and named', L.validate({ call: 'x', run: 'live', settledBy: 'rule' }).length === 0 && L.validate({ call: 'x', run: 'live', settledBy: 'named' }).length === 0);
    ok('a judge sits in the small seat or the big one', throws(() => L.add({ call: 'x', run: 'live', role: 'medium' })) && L.validate({ call: 'x', run: 'live', role: 'big' }).length === 0);
    // live: one no-call, one shown-and-taken, one shown-and-kept, one not shown
    L.add({ call: 'l1', run: 'live', consulted: false, default: 'general' });
    L.add({ call: 'l1', run: 'live', final: 'general', settledBy: 'picker', shown: false });
    L.add({ call: 'l2', run: 'live', consulted: true, default: 'general', model: 'sonnet', verdict: 'challenge', confidence: 'medium', fact: 'f', suggestion: 'project', ms: 9000 });
    L.add({ call: 'l2', run: 'live', model: 'opus', verdict: 'challenge', confidence: 'high', fact: 'f', suggestion: 'project', ms: 21000 });
    L.add({ call: 'l2', run: 'live', final: 'project', settledBy: 'jay', shown: true });
    L.add({ call: 'l3', run: 'live', consulted: true, default: 'general', model: 'sonnet', verdict: 'redirect', confidence: 'high', fact: 'g', suggestion: '/day:checkin', ms: 7000 });
    L.add({ call: 'l3', run: 'live', model: 'opus', verdict: 'proceed', confidence: 'medium', ms: 19000 });
    L.add({ call: 'l3', run: 'live', final: 'general', settledBy: 'jay', shown: true });
    L.add({ call: 'l4', run: 'live', consulted: true, default: 'bare', model: 'sonnet', invalid: true, reason: 'no fact' });
    L.add({ call: 'l4', run: 'live', final: 'bare', settledBy: 'typed', shown: false });
    const s = L.summary('live');
    ok('counts the no-call', s.noCall === 1);
    ok('counts consultations', s.consultations === 3);
    ok('shown twice: taken once, kept once', s.shownToJay === 2 && s.jayTook === 1 && s.jayKept === 1);
    ok('models agreed once, disagreed once', s.modelsAgreed === 1 && s.modelsDisagreed === 1);
    ok('median latency per model', s.medianMs.sonnet === 7000 && s.medianMs.opus === 19000);
    ok('counts an invalid answer', s.invalidByModel.sonnet === 1);
    L.add({ call: 'p1', run: 'live', point: 'sexyhtml.style', consulted: false, default: 'jay' });
    L.add({ call: 'p1', run: 'live', final: 'jay', settledBy: 'rule', shown: false });
    ok('point narrows the summary to one decision', L.summary('live', 'sexyhtml.style').calls === 1 && L.summary('live').calls === 5);
    L.add({ call: 'o1', run: 'live', point: 'boot.style', consulted: true, default: 'general', shownModel: 'opus' });
    L.add({ call: 'o1', run: 'live', model: 'sonnet', verdict: 'proceed', confidence: 'high' });
    L.add({ call: 'o1', run: 'live', model: 'opus', verdict: 'challenge', confidence: 'high', fact: 'f', suggestion: 'project' });
    L.add({ call: 'o1', run: 'live', final: 'project', settledBy: 'jay', shown: true });
    ok('the shown judge is the one on the open line', L.summary('live', 'boot.style').jayTook === 1);
    // cases: expectation matching
    ok('challenge → project matches', L.matches('challenge → project', { verdict: 'challenge', suggestion: 'project' }));
    ok('clarify needs no target', L.matches('clarify or challenge → general', { verdict: 'clarify', suggestion: null }));
    ok('a redirect matches the skill however it is written', L.matches('redirect → /day:checkin', { verdict: 'redirect', suggestion: 'the end-of-day check-in' }));
    ok('a wrong target does not match', !L.matches('challenge → project', { verdict: 'challenge', suggestion: 'bare' }));
    ok('proceed matches proceed only', L.matches('proceed', { verdict: 'proceed' }) && !L.matches('proceed', { verdict: 'clarify', suggestion: null }));
    L.add({ call: 'b1-B', run: 'cases', batch: 'b1', case: 'B', name: 'Context', consulted: true, default: 'general', expected: 'challenge → project' });
    L.add({ call: 'b1-B', run: 'cases', batch: 'b1', model: 'sonnet', verdict: 'challenge', confidence: 'medium', fact: 'f', suggestion: 'project' });
    L.add({ call: 'b1-B', run: 'cases', batch: 'b1', model: 'opus', verdict: 'proceed', confidence: 'high' });
    L.add({ call: 'b2-A', run: 'cases', batch: 'b2', case: 'A', name: 'Clear', consulted: false, default: 'general', expected: '(no call)' });
    L.add({ call: 'b1', run: 'cases', batch: 'b1', note: 'ran through stand-in agents' });
    const c1 = L.cases('b1');
    ok('a case batch judges each model', c1.rows.length === 1 && c1.rows[0].models.sonnet.asExpected === true && c1.rows[0].models.opus.asExpected === false);
    ok('a batch note is a note, not a case', c1.notes.length === 1 && c1.rows.length === 1 && L.summary('cases').calls === 2);
    ok('the latest batch by default', L.cases().batch === 'b2' && L.batches().length === 2);
    ok('append-only: 21 lines', L.all().length === 21);
    ok('rejects a blind order that repeats a model', throws(() => L.add({ call: 't', run: 'blind', order: ['opus', 'opus'] })));
    ok('rejects an unknown pick', throws(() => L.add({ call: 't', run: 'blind', pick: 'judge 1' })));
    L.add({ call: 't1', run: 'blind', scenario: 'today', consulted: true, ruleWouldAsk: false, forced: true, default: 'general', order: ['opus', 'sonnet'] });
    L.add({ call: 't1', run: 'blind', model: 'opus', verdict: 'proceed', confidence: 'high' });
    L.add({ call: 't1', run: 'blind', model: 'sonnet', verdict: 'challenge', confidence: 'low', fact: 'x', suggestion: 'bare' });
    L.add({ call: 't1', run: 'blind', pick: 'opus', judge: 1 });
    L.add({ call: 't2', run: 'blind', scenario: 'made up', consulted: false, ruleWouldAsk: false, forced: false, default: 'general' });
    const bp = L.blindPicks();
    ok('blind picks are counted per model', bp.tries === 2 && bp.opus === 1 && bp.noCall === 1 && bp.sonnet === 0);
    ok('a blind try keeps its order and both answers', L.blind()[0].order[0] === 'opus' && L.blind()[0].models.sonnet.verdict === 'challenge');
    try { fs.unlinkSync(tmp); } catch (e) {}
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  if (cmd === 'add') { const line = add(JSON.parse(rest.join(' '))); console.log('logged ' + line.call); }
  else if (cmd === 'show') { let rows = all().filter(r => !opt('run') || r.run === opt('run')); const k = Number(opt('last')); if (k) rows = rows.slice(-k); rows.forEach(r => console.log(JSON.stringify(r))); }
  else if (cmd === 'summary') { console.log(JSON.stringify(summary(opt('run')), null, 2)); }
  else if (cmd === 'cases') { console.log(JSON.stringify(cases(opt('batch')), null, 2)); }
  else if (cmd === 'blind') { console.log(JSON.stringify({ picks: blindPicks(), tries: blind() }, null, 2)); }
  else { console.error('usage: labs-log.js add <json> | show [--run id] [--last N] | summary [--run id] | cases [--batch id] | --test'); process.exit(2); }
}
module.exports = { add, all, summary, cases, batches, blind, blindPicks, matches, validate, norm, same, LOG };
