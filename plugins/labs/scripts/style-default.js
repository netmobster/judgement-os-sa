#!/usr/bin/env node
// style-default.js: boot's own style pick, and the rule for when to ask the Second Opinion.
// Pure code: the same inputs give the same answer, so the judges are the only thing that varies.
//
// Live (from /day:boot; the two JSON files are what boot's pre-step already read):
//   node style-default.js --live --tasks <tasks.json> --handoff <handoff.json>
// A morning written down as a scenario (/labs:try):
//   node style-default.js --case <scenario.json>
//   add --ask-anyway to either: the judges are asked even when the rule wouldn't ask (/labs:try)
//   node style-default.js --test
//
// Prints one JSON object:
//   { default, reasons[], consult, consultWhy[], signals{...}, question }
// `question` is the bounded question for the Second Opinion. It's only there when consult is
// true. The judges never see anything this script didn't put in it.
//
// Tasks: [{ title, id?, due?: "YYYY-MM-DD", priority?: "P0".."P3", status?, context?: [] }].
// A plain TASKS.md has no priorities: then anything due today counts as due today.
// A scenario: { name, now (ISO time), recent: [styles, oldest first], alreadyBootedAs?, tasks, handoff }.
// The handoff: { conversationSource: { project }, nextSteps, openLoops } (text, one item a line).

const fs = require('fs');
const path = require('path');
const os = require('os');

// Settings: the judges' one file (a full path: their Read tool can't expand ~), the private topics,
// the task contexts that never leave, the clock and the state folder all come from the install's file.
const S = require('./jos-settings');
const STYLES = ['bare', 'project', 'general'];
const EOD_MIN = 16 * 60;               // the end-of-day check-in window opens at 16:00
const BLOCKER = /\b(blocked|blocker|waiting on|waits on|waiting for|stuck)\b/i;

function local(d, tz = S.timezone()) {
  const p = {};
  for (const { type, value } of new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short',
  }).formatToParts(d)) p[type] = value;
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute), hhmm: `${p.hour}:${p.minute}`, weekday: p.weekday };
}

function lines(text) {
  const t = Array.isArray(text) ? text.join('\n') : String(text || '');
  return t.split(/\n+/).map(s => s.replace(/^\s*(?:[-*•]|\d+\.)\s*/, '').trim()).filter(Boolean);
}

// The base pick: the style used most in the last 7 boots. Ties go to the most recent. None → general.
function basePick(recent) {
  const used = recent.filter(s => STYLES.includes(s));
  if (!used.length) return { style: 'general', why: 'no recent boots to go on' };
  const count = {};
  used.forEach(s => (count[s] = (count[s] || 0) + 1));
  const top = Math.max(...Object.values(count));
  const style = used.slice().reverse().find(s => count[s] === top);
  return { style, why: `${style} on ${count[style]} of the last ${used.length} boots` };
}

