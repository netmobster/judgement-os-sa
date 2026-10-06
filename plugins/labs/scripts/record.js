#!/usr/bin/env node
// record.js: everything around the Second Opinion that isn't the judge. Every write goes
// through labs-log.js.
//
//   node record.js open-cases [--only B,C]
//       Start a case batch: log each case as asked, and print each case's question.
//   node record.js verdict --call <id> --run <cases|live> --model <model> --file <answer> [--role small|big] [--batch <id>] [--ms N] [--point <p>]
//       Read the judge's answer from --file (written with the Write tool, so model output never
//       passes through a shell; stdin works too, for tests), check
//       it against the rules, and log it, or log it as invalid with the reason. --role says which
//       of a live call's two judges answered.
//   node record.js note --batch <id> --file <text>
//       A remark about a whole batch, such as how it was run. It shows on the results page.
//   node record.js url [<artifact url>]
//       The results page's address, so every run updates the same page.
//   node record.js open --decision <decision file> --run <live|cases|blind> --point <p> [--prefix <id prefix>] [--shown-model opus|sonnet]
//       Any skill's marked decision: log the call as asked, with the rule's pick and the reason the
//       judges were (or weren't) consulted. Prints {call, consult, default, question} and, when it
//       consults, the two judges to ask, from the settings.
//   node record.js combine --call <id>
//       Both judges' answers, one outcome: whether the person hears about it, and what to show.
//   node record.js close --call <id> --final <what happened> --settled-by <how> [--shown]
//       The call's last line: what was actually used, and who settled it.
//   node record.js try-open --decision <style-default output> [--scenario <scenario file>]
//       Start a /labs:try. Code draws which model is Judge 1, at random, and logs it.
//   node record.js try-show --call <id>
//       Both answers as Judge 1 and Judge 2, with no model names, for Jay's blind pick.
//   node record.js try-pick --call <id> --pick <1|2|both|neither> [--why-file <text>]
//       Log Jay's pick, then reveal which model was which. One pick per try.
//   node record.js --test

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const L = require('./labs-log');

const CASES = path.join(__dirname, '..', 'cases');
const URLFILE = path.join(path.dirname(L.LOG), 'results.json');
// The silo, in code: an answer that names any of these is not shown and not counted.
// The private topics come from the install's settings (jos-settings), never from this file.
const S = require('./jos-settings');

