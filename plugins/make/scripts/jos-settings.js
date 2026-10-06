#!/usr/bin/env node
// jos-settings.js: the Judgement OS settings, one file per install (2 Oct 2026, step 2).
//
// Every rule script and the recorder read the operator's own values from here: the profile the
// judge reads, the private topics, the log, where tasks and ideas live, and the two judges.
// Nothing about one operator is written into the code any more.
//
// The same file ships in labs, sexyhtml, comms, guard, day and sa, because installed plugins can't share code.
// The test keeps the copies identical. It never throws: a missing or broken file means the
// defaults, and a broken one is reported as `problem`.
//
//   ~/.claude/judgement-os/settings.json   (or $JUDGEMENT_OS_SETTINGS)
//
//   node jos-settings.js            the settings in use, merged with the defaults
//   node jos-settings.js --init     write a starter file if there's none (never overwrites)
//   node jos-settings.js --test
const fs = require('fs');
const path = require('path');
const os = require('os');

// Inside Claude Code's own config folder: ~/.claude, or CLAUDE_CONFIG_DIR when one is set, so a second
// config (a test install, say) never reads the first one's settings.
const DIR = path.join(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'), 'judgement-os');
const DEFAULTS = {
  version: 1,
  // The person this install works for: what pages call them (ECHO-JAY's nameplate: FOR <NAME>). null: FOR YOU.
  operator: null,
  // The one file the judge reads. If it doesn't exist, or is still the unfilled starter, the rule
  // decides alone and no judge is asked.
  profile: path.join(DIR, 'profile.md'),
  // Never reach a judge: in a question, a task title or an answer. A word ending in * matches
  // anything that starts with it. Tasks in these contexts never leave the machine for a judge.
  privateTopics: {
    words: ['health', 'medical', 'diagnos*', 'medication', 'therapy', 'therapist', 'mental health', 'relationship*', 'grief', 'trauma'],
    taskContexts: ['Health'],
  },
  log: path.join(DIR, 'log.jsonl'),
  // Where state files live (day.json, the send gate's pass). Only their own scripts write there.
  stateDir: DIR,
  // The operator's clock, for anything that shows a time. null: the machine's own time zone.
  timezone: null,
  // The selfActual Edition: whose vault this is. null: ask the vault (whoami).
  vault: { username: null },
  // The send gate's only exemptions: the operator's OWN Slack user id and self-DM channel, so a
  // scheduled task can message them with nobody there to type send. Never anyone else.
  sendGate: { exempt: [] },
  // The guard plugin: folders (any part of the path) where committing on main or master is refused
  // and files there ask before they change. Empty: no branch guard.
  guard: { protectMain: [] },
  // Where the day's tasks and the filed ideas live: a file by default; an edition can name its own store.
  tasks: 'TASKS.md',
  ideas: 'IDEAS.md',
  // Two judges by default. A skill author can set the model and effort of each. "interrupt":
  // "both" means the operator only hears about a disagreement both judges share at medium or
  // high confidence. A judge slower than timeoutSeconds is treated as no answer. 120 until the wait
  // can be cut short (Jay, 2 Oct): real judges have taken 49 to 52 s, and a late answer is only
  // dropped after it has been waited for. 0 means no limit.
  judges: {
    small: { model: 'sonnet', effort: 'default' },
    big: { model: 'opus', effort: 'default' },
    interrupt: 'both',
    timeoutSeconds: 120,
  },
};

function file(env = process.env) { return env.JUDGEMENT_OS_SETTINGS || path.join(DIR, 'settings.json'); }

function load(env = process.env) {
  let user = {}, problem = null;
  try { user = JSON.parse(fs.readFileSync(file(env), 'utf8')) || {}; }
  catch (e) { if (e.code !== 'ENOENT') problem = e.message; }
  const s = Object.assign({}, DEFAULTS, user);
  s.privateTopics = Object.assign({}, DEFAULTS.privateTopics, user.privateTopics || {});
  const uj = user.judges || {};
  s.judges = Object.assign({}, DEFAULTS.judges, uj);
  s.judges.small = Object.assign({}, DEFAULTS.judges.small, uj.small || {});
  s.judges.big = Object.assign({}, DEFAULTS.judges.big, uj.big || {});
  s.vault = Object.assign({}, DEFAULTS.vault, user.vault || {});
  s.sendGate = Object.assign({}, DEFAULTS.sendGate, user.sendGate || {});
  s.guard = Object.assign({}, DEFAULTS.guard, user.guard || {});
  if (problem) s.problem = problem;
  return s;
}

// The starter profile (labs: /labs:profile) carries this line until it's filled in. While it's
// there no judge is asked: an empty profile would give the judges nothing to go on (step 4, 2 Oct).
const STARTER = 'judgement-os: starter profile, not filled in';
// none: no file · starter: the starter, not filled in yet · ready: a profile the judges can read.
function profileState(env) {
  const p = load(env).profile;
  if (!p || !fs.existsSync(p)) return 'none';
  try { return fs.readFileSync(p, 'utf8').includes(STARTER) ? 'starter' : 'ready'; } catch (e) { return 'none'; }
}
// The profile the judge reads, or null when there isn't one ready: then the rule decides alone.
function profile(env) { return profileState(env) === 'ready' ? load(env).profile : null; }

const esc = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
// The private topics as one case-insensitive regex. An empty list matches nothing.
function silo(env) {
  const words = (load(env).privateTopics.words || []).map(w => String(w).trim()).filter(Boolean);
  if (!words.length) return /(?!)/;
  const alt = words.map(w => (w.endsWith('*') ? esc(w.slice(0, -1)) + '\\w*' : esc(w))).join('|');
  return new RegExp('\\b(?:' + alt + ')\\b', 'i');
}
function siloContexts(env) { return load(env).privateTopics.taskContexts || []; }
function logPath(env) { return load(env).log || DEFAULTS.log; }
function judges(env) { return load(env).judges; }
function stateDir(env) { return load(env).stateDir || DEFAULTS.stateDir; }
function timezone(env) { return load(env).timezone || Intl.DateTimeFormat().resolvedOptions().timeZone; }

module.exports = { load, profile, profileState, silo, siloContexts, logPath, judges, stateDir, timezone, file, DEFAULTS, STARTER };

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--test') {
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-settings-'));
    const at = (name, body) => { const f = path.join(tmp, name); if (body !== undefined) fs.writeFileSync(f, body); return { JUDGEMENT_OS_SETTINGS: f }; };
    const none = at('none.json');
    ok('no file: the defaults', load(none).judges.interrupt === 'both' && !load(none).problem);
    ok('no profile file: null, so the rule decides alone', profile(none) === null);
    const prof = path.join(tmp, 'me.md'); fs.writeFileSync(prof, '# me');
    const mine = at('mine.json', JSON.stringify({ profile: prof, privateTopics: { words: ['payday', 'garden*', 'big day'] }, judges: { big: { model: 'opus', effort: 'high' } } }));
    ok('a profile that exists is returned', profile(mine) === prof);
    const starter = path.join(tmp, 'starter.md'); fs.writeFileSync(starter, `<!-- ${STARTER}. Delete this line. -->\n# How I work\n`);
    const unfilled = at('unfilled.json', JSON.stringify({ profile: starter }));
    ok('the unfilled starter counts as no profile, so no judge is asked', profile(unfilled) === null && profileState(unfilled) === 'starter');
    ok('three states: none, starter, ready', profileState(none) === 'none' && profileState(mine) === 'ready');
    ok('judges merge field by field', judges(mine).big.effort === 'high' && judges(mine).small.model === 'sonnet' && judges(mine).timeoutSeconds === 120);
    ok('task contexts keep their default when not set', siloContexts(mine)[0] === 'Health');
    ok('state, clock and the send gate have defaults: the folder, the machine, nobody', stateDir(none) === DEFAULTS.stateDir && !!timezone(none) && load(none).sendGate.exempt.length === 0);
    const set = at('set.json', JSON.stringify({ stateDir: '/s', timezone: 'Europe/Lisbon', sendGate: { exempt: ['U1'] } }));
    ok('state, clock and the send gate come from the file', stateDir(set) === '/s' && timezone(set) === 'Europe/Lisbon' && load(set).sendGate.exempt[0] === 'U1');
    ok('no branch guard unless the file names its folders', load(none).guard.protectMain.length === 0 && load(at('g.json', JSON.stringify({ guard: { protectMain: ['/work'] } }))).guard.protectMain[0] === '/work');
    ok('the vault username: nobody by default, the file\'s when set', load(none).vault.username === null && load(at('v.json', JSON.stringify({ vault: { username: 'someone' } }))).vault.username === 'someone');
    const re = silo(mine);
    ok('a private word matches, any case', re.test('My PAYDAY plans'));
    ok('a word ending in * matches its prefix', re.test('gardening') && re.test('the gardener'));
    ok('a phrase matches across spaces', re.test('the big   day'));
    ok('word boundaries hold', !re.test('paydayx') && !re.test('bigday'));
    ok('the defaults catch health but not the everyday', silo(none).test('my health') && !silo(none).test('ship the release'));
    ok('an empty list matches nothing', !silo(at('empty.json', JSON.stringify({ privateTopics: { words: [] } }))).test('health'));
    const broken = at('broken.json', '{ not json');
    ok('a broken file: the defaults, and the problem reported', load(broken).judges.interrupt === 'both' && !!load(broken).problem);
    // The three shipped copies must stay identical (checked from the source tree only).
    const here = fs.readFileSync(__filename, 'utf8');
    const copies = ['labs', 'sexyhtml', 'comms', 'guard', 'day', 'sa'].map(p => path.join(__dirname, '..', '..', p, 'scripts', 'jos-settings.js')).filter(f => fs.existsSync(f));
    ok('the copies in every plugin that carries one are identical', copies.every(f => fs.readFileSync(f, 'utf8') === here));
    const cfgOut = require('child_process').spawnSync(process.execPath, ['-e', 'console.log(require(' + JSON.stringify(__filename) + ').file({}))'], { env: Object.assign({}, process.env, { CLAUDE_CONFIG_DIR: path.join(tmp, 'cfg') }), encoding: 'utf8' }).stdout.trim();
    ok('a CLAUDE_CONFIG_DIR keeps its own settings', cfgOut === path.join(tmp, 'cfg', 'judgement-os', 'settings.json'));
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  if (arg === '--init') {
    const f = file();
    if (fs.existsSync(f)) { console.log(`already there, left alone: ${f}`); process.exit(0); }
    fs.mkdirSync(path.dirname(f), { recursive: true });
    const starter = Object.assign({}, DEFAULTS);   // operator stays empty: a login name is not a person's name
    fs.writeFileSync(f, JSON.stringify(starter, null, 2) + '\n');
    console.log(`wrote ${f}`); process.exit(0);
  }
  const s = load();
  console.log(JSON.stringify(Object.assign({ file: file(), profileState: profileState(), profileFound: !!profile() }, s), null, 2));
}
