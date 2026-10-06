#!/usr/bin/env node
// habits.js: the one writer of the habits files, in the settings' state folder.
//
// Morning scores are partial by nature, so the rows still open come back at the mid-day and
// end-of-day check-ins, and only the open ones. This is how Claude finds them, and how it logs
// whatever the user scores later.
//
//   node habits.js check                         set up yet? prints yes or no
//   node habits.js setup '<json>' [--replace]    the rows, tiers and focus, from the first-run setup
//   node habits.js rows                          the setup as JSON, for the scoring page
//   node habits.js show                          today's open rows, nearest rung first
//   node habits.js log '<json>' [--by <name>]    merge scores onto today's line, append
//   node habits.js --test
//
// The setup: { "rows": [{ "name", "tier": 1|2, "cat", "kind"?: "score"|"num"|"reps" }],
//              "focus": { "category" } }
// tier 1 rows are the core; tier 2 are stretch. "score" rows take 0 to 3 (2+ is done, 3 is done
// properly); "num" rows take any number and are done once logged; "reps" rows are scored 0 to 3
// and also take a rep count.
//
// `log` takes the scoring page's paste ({"date","rows","reps"}) or a bare {"<row>": score} object;
// row names match case-insensitively. It merges onto the date's latest line and appends the result,
// so a check-in that scores three rows keeps the morning's others, and the latest line for a date
// wins. Nothing is ever rewritten.
//
// Files: <stateDir>/habits.json (the setup) and <stateDir>/habits.jsonl (one line per scored day).
// Test overrides: day.js's JAY_DAY_FILE and JAY_CLOCK_NOW, and JUDGEMENT_OS_SETTINGS.

const fs = require('fs');
const path = require('path');
const os = require('os');

function need(cond, msg) {
  if (!cond) { console.error(`habits.js: ${msg}`); process.exit(1); }
}

function files() {
  const S = require('./jos-settings');
  const dir = S.stateDir();
  return { dir, setup: path.join(dir, 'habits.json'), log: path.join(dir, 'habits.jsonl') };
}

function readSetup() {
  try { return JSON.parse(fs.readFileSync(files().setup, 'utf8')); } catch (e) { return null; }
}

// The setup, checked. Returns { ok, problem, value }.
function validate(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.rows) || !input.rows.length) return { ok: false, problem: 'the setup needs a "rows" list with at least one row' };
  const seen = new Set(), rows = [];
  for (const r of input.rows) {
    const name = String((r && r.name) || '').trim();
    if (!name) return { ok: false, problem: 'every row needs a name' };
    if (seen.has(name.toLowerCase())) return { ok: false, problem: `two rows called "${name}"` };
    seen.add(name.toLowerCase());
    const tier = Number(r.tier || 2);
    if (![1, 2].includes(tier)) return { ok: false, problem: `"${name}": tier is 1 (core) or 2 (stretch)` };
    const kind = r.kind || 'score';
    if (!['score', 'num', 'reps'].includes(kind)) return { ok: false, problem: `"${name}": kind is score, num or reps` };
    rows.push({ name, tier, cat: String(r.cat || 'general').trim(), kind });
  }
  const cats = new Set(rows.map(r => r.cat));
  const focus = input.focus && input.focus.category ? String(input.focus.category).trim() : null;
  if (focus && !cats.has(focus)) return { ok: false, problem: `the focus "${focus}" isn't a row category (they are: ${[...cats].join(', ')})` };
  return { ok: true, value: { rows, focus: { category: focus } } };
}

// The latest line for `date`, or null.
function latest(date) {
  let lines;
  try { lines = fs.readFileSync(files().log, 'utf8').split(/\r?\n/).filter(Boolean); } catch { return null; }
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const line = JSON.parse(lines[i]);
      if (line.date === date) return line;
    } catch { /* a bad line never hides the good ones above it */ }
  }
  return null;
}

function isDone(row, rows) {
  const v = rows[row.name];
  if (row.kind === 'num') return typeof v === 'number' && !isNaN(v);
  return typeof v === 'number' && v >= 2;
}

// Rows still to go for each rung, the same arithmetic as the scoring page:
// ★ every core row done · ★★ ★, and at least 80% of the focus category done (rounded up) · ★★★ every row done.
function rungs(st, rows) {
  const all = st.rows;
  const focus = st.focus && st.focus.category ? all.filter(r => r.cat === st.focus.category) : [];
  const needFocus = Math.ceil(focus.length * 0.8);
  const star = all.filter(r => r.tier === 1 && !isDone(r, rows)).length;
  const reach = focus.filter(r => r.tier === 1 || isDone(r, rows)).length;
  return [
    ['★', star],
    ['★★', star + Math.max(0, needFocus - reach)],
    ['★★★', all.filter(r => !isDone(r, rows)).length],
  ];
}