function decide({ now, recent, alreadyBootedAs, tasks, handoff, force, profile }) {
  const t = local(now);
  // The silo: a private task context, or a private word in a title or a handoff line, never leaves.
  const ctx = S.siloContexts(), priv = S.silo();
  const board = (tasks || []).filter(x => !(x.context || []).some(c => ctx.includes(c)) && !priv.test(x.title || ''));
  const open = board.filter(x => x.status !== 'Waiting' && x.status !== 'Done');
  const dueToday = open.filter(x => x.due === t.date && (!x.priority || x.priority === 'P0'));
  const overdue = open.filter(x => x.due && x.due < t.date && (!x.priority || ['P0', 'P1'].includes(x.priority)));
  const loops = lines(handoff && handoff.openLoops).filter(l => !priv.test(l));
  const blockers = loops.filter(l => BLOCKER.test(l));
  let project = handoff && handoff.conversationSource && (handoff.conversationSource.project || null);
  if (project && priv.test(project)) project = null;
  const base = basePick(recent || []);

  const reasons = [base.why];
  const consultWhy = [];
  if (t.minutes >= EOD_MIN) consultWhy.push(`late: it's ${t.hhmm}, and the end-of-day check-in may be the right skill`);
  if (base.style === 'project' && blockers.length) consultWhy.push(`project style, but the handoff has ${blockers.length} item(s) waiting on someone`);
  if (dueToday.length && blockers.length) consultWhy.push('something important is due today and the handoff flags a blocker');
  if (project && base.style !== 'project') consultWhy.push(`the handoff names a project (${project}) but the pick is ${base.style}`);

  const label = x => (x.id ? `${x.id} · ` : '') + x.title;
  const signals = {
    time: `${t.weekday} ${t.hhmm}`, date: t.date, recentBoots: (recent || []).slice(-7),
    alreadyBootedAs: alreadyBootedAs || null, dueToday: dueToday.map(label),
    overdue: overdue.length, handoffProject: project, blockers,
    nextSteps: lines(handoff && handoff.nextSteps).filter(l => !priv.test(l)).slice(0, 3),
  };
  // force: /labs:try's "ask anyway". The judges are told plainly that nothing flagged this one.
  const ruleWouldAsk = consultWhy.length > 0 && !alreadyBootedAs;
  if (force && !ruleWouldAsk) consultWhy.push('the user asked for the judges anyway (/labs:try): the rule alone would not have asked');
  let consult = ruleWouldAsk || !!force;
  const notes = [];
  const prof = profile === undefined ? S.profile() : profile;
  if (consult && (!prof || !fs.existsSync(prof))) { consult = false; notes.push(prof ? `no profile file at ${prof}, so the rule decides` : 'no profile set up yet, so the rule decides'); }
  const out = { default: base.style, reasons, consult, ruleWouldAsk, forced: !!force && !ruleWouldAsk && consult, consultWhy, notes, signals };
  if (consult) out.question = question(out, prof);
  return out;
}

function question(o, profile) {
  const s = o.signals;
  return [
    'DECISION: which boot style fits the user today: bare · project · general. Or, if a boot is the wrong thing right now, redirect (for example to /day:checkin).',
    `BOOT'S OWN PICK: ${o.default} (${o.reasons.join('; ')})`,
    `WHY YOU'RE BEING ASKED: ${o.consultWhy.join('; ')}`,
    `TIME: ${s.time} (${S.timezone()}). Recent boot styles, oldest first: ${s.recentBoots.join(', ') || 'none'}`,
    `HANDOFF PROJECT: ${s.handoffProject || 'none named'}`,
    `HANDOFF NEXT STEPS: ${s.nextSteps.join(' | ') || 'none'}`,
    `HANDOFF ITEMS WAITING ON SOMEONE: ${s.blockers.join(' | ') || 'none'}`,
    `TASKS: due today: ${s.dueToday.join('; ') || 'none'} · overdue: ${s.overdue}`,
    'STYLE MEANINGS: bare = just the brief, straight to work · project = heads-down on one project · general = a normal day (the handoff, then the project).',
    `PROFILE (read this one file): ${profile}`,
  ].join('\n');
}

// ---- inputs ------------------------------------------------------------------------
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function liveInputs(args) {
  const dir = S.stateDir();
  let recent = [];
  try {
    recent = fs.readFileSync(path.join(dir, 'days.jsonl'), 'utf8').trim().split('\n').slice(-7)
      .map(l => { try { return JSON.parse(l).style; } catch (e) { return null; } }).filter(Boolean);
  } catch (e) {}
  let today = null; try { today = readJson(path.join(dir, 'day.json')); } catch (e) {}
  const now = process.env.JAY_CLOCK_NOW ? new Date(process.env.JAY_CLOCK_NOW) : new Date();
  const t = local(now);
  const tasks = args.tasks ? readJson(args.tasks) : [];
  const handoff = args.handoff ? readJson(args.handoff) : {};
  return { now, recent, alreadyBootedAs: today && today.date === t.date ? today.style : null, tasks: Array.isArray(tasks) ? tasks : (tasks.tasks || []), handoff: Array.isArray(handoff) ? handoff[0] : handoff };
}
function caseInputs(file) {
  const c = readJson(file);
  return { now: new Date(c.now), recent: c.recent || [], alreadyBootedAs: c.alreadyBootedAs || null, tasks: c.tasks || [], handoff: c.handoff || {} };
}

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--live') a.live = true;
    else if (argv[i] === '--ask-anyway') a.force = true;
    else if (argv[i] === '--test') a.test = true;
    else if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[++i];
  }
  return a;
}