function stamp(d) {
  const p = {};
  for (const { type, value } of new Intl.DateTimeFormat('en-CA', { timeZone: S.timezone(), year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d)) p[type] = value;
  return `${p.year}${p.month}${p.day}-${p.hour}${p.minute}`;
}

function openCases(only, now = new Date()) {
  const { decide, caseInputs } = require('./style-default');   // boot's rule: LABS only, so loaded only here
  let batch = 'cases-' + stamp(now);
  if (L.batches().includes(batch)) batch += '-' + Date.now().toString(36).slice(-3);
  const out = [];
  for (const f of fs.readdirSync(CASES).filter(f => f.endsWith('.json')).sort()) {
    const letter = f.split('-')[0].toUpperCase();   // A, B, C, D1, D2, E
    if (only && !only.includes(letter)) continue;
    const c = JSON.parse(fs.readFileSync(path.join(CASES, f), 'utf8'));
    const d = decide(caseInputs(path.join(CASES, f)));
    const call = `${batch}-${letter}`;
    L.add({ call, run: 'cases', batch, case: letter, name: c.name, point: 'boot.style', consulted: d.consult, default: d.default, expected: c.expect.verdict });
    out.push({ case: letter, name: c.name, call, consult: d.consult, default: d.default, expected: c.expect.verdict, question: d.question || null });
  }
  return { batch, cases: out };
}

// The judge is told to answer with JSON only. Take the first object it gave, fenced or not.
function parse(raw) {
  const s = String(raw || '').replace(/```(?:json)?/gi, '').trim();
  try { return JSON.parse(s); } catch (e) {}
  const m = s.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return null;
}

function check(answer) {
  const a = parse(answer);
  if (!a || typeof a !== 'object') return { ok: false, reason: 'the answer was not JSON' };
  const e = {
    verdict: String(a.verdict || '').toLowerCase().trim(),
    confidence: String(a.confidence || '').toLowerCase().trim(),
    why: a.why ? String(a.why) : undefined,
    fact: a.fact && a.fact !== 'null' ? String(a.fact) : undefined,
    suggestion: a.suggestion && a.suggestion !== 'null' ? String(a.suggestion) : undefined,
  };
  const errs = L.validate(Object.assign({ call: 'x', run: 'cases' }, e));
  if (!e.confidence) errs.push('no confidence');
  if (errs.length) return { ok: false, reason: errs.join('; ') };
  const hit = [e.why, e.fact, e.suggestion].join(' ').match(S.silo());
  if (hit) return { ok: false, reason: `silo: the answer mentions "${hit[0]}"` };
  return { ok: true, entry: e };
}

function verdict(opts, answer) {
  const base = { call: opts.call, run: opts.run, model: opts.model };
  if (opts.role) base.role = opts.role;
  if (opts.batch) base.batch = opts.batch;
  if (opts.point) base.point = opts.point;
  if (opts.ms) base.ms = Number(opts.ms);
  const r = check(answer);
  if (!r.ok) { L.add(Object.assign(base, { invalid: true, reason: r.reason, raw: String(answer).slice(0, 600) })); return `logged ${opts.call} ${opts.model}: invalid (${r.reason})`; }
  L.add(Object.assign(base, r.entry));
  return `logged ${opts.call} ${opts.model}: ${r.entry.verdict} (${r.entry.confidence})${r.entry.suggestion ? ' → ' + r.entry.suggestion : ''}`;
}

function url(set) {
  if (set) {
    if (!/^https:\/\/claude\.ai\//.test(set)) throw new Error('not a claude.ai artifact url');
    fs.mkdirSync(path.dirname(URLFILE), { recursive: true });
    fs.writeFileSync(URLFILE, JSON.stringify({ url: set, at: new Date().toISOString() }) + '\n');
    return set;
  }
  try { return JSON.parse(fs.readFileSync(URLFILE, 'utf8')).url; } catch (e) { return null; }
}

// ---- any marked decision: open and close ----------------------------------------------
function newCall(prefix, now = new Date()) {
  let call = `${prefix}-${stamp(now)}`;
  if (L.all().some(r => r.call === call)) call += '-' + crypto.randomBytes(2).toString('hex');
  return call;
}

function open(decision, { run = 'live', point, prefix, shownModel } = {}) {
  if (!point) throw new Error('open needs a point, the marked decision (e.g. boot.style)');
  const call = newCall(prefix || point.split('.')[0]);
  const line = { call, run, point, consulted: !!decision.consult, default: decision.default };
  if (decision.ruleWouldAsk !== undefined) line.ruleWouldAsk = !!decision.ruleWouldAsk;
  if (decision.forced) line.forced = true;
  if (decision.named) line.named = decision.named;
  if (shownModel) { if (!['sonnet', 'opus'].includes(shownModel)) throw new Error('shownModel must be sonnet or opus'); line.shownModel = shownModel; }
  if ((decision.consultWhy || []).length) line.consultWhy = decision.consultWhy;
  L.add(line);
  const out = { call, consult: line.consulted, default: line.default, question: decision.question || null };
  if (line.consulted) {
    const j = S.judges();
    out.judges = { small: j.small, big: j.big, interrupt: j.interrupt, timeoutSeconds: j.timeoutSeconds };
    // The Agent tool takes a model per call but no effort: effort comes from the agent's own file.
    const odd = ['small', 'big'].filter(r => j[r].effort && j[r].effort !== 'default');
    if (odd.length) out.notes = [`effort isn't wired yet: the ${odd.join(' and ')} judge runs at the agent's own effort`];
  }
  return out;
}

// ---- two judges, one outcome (2 Oct 2026) ------------------------------------------------
// A consulting decision asks two judges at once, a small one and a big one (the settings'
// `judges`). combine applies the interrupt rule to their answers, so no skill has to:
//   both    the person hears about it only when both judges disagree with the rule, each at
//           medium or high confidence (the default). The big judge's answer leads; the small
//           one's suggestion comes along as a second option when it differs.
//   either  when either judge does; the big one leads when both do
//   big     when the big judge does; the small one is logged, never shown
// A judge slower than timeoutSeconds counts as no answer: its line stays in the log and the outcome
// ignores it. The skill still waits for both answers; cutting the wait short is a follow-up.
const RULES = ['both', 'either', 'big'];
const SEATS = ['small', 'big'];
const raises = a => a.status === 'answered' && a.verdict !== 'proceed' && ['medium', 'high'].includes(a.confidence);

function combine(call, { judges = S.judges() } = {}) {
  const lines = L.all().filter(r => r.call === call);
  if (!lines.length) throw new Error(`no such call: ${call}`);
  const rule = RULES.includes(judges.interrupt) ? judges.interrupt : 'both';
  const limit = Number(judges.timeoutSeconds) > 0 ? Number(judges.timeoutSeconds) * 1000 : Infinity;
  const answers = lines.filter(l => l.model && (l.verdict || l.invalid));
  const unroled = answers.filter(a => !a.role);
  // Each seat's latest answer: by the role it was recorded with, or else by its model. Two seats on
  // one model, recorded without roles: the first answer is the small judge's, the second the big one's.
  const find = role => {
    const byRole = answers.filter(a => a.role === role);
    if (byRole.length) return byRole[byRole.length - 1];
    if (judges.small.model === judges.big.model) return unroled[role === 'small' ? 0 : 1];
    return unroled.filter(a => a.model === judges[role].model).pop();
  };
  const seats = {};
  SEATS.forEach(role => {
    const a = find(role);
    seats[role] = !a ? { status: 'missing' }
      : a.invalid ? { status: 'invalid', model: a.model }
      : a.ms > limit ? { status: 'late', model: a.model, ms: a.ms }
      : { status: 'answered', model: a.model, verdict: a.verdict, confidence: a.confidence, why: a.why || null, fact: a.fact || null, suggestion: a.suggestion || null };
  });
  const up = r => raises(seats[r]);
  const lead = rule === 'both' ? (up('small') && up('big') ? 'big' : null)
    : rule === 'either' ? (up('big') ? 'big' : up('small') ? 'small' : null)
    : (up('big') ? 'big' : null);
  const out = { call, rule, show: !!lead };
  if (lead) {
    const a = seats[lead], b = seats[lead === 'big' ? 'small' : 'big'];
    Object.assign(out, { lead, verdict: a.verdict, confidence: a.confidence, why: a.why, fact: a.fact, suggestion: a.suggestion });
    if (rule !== 'big' && raises(b) && b.suggestion && L.norm(b.suggestion) !== L.norm(a.suggestion)) out.other = b.suggestion;
  }
  const said = r => {
    const s = seats[r];
    if (s.status !== 'answered') return `the ${r} judge ${{ missing: 'never answered', invalid: 'gave no valid answer', late: 'was too slow' }[s.status]}`;
    return `the ${r} judge ${up(r) ? 'disagrees' : s.verdict === 'proceed' ? 'agrees with the rule' : 'only has a hunch'}`;
  };
  out.reason = `${said('small')}; ${said('big')}${lead ? '' : ': the rule stands'}`;
  out.agreed = SEATS.every(r => seats[r].status === 'answered') && seats.small.verdict === seats.big.verdict && L.norm(seats.small.suggestion) === L.norm(seats.big.suggestion);
  const first = lines.find(l => l.consulted !== undefined) || lines[0];
  L.add({ call, run: first.run, combined: { show: out.show, rule, lead: lead || null, suggestion: out.suggestion || null, other: out.other || null, agreed: out.agreed, raised: SEATS.filter(up), late: SEATS.filter(r => seats[r].status === 'late'), small: seats.small.status, big: seats.big.status } });
  return out;
}

function close(call, { final, settledBy, shown = false } = {}) {
  const first = L.all().find(r => r.call === call);
  if (!first) throw new Error(`no such call: ${call}`);
  L.add({ call, run: first.run, final, settledBy, shown: !!shown });
  return `closed ${call}: ${final} (${settledBy}${shown ? ', shown' : ''})`;
}

// ---- /labs:try: the blind side-by-side ------------------------------------------------
const NAME = { opus: 'Opus', sonnet: 'Sonnet' };
// Which model is Judge 1 is drawn by code, so CC can't put the same one first every time.
const drawOrder = () => (crypto.randomInt(2) ? ['opus', 'sonnet'] : ['sonnet', 'opus']);

function tryOpen(decision, scenario, now = new Date()) {
  let call = 'try-' + stamp(now);
  if (L.all().some(r => r.call === call)) call += '-' + crypto.randomBytes(2).toString('hex');
  const line = { call, run: 'blind', point: 'boot.style', scenario, consulted: !!decision.consult, ruleWouldAsk: !!decision.ruleWouldAsk, forced: !!decision.forced, default: decision.default };
  if (line.consulted) line.order = drawOrder();
  L.add(line);
  return { call, consult: line.consulted, ruleWouldAsk: line.ruleWouldAsk, forced: line.forced, default: line.default, reasons: decision.reasons || [], consultWhy: decision.consultWhy || [], question: decision.question || null };
}

function tryShow(call) {
  const b = L.blind().find(x => x.call === call);
  if (!b || !b.order) throw new Error(`no blind try with judges: ${call}`);
  const judge = m => {
    const v = b.models[m];
    if (!v) return { missing: true };
    if (v.invalid) return { invalid: true, reason: v.reason };
    return { verdict: v.verdict, confidence: v.confidence, why: v.why || null, fact: v.fact || null, suggestion: v.suggestion || null };
  };
  return { call, scenario: b.scenario, default: b.default, judge1: judge(b.order[0]), judge2: judge(b.order[1]) };
}

function tryPick(call, pick, why) {
  const b = L.blind().find(x => x.call === call);
  if (!b || !b.order) throw new Error(`no blind try with judges: ${call}`);
  if (b.pick) throw new Error('already picked: a second pick, after the reveal, would not be blind');
  const p = String(pick).toLowerCase().replace(/^judge\s*/, '');
  const map = { 1: b.order[0], 2: b.order[1], both: 'both', neither: 'neither' };
  if (!map[p]) throw new Error('pick must be 1, 2, both or neither');
  const line = { call, run: 'blind', pick: map[p] };
  if (p === '1' || p === '2') line.judge = Number(p);
  if (why) line.why = String(why).slice(0, 600);
  L.add(line);
  const said = (n, m) => {
    const v = b.models[m];
    const what = !v ? 'no answer' : v.invalid ? `no valid answer (${v.reason})` : `${v.verdict}${v.suggestion ? ' → ' + v.suggestion : ''} (${v.confidence})`;
    return `Judge ${n} was ${NAME[m]}${v && v.ms ? `, ${(v.ms / 1000).toFixed(1)}s` : ''}: ${what}`;
  };
  const yours = line.judge ? `Judge ${line.judge}, which was ${NAME[map[p]]}` : map[p] === 'both' ? 'both' : 'neither';
  return [said(1, b.order[0]), said(2, b.order[1]), `You picked ${yours}.`].join('\n');
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : undefined; };
  if (cmd === '--test') {
    // Every write here goes to a throwaway log.
    const tmp = path.join(require('os').tmpdir(), `record-test-${process.pid}.jsonl`);
    process.env.JAY_LABS_LOG = tmp;
    process.env.JUDGEMENT_OS_SETTINGS = path.join(require('os').tmpdir(), `jos-settings-none-${process.pid}.json`);  // the defaults, never the operator's own
    try { fs.unlinkSync(tmp); } catch (e) {}
    for (const m of ['./labs-log', './record']) delete require.cache[require.resolve(m)];
    const R = require('./record'), L2 = require('./labs-log');
    const check = R.check;
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const dec = { default: 'general', consult: true, ruleWouldAsk: false, forced: true, reasons: ['x'], consultWhy: ['anyway'], question: 'Q' };
    const o = R.tryOpen(dec, 'a made-up morning');
    ok('a try gets a call id and a drawn order', /^try-/.test(o.call) && L2.blind()[0].order.length === 2);
    R.verdict({ call: o.call, run: 'blind', model: 'sonnet', ms: 1000 }, '{"verdict":"proceed","confidence":"high","why":"fine","fact":null,"suggestion":null}');
    R.verdict({ call: o.call, run: 'blind', model: 'opus', ms: 2000 }, '{"verdict":"challenge","confidence":"medium","why":"w","fact":"f","suggestion":"project"}');
    ok('the blind view names no model', !/sonnet|opus/i.test(JSON.stringify(R.tryShow(o.call))));
    const order = L2.blind()[0].order;
    const reveal = R.tryPick(o.call, '1');
    ok('judge 1 maps to the drawn model, and the reveal says so', L2.blind()[0].pick === order[0] && reveal.includes(`Judge 1 was ${NAME[order[0]]}`));
    ok('a second pick is refused', (() => { try { R.tryPick(o.call, '2'); return false; } catch (e) { return true; } })());
    const skip = R.tryOpen({ default: 'general', consult: false, ruleWouldAsk: false, forced: false }, 'a plain morning');
    ok('a no-call try gets its own id and no order', skip.call !== o.call && !L2.blind().find(b => b.call === skip.call).order);
    const seen = new Set(); for (let i = 0; i < 60; i++) seen.add(R.drawOrder().join());
    ok('both orders get drawn', seen.size === 2);
    const opened = R.open({ default: 'jay', consult: true, ruleWouldAsk: true, consultWhy: ['both work and gaming'], question: 'Q' }, { point: 'sexyhtml.style', prefix: 'style' });
    const openLine = L2.all().find(r => r.call === opened.call);
    ok('open logs the point, the pick and why the judge was asked', /^style-/.test(opened.call) && openLine.point === 'sexyhtml.style' && openLine.consultWhy[0] === 'both work and gaming');
    R.close(opened.call, { final: 'sa', settledBy: 'jay', shown: true });
    ok('close records what happened, on the same run', L2.all().filter(r => r.call === opened.call).pop().final === 'sa' && L2.summary('live', 'sexyhtml.style').shownToJay === 1);
    ok('close refuses an unknown call', (() => { try { R.close('nope', { final: 'x', settledBy: 'rule' }); return false; } catch (e) { return true; } })());
    ok('open needs a point', (() => { try { R.open({ default: 'jay' }, {}); return false; } catch (e) { return true; } })());
    // Two judges, one outcome.
    const J = { small: { model: 'sonnet', effort: 'default' }, big: { model: 'opus', effort: 'default' }, interrupt: 'both', timeoutSeconds: 60 };
    const rule = r => Object.assign({}, J, { interrupt: r });
    const A = (v, c, s) => JSON.stringify({ verdict: v, confidence: c, why: 'w', fact: v === 'proceed' ? null : 'f', suggestion: s || null });
    const pair = (small, big, bigMs = 6000) => {
      const c = R.open({ default: 'general', consult: true, question: 'Q' }, { point: 'test.two', prefix: 'two' });
      if (small) R.verdict({ call: c.call, run: 'live', model: 'sonnet', role: 'small', ms: 4000 }, small);
      if (big) R.verdict({ call: c.call, run: 'live', model: 'opus', role: 'big', ms: bigMs }, big);
      return c;
    };
    const p1 = pair(A('challenge', 'medium', 'project'), A('challenge', 'high', 'bare'));
    const quiet = R.open({ default: 'jay', consult: false }, { point: 'test.quiet', prefix: 'quiet' });
    ok('open names both judges when it consults, and none when it doesn\'t', p1.judges.small.model === 'sonnet' && p1.judges.big.model === 'opus' && p1.judges.interrupt === 'both' && !quiet.judges);
    const c1 = R.combine(p1.call, { judges: J });
    ok('both disagree: shown, the big judge leads, the small one\'s pick rides along', c1.show && c1.lead === 'big' && c1.suggestion === 'bare' && c1.other === 'project' && !c1.agreed);
    const c2 = R.combine(pair(A('challenge', 'high', 'project'), A('proceed', 'high')).call, { judges: J });
    ok('one disagrees: under "both" the rule stands, and the log says why', !c2.show && c2.reason === 'the small judge disagrees; the big judge agrees with the rule: the rule stands');
    const c3 = R.combine(pair(A('challenge', 'high', 'project'), A('challenge', 'high', 'project'), 61000).call, { judges: J });
    ok('a judge past the timeout counts as no answer', !c3.show && /big judge was too slow/.test(c3.reason));
    const c4 = R.combine(pair(A('challenge', 'high', 'project'), A('challenge', 'high', 'project'), 61000).call, { judges: rule('either') });
    ok('"either": one judge in time is enough, and it leads', c4.show && c4.lead === 'small' && c4.suggestion === 'project');
    const c5 = R.combine(pair(A('challenge', 'high', 'project'), A('proceed', 'medium')).call, { judges: rule('big') });
    ok('"big": the small judge alone never interrupts', !c5.show);
    const c6 = R.combine(pair(A('challenge', 'low', 'project'), A('challenge', 'high', 'project')).call, { judges: J });
    ok('a low-confidence answer is a hunch, never a vote', !c6.show && /small judge only has a hunch/.test(c6.reason));
    const c7 = R.combine(pair(A('clarify', 'medium', 'project'), A('challenge', 'high', 'project')).call, { judges: J });
    ok('the same suggestion twice: one option, no second', c7.show && c7.verdict === 'challenge' && !c7.other && !c7.agreed);
    const c8 = R.combine(pair('no idea', A('challenge', 'high', 'project')).call, { judges: J });
    ok('an invalid answer is no answer', !c8.show && /small judge gave no valid answer/.test(c8.reason));
    const c9 = R.combine(pair(A('proceed', 'high'), A('proceed', 'high')).call, { judges: J });
    ok('both fine: nothing shown, and they agreed', !c9.show && c9.agreed);
    const tw = R.open({ default: 'general', consult: true, question: 'Q' }, { point: 'test.two', prefix: 'two' }).call;
    R.verdict({ call: tw, run: 'live', model: 'sonnet', role: 'big', ms: 5000 }, A('redirect', 'high', '/day:checkin'));
    R.verdict({ call: tw, run: 'live', model: 'sonnet', role: 'small', ms: 3000 }, A('challenge', 'medium', 'bare'));
    const c10 = R.combine(tw, { judges: Object.assign({}, J, { big: { model: 'sonnet' } }) });
    ok('one model in both seats: told apart by role', c10.show && c10.lead === 'big' && c10.verdict === 'redirect' && c10.other === 'bare');
    R.close(p1.call, { final: 'project', settledBy: 'jay', shown: true });
    const s2 = L2.summary('live', 'test.two');
    ok('the summary counts the outcome; taking the second option is taking a judge', s2.jayTook === 1 && s2.judgesInterrupted === 4 && s2.judgesHeldBack === 5 && s2.lateAnswers === 2);
    ok('combine refuses an unknown call', (() => { try { R.combine('nope', { judges: J }); return false; } catch (e) { return true; } })());
    try { fs.unlinkSync(tmp); } catch (e) {}
    ok('fenced JSON parses', check('```json\n{"verdict":"proceed","confidence":"high","why":"x","fact":null,"suggestion":null}\n```').ok);
    ok('prose around JSON parses', check('Here: {"verdict":"challenge","confidence":"medium","why":"Jay\'s handoff","fact":"handoff names the LABS project","suggestion":"project"} done').ok);
    ok('a challenge with no fact is refused', !check('{"verdict":"challenge","confidence":"high","why":"x","fact":null,"suggestion":"bare"}').ok);
    ok('no confidence is refused', !check('{"verdict":"proceed","why":"x"}').ok);
    ok('prose only is refused', !check('I think project fits better.').ok);
    ok('the silo holds in code', !check('{"verdict":"challenge","confidence":"high","why":"his health comes first","fact":"x","suggestion":"bare"}').ok);
    ok('a work word is fine', check('{"verdict":"redirect","confidence":"high","why":"It is 21:12, so the check-in fits","fact":"late: 21:12","suggestion":"/day:checkin"}').ok);
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  if (cmd === 'open-cases') {
    const only = opt('only') ? opt('only').split(',').map(s => s.trim().toUpperCase()) : null;
    console.log(JSON.stringify(openCases(only), null, 2));
  } else if (cmd === 'verdict') {
    const o = { call: opt('call'), run: opt('run'), model: opt('model'), role: opt('role'), batch: opt('batch'), ms: opt('ms'), point: opt('point') };
    if (!o.call || !o.run || !o.model) { console.error('verdict needs --call, --run and --model'); process.exit(2); }
    const answer = opt('file') ? fs.readFileSync(opt('file'), 'utf8') : fs.readFileSync(0, 'utf8');
    console.log(verdict(o, answer));
  } else if (cmd === 'note') {
    // A remark about a whole batch (how it was run, what to read it against). Text from --file.
    if (!opt('batch') || !opt('file')) { console.error('note needs --batch and --file'); process.exit(2); }
    const text = fs.readFileSync(opt('file'), 'utf8').trim();
    L.add({ call: opt('batch'), run: 'cases', batch: opt('batch'), note: text });
    console.log('noted ' + opt('batch'));
  } else if (cmd === 'url') {
    const u = url(argv[1]);
    if (!u) process.exit(1);
    console.log(u);
  } else if (cmd === 'open') {
    if (!opt('decision') || !opt('point')) { console.error('open needs --decision <file> and --point <decision id>'); process.exit(2); }
    const decision = JSON.parse(fs.readFileSync(opt('decision'), 'utf8'));
    console.log(JSON.stringify(open(decision, { run: opt('run') || 'live', point: opt('point'), prefix: opt('prefix'), shownModel: opt('shown-model') }), null, 2));
  } else if (cmd === 'combine') {
    if (!opt('call')) { console.error('combine needs --call'); process.exit(2); }
    console.log(JSON.stringify(combine(opt('call')), null, 2));
  } else if (cmd === 'close') {
    if (!opt('call') || !opt('final') || !opt('settled-by')) { console.error('close needs --call, --final and --settled-by'); process.exit(2); }
    console.log(close(opt('call'), { final: opt('final'), settledBy: opt('settled-by'), shown: argv.includes('--shown') }));
  } else if (cmd === 'try-open') {
    if (!opt('decision')) { console.error('try-open needs --decision <style-default output>'); process.exit(2); }
    const decision = JSON.parse(fs.readFileSync(opt('decision'), 'utf8'));
    const scenario = opt('scenario') ? (JSON.parse(fs.readFileSync(opt('scenario'), 'utf8')).name || 'A made-up morning') : 'Today (live board and handoff)';
    console.log(JSON.stringify(tryOpen(decision, scenario), null, 2));
  } else if (cmd === 'try-show') {
    console.log(JSON.stringify(tryShow(opt('call')), null, 2));
  } else if (cmd === 'try-pick') {
    const why = opt('why-file') ? fs.readFileSync(opt('why-file'), 'utf8').trim() : undefined;
    console.log(tryPick(opt('call'), opt('pick'), why));
  } else {
    console.error('usage: record.js open-cases | verdict | note | url | open | combine | close | try-open | try-show | try-pick | --test (see the top of this file)');
    process.exit(2);
  }
}
module.exports = { openCases, check, verdict, url, parse, open, combine, close, tryOpen, tryShow, tryPick, drawOrder };