// The block the check-ins render: the nearest rung, then the open rows.
function openBlock(st, line) {
  if (!line) return null;
  const rows = line.rows || {};
  const open = st.rows.filter(r => !isDone(r, rows));
  if (!open.length) return 'Habits · every row done today';
  const label = r => (r.kind !== 'num' && typeof rows[r.name] === 'number') ? `${r.name} (${rows[r.name]})` : r.name;
  const core = open.filter(r => r.tier === 1).map(label);
  const stretch = open.filter(r => r.tier !== 1).map(label);
  const next = rungs(st, rows).find(([, n]) => n > 0);
  const out = [next ? `Habits · ${next[1]} to ${next[0]}` : 'Habits'];
  if (core.length) out.push(`★ rows: ${core.join(' · ')}`);
  if (stretch.length) out.push(`stretch: ${stretch.join(' · ')}`);
  return out.join('\n');
}

const NOT_SET = 'Habits aren\'t set up yet: /day:habits sets them up.';

function show(day) {
  const st = readSetup();
  if (!st) return console.log(NOT_SET);
  const date = day.local(day.now()).date;
  console.log(openBlock(st, latest(date)) || `No habits line for ${date} yet.`);
}

function setup(json, replace) {
  let input;
  try { input = JSON.parse(json); } catch { need(false, 'setup expects a JSON object'); }
  const v = validate(input);
  need(v.ok, v.problem);
  const f = files();
  need(replace || !fs.existsSync(f.setup), 'habits are already set up: add --replace to change them (the log stays as it is)');
  fs.mkdirSync(f.dir, { recursive: true });
  const tmp = `${f.setup}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(v.value, null, 2) + '\n');
  fs.renameSync(tmp, f.setup);
  const core = v.value.rows.filter(r => r.tier === 1).length;
  console.log(`Habits set up: ${v.value.rows.length} rows (${core} core)${v.value.focus.category ? `, focus ${v.value.focus.category}` : ''}.`);
}

function log(day, json, by) {
  const st = readSetup();
  need(st, NOT_SET);
  let input;
  try { input = JSON.parse(json); } catch { need(false, 'log expects a JSON object'); }
  need(input && typeof input === 'object' && !Array.isArray(input), 'log expects a JSON object');

  const date = input.date || day.local(day.now()).date;
  need(/^\d{4}-\d{2}-\d{2}$/.test(date), `bad date "${date}"`);

  const pasted = input.rows && typeof input.rows === 'object';
  const scores = pasted ? input.rows : Object.fromEntries(Object.entries(input).filter(([k]) => k !== 'date' && k !== 'reps'));
  const reps = input.reps && typeof input.reps === 'object' ? input.reps : {};

  const byName = new Map(st.rows.map(r => [r.name.toLowerCase(), r]));
  const canon = (name, value, isReps) => {
    const row = byName.get(String(name).trim().toLowerCase());
    need(row, `no row called "${name}": the rows are ${st.rows.map(r => r.name).join(' · ')}`);
    if (isReps) {
      need(row.kind === 'reps', `"${row.name}" doesn't take reps`);
      need(Number.isInteger(value) && value >= 0, `reps for "${row.name}" must be a whole number`);
    } else if (row.kind === 'num') {
      need(typeof value === 'number' && !isNaN(value), `"${row.name}" needs a number`);
    } else {
      need([0, 1, 2, 3].includes(value), `"${row.name}" scores 0 to 3, got ${JSON.stringify(value)}`);
    }
    return row.name;
  };
  const newRows = {};
  for (const [k, v] of Object.entries(scores)) newRows[canon(k, v, false)] = v;
  const newReps = {};
  for (const [k, v] of Object.entries(reps)) newReps[canon(k, v, true)] = v;
  need(Object.keys(newRows).length || Object.keys(newReps).length, 'nothing to log');

  const prev = latest(date);
  const merged = { ...(prev && prev.rows), ...newRows };
  const mergedReps = { ...(prev && prev.reps), ...newReps };
  // The setup's order, so every line reads the same way.
  const ordered = {};
  for (const r of st.rows) if (r.name in merged) ordered[r.name] = merged[r.name];
  const line = { date, by: by || null, at: day.now().toISOString(), rows: ordered };
  const orderedReps = {};
  for (const r of st.rows) if (r.name in mergedReps) orderedReps[r.name] = mergedReps[r.name];
  if (Object.keys(orderedReps).length) line.reps = orderedReps;

  fs.mkdirSync(files().dir, { recursive: true });
  fs.appendFileSync(files().log, JSON.stringify(line) + '\n');
  day.record('habits', [date, ...Object.keys(newRows), ...Object.keys(newReps)], by, null);
  console.log(openBlock(st, line));
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-habits-'));
  const settings = path.join(tmp, 'settings.json');
  fs.writeFileSync(settings, JSON.stringify({ stateDir: tmp, timezone: 'UTC' }));
  const env = Object.assign({}, process.env, { JUDGEMENT_OS_SETTINGS: settings, JAY_DAY_FILE: path.join(tmp, 'day.json'), JAY_CLOCK_NOW: '2026-10-06T09:00:00Z' });
  const cp = require('child_process');
  const run = (...args) => { const r = cp.spawnSync(process.execPath, [__filename, ...args], { env, encoding: 'utf8' }); return { code: r.status, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() }; };
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  ok('not set up: check says no', run('check').out === 'no');
  ok('not set up: show says how to start', /\/day:habits sets them up/.test(run('show').out));
  const rows = { rows: [{ name: 'Walk', tier: 1, cat: 'body' }, { name: 'Water', tier: 1, cat: 'body' }, { name: 'Read', tier: 2, cat: 'mind' }, { name: 'Pushups', tier: 2, cat: 'body', kind: 'reps' }, { name: 'Weight', tier: 2, cat: 'body', kind: 'num' }], focus: { category: 'body' } };
  ok('a bad setup is refused, with the reason', run('setup', JSON.stringify({ rows: [{ name: 'A' }, { name: 'a' }] })).code === 1);
  ok('a focus that is not a category is refused', run('setup', JSON.stringify({ rows: [{ name: 'A', cat: 'x' }], focus: { category: 'y' } })).code === 1);
  ok('setup writes the rows', run('setup', JSON.stringify(rows)).code === 0 && run('check').out === 'yes');
  ok('a second setup needs --replace', run('setup', JSON.stringify(rows)).code === 1);
  ok('rows prints the setup', JSON.parse(run('rows').out).rows.length === 5);
  ok('nothing logged today yet', /No habits line for 2026-10-06/.test(run('show').out));
  const first = run('log', JSON.stringify({ walk: 2, Read: 1 }), '--by', 's1');
  ok('log merges by name, any case, and shows what is open', first.code === 0 && /Water/.test(first.out) && /Read \(1\)/.test(first.out) && !/Walk/.test(first.out));
  ok('a score out of range is refused', run('log', JSON.stringify({ Walk: 4 })).code === 1);
  ok('an unknown row is refused', run('log', JSON.stringify({ Swim: 2 })).code === 1);
  const later = run('log', JSON.stringify({ rows: { Water: 3, Weight: 81.5 }, reps: { Pushups: 20 } }));
  ok('the page paste merges onto the morning, reps included', later.code === 0 && !/Water/.test(later.out) && /Walk|Read|Pushups/.test(later.out) && !/Walk/.test(later.out));
  const lines = fs.readFileSync(path.join(tmp, 'habits.jsonl'), 'utf8').trim().split('\n').map(l => JSON.parse(l));
  ok('nothing is rewritten: one new line per log, the latest wins', lines.length === 2 && lines[1].rows.Walk === 2 && lines[1].rows.Water === 3 && lines[1].reps.Pushups === 20);
  ok('core done, focus short by one: 1 to ★★', later.out.startsWith('Habits · 1 to ★★\n'));
  const all = run('log', JSON.stringify({ Read: 2, Pushups: 2 }));
  ok('every row done', all.out === 'Habits · every row done today');
  const st = { rows: rows.rows.map(r => Object.assign({ kind: 'score' }, r)), focus: rows.focus };
  ok('★★ needs 80% of the focus category, rounded up: 4 body rows need all 4', rungs(st, { Walk: 2, Water: 2 })[1][1] === 2 && rungs(st, { Walk: 2, Water: 2, Weight: 80 })[1][1] === 1);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

function main(argv) {
  if (argv[0] === '--test') process.exit(selfTest());
  const day = require('./day.js');
  const { args: [cmd, ...args], by } = day.takeBy(argv);
  if (cmd === 'check') return console.log(readSetup() ? 'yes' : 'no');
  if (cmd === 'rows') { const st = readSetup(); need(st, NOT_SET); return console.log(JSON.stringify(st, null, 2)); }
  if (cmd === 'setup') { const replace = args.includes('--replace'); return setup(args.filter(a => a !== '--replace').join(' '), replace); }
  if (!cmd || cmd === 'show') return show(day);
  if (cmd === 'log') return log(day, args.join(' '), by);
  need(false, `unknown command "${cmd}": check | setup '<json>' [--replace] | rows | show | log '<json>' [--by <name>]`);
}

module.exports = { latest, isDone, rungs, openBlock, validate };

if (require.main === module) main(process.argv.slice(2));