function selfTest() {
  // Never the user's own settings: a fixture with a profile that exists and the clock on UTC.
  const fx = path.join(os.tmpdir(), `jos-settings-sd-${process.pid}.json`);
  fs.writeFileSync(fx, JSON.stringify({ profile: __filename, timezone: 'UTC', privateTopics: { words: ['therapy', 'grief'], taskContexts: ['Health'] } }));
  process.env.JUDGEMENT_OS_SETTINGS = fx;
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  const at = iso => new Date(iso);
  const quiet = decide({ now: at('2026-10-06T09:00:00Z'), recent: ['general', 'general'], tasks: [], handoff: {} });
  ok('a quiet morning: the rule decides, general', !quiet.consult && quiet.default === 'general' && !quiet.question);
  ok('no recent boots: general', decide({ now: at('2026-10-06T09:00:00Z'), recent: [], tasks: [], handoff: {} }).default === 'general');
  ok('the most used style wins, ties to the latest', basePick(['bare', 'project', 'project', 'bare']).style === 'bare' && basePick(['bare', 'project', 'project']).style === 'project');
  const late = decide({ now: at('2026-10-06T17:10:00Z'), recent: [], tasks: [], handoff: {} });
  ok('late in the day: the judges are asked', late.consult && /late/.test(late.consultWhy[0]));
  ok('the question names the profile file, in full', /PROFILE \(read this one file\): .+style-default\.js$/.test(late.question));
  const blocked = decide({ now: at('2026-10-06T09:00:00Z'), recent: ['project', 'project'], tasks: [], handoff: { openLoops: '- the release is blocked on a review' } });
  ok('project style with a blocker: asked', blocked.consult && blocked.default === 'project');
  const due = decide({ now: at('2026-10-06T09:00:00Z'), recent: ['general'], tasks: [{ title: 'ship the notes', due: '2026-10-06' }], handoff: { openLoops: 'waiting on the designer' } });
  ok('due today with a blocker: asked, and a plain task counts as due today', due.consult && due.signals.dueToday[0] === 'ship the notes');
  const named = decide({ now: at('2026-10-06T09:00:00Z'), recent: ['general'], tasks: [], handoff: { conversationSource: { project: 'the website' } } });
  ok('a named project on a general day: asked', named.consult && /the website/.test(named.question));
  const priv = decide({ now: at('2026-10-06T17:10:00Z'), recent: [], tasks: [{ id: 'H-1', title: 'x', due: '2026-10-06', context: ['Health'] }, { id: 'P-1', title: 'book the therapy session', due: '2026-10-06' }], handoff: { openLoops: '- grief group waiting on a reply\n- ship it, waiting on a review' } });
  const privText = JSON.stringify(priv);
  ok('private contexts and words never reach the judges', !privText.includes('H-1') && !privText.includes('P-1') && !privText.includes('grief'));
  const noProfile = decide({ now: at('2026-10-06T17:10:00Z'), recent: [], tasks: [], handoff: {}, profile: null });
  ok('no profile: the rule decides alone', !noProfile.consult && /no profile/.test(noProfile.notes[0]));
  ok('already booted today: no judges', decide({ now: at('2026-10-06T17:10:00Z'), recent: [], alreadyBootedAs: 'bare', tasks: [], handoff: {} }).consult === false);
  const forced = decide({ now: at('2026-10-06T09:00:00Z'), recent: ['general'], tasks: [], handoff: {}, force: true });
  ok('ask anyway: the judges on a quiet morning, told so', forced.consult && forced.forced && !forced.ruleWouldAsk && /anyway/.test(forced.question));
  ok('only the three public styles', STYLES.join() === 'bare,project,general' && !/full/.test(late.question));
  fs.unlinkSync(fx);
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

if (require.main === module) {
  const a = parseArgs(process.argv.slice(2));
  if (a.test) process.exit(selfTest());
  const inputs = Object.assign(a.case ? caseInputs(a.case) : liveInputs(a), { force: !!a.force });
  process.stdout.write(JSON.stringify(decide(inputs), null, 2) + '\n');
}
module.exports = { decide, basePick, caseInputs, STYLES };
