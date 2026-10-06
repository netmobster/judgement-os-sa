#!/usr/bin/env node
// daily.js: the one writer of the daily reading and the language phrase, in the settings' state folder.
//
// Both are shown, never scored: /day:boot shows the reading at its first step and the phrase at its
// last. They advance differently, on purpose:
//
//   phrase   HOLDS until acknowledged. A phrase that didn't land comes back; "done" (or any
//            acknowledgement) moves it on. Silence leaves it where it is: nothing stacks up.
//
//   reading  ROLLS DAILY. The reading moves on by itself the first time it's shown on a new day.
//            `done` records the acknowledgement and does not advance, because the date already
//            does. (If `done` advanced it too, a "done" in the morning plus a second showing that
//            day would skip tomorrow's reading.)
//
// At most one step per new day, however many days were missed: miss three boots and you get the
// next reading, not a jump past three you never saw.
//
//   node daily.js check                                  which are set up, as JSON
//   node daily.js setup <reading|phrase> <file> [--replace]   install a plan written at setup
//   node daily.js show <reading|phrase>                  today's entry, ready to render
//   node daily.js status                                 each one set up: current entry, done today?
//   node daily.js done <reading|phrase> [--by <name>]
//   node daily.js --test
//
// The plan files (written by Claude at setup, then installed here):
//   reading.md   # Reading: <plan name>
//                ### <a part, optional>
//                #### 1. [ ] <title>
//                <the text, or where to find it, and one line to think about>
//   phrase.md    # Phrases: <language>
//                ### <a set, optional>
//                1. [ ] <phrase> — <meaning> *(<pronunciation>)* · <a note on the pattern>
// The current entry is the first one not ticked. `done` ticks it. daily.json keeps which reading
// was shown on which day. Test overrides: JUDGEMENT_OS_SETTINGS, and day.js's JAY_DAY_FILE and
// JAY_CLOCK_NOW.

const fs = require('fs');
const path = require('path');
const os = require('os');

const WHICH = ['reading', 'phrase'];

function need(cond, msg) {
  if (!cond) { console.error(`daily.js: ${msg}`); process.exit(1); }
}

function dir() { return require('./jos-settings').stateDir(); }
function fileOf(which) { return path.join(dir(), `${which}.md`); }
const POINTERS = () => path.join(dir(), 'daily.json');

function writeAtomic(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}

function readText(file) {
  const text = fs.readFileSync(file, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  return { lines: text.split(eol), eol };
}

const KINDS = {
  reading: {
    title(lines) { const m = lines.find(l => /^# /.test(l)); return m ? m.replace(/^#\s+(Reading:\s*)?/i, '').trim() : 'Reading'; },
    parse(lines) {
      const items = [];
      let group = null;
      lines.forEach((line, i) => {
        const g = line.match(/^### (.+?)\s*$/);
        if (g) { group = g[1]; return; }
        const m = line.match(/^#### (\d+)\. \[( |x)\] (.+?)\s*$/);
        if (!m) return;
        let end = i + 1;
        while (end < lines.length && !/^(#{1,4} |---\s*$)/.test(lines[end])) end++;
        items.push({ i, n: Number(m[1]), done: m[2] === 'x', group, title: m[3], body: lines.slice(i + 1, end).join('\n').trim() });
      });
      return items;
    },
    render(it, name) {
      if (!it) return `${name}: every reading done. /day:daily sets up the next plan.`;
      const out = [`${name} · day ${it.n}${it.group ? ` · ${it.group}` : ''}`, `**${it.title}**`];
      if (it.body) out.push('', it.body);
      return out.join('\n');
    },
    label: it => it ? `day ${it.n} · ${it.title}` : 'complete',
  },
  phrase: {
    title(lines) { const m = lines.find(l => /^# /.test(l)); return m ? m.replace(/^#\s+(Phrases:\s*)?/i, '').trim() : 'Phrase'; },
    parse(lines) {
      const items = [];
      let group = null;
      lines.forEach((line, i) => {
        const g = line.match(/^### (.+?)\s*$/);
        if (g) { group = g[1]; return; }
        const m = line.match(/^(\d+)\. \[( |x)\] (.+?)\s*$/);
        if (!m) return;
        const [head, ...rest] = m[3].split(' · ');
        const h = head.match(/^(.+?) — (.+?)(?:\s*\*\((.+?)\)\*)?$/);
        items.push({ i, n: Number(m[1]), done: m[2] === 'x', group, phrase: h ? h[1] : head, meaning: h ? h[2] : '', pron: h && h[3] ? h[3] : '', note: rest.join(' · ') });
      });
      return items;
    },
    render(it, name) {
      if (!it) return `${name}: every phrase done. /day:daily sets up more.`;
      const out = [`${name} · day ${it.n}${it.group ? ` · ${it.group}` : ''}`, `**${it.phrase}**${it.meaning ? ` — ${it.meaning}` : ''}${it.pron ? ` *(${it.pron})*` : ''}`];
      if (it.note) out.push(it.note);
      return out.join('\n');
    },
    label: it => it ? `day ${it.n} · ${it.phrase}` : 'complete',
  },
};

function current(which) {
  const { lines, eol } = readText(fileOf(which));
  const k = KINDS[which];
  const items = k.parse(lines);
  return { lines, eol, items, it: items.find(x => !x.done) || null, name: k.title(lines) };
}

function readPointers() { try { return JSON.parse(fs.readFileSync(POINTERS(), 'utf8')); } catch (e) { return {}; } }
function writePointers(p) { writeAtomic(POINTERS(), JSON.stringify(p, null, 2) + '\n'); }

function doneToday(day, which) {
  return day.today().events.some(e => (e.cmd === 'daily-done' || e.cmd === 'daily-acknowledged') && e.args[0] === which);
}

function isSet(which) { return fs.existsSync(fileOf(which)); }

function setup(which, src, replace) {
  need(WHICH.includes(which), 'setup <reading|phrase> <file> [--replace]');
  need(src && fs.existsSync(src), `no file at ${src}`);
  const text = fs.readFileSync(src, 'utf8');
  const items = KINDS[which].parse(text.split(/\r?\n/));
  need(items.length, which === 'reading'
    ? 'no readings found: each one is a line like "#### 1. [ ] Title", with its text under it'
    : 'no phrases found: each one is a line like "1. [ ] phrase — meaning *(pronunciation)* · note"');
  need(replace || !isSet(which), `the ${which} is already set up: add --replace to start a new plan`);
  writeAtomic(fileOf(which), text);
  const p = readPointers(); delete p[which]; writePointers(p);
  console.log(`${which}: set up, ${items.length} entries (${KINDS[which].title(text.split(/\r?\n/))}).`);
}

function show(day, which, by) {
  need(WHICH.includes(which), 'show <reading|phrase>');
  if (!isSet(which)) return console.log(`No ${which} set up yet: /day:daily sets one up.`);
  let { lines, eol, items, it, name } = current(which);
  const today = day.local(day.now()).date;
  if (which === 'reading' && it) {
    const p = readPointers(), ptr = p.reading || {};
    // Had its day already and nobody ticked it: move on by itself, one step only.
    if (ptr.shownDay === it.n && ptr.shownOn && ptr.shownOn < today) {
      lines[it.i] = lines[it.i].replace('[ ]', '[x]');
      writeAtomic(fileOf(which), lines.join(eol));
      day.record('daily-rolled', [which, KINDS.reading.label(it)], by);
      ({ items, it, name } = current(which));
    }
    if (it) { const q = readPointers(); q.reading = { shownDay: it.n, shownOn: today }; writePointers(q); }
  }
  let text = KINDS[which].render(it, name);
  // Only the phrase can run ahead of itself, because only its `done` advances.
  if (which === 'phrase' && doneToday(day, which)) text = '(already done today: this is tomorrow\'s)\n' + text;
  console.log(text);
}

function done(day, which, by) {
  need(WHICH.includes(which), 'done <reading|phrase>');
  need(isSet(which), `no ${which} set up yet`);
  if (which === 'reading') {
    const { it } = current(which);
    day.record('daily-acknowledged', [which, KINDS.reading.label(it)], by);
    return console.log(`reading: acknowledged ${KINDS.reading.label(it)}. It moves to the next one by itself tomorrow.`);
  }
  if (doneToday(day, which)) return console.log('phrase: already done today, not moving it again.');
  const { lines, eol, items, it } = current(which);
  need(it, 'phrase: nothing left to mark done');
  lines[it.i] = lines[it.i].replace('[ ]', '[x]');
  writeAtomic(fileOf(which), lines.join(eol));
  const next = items.find(x => !x.done && x.n !== it.n) || null;
  day.record('daily-done', [which, KINDS.phrase.label(it)], by);
  console.log(`phrase: done ${KINDS.phrase.label(it)}, next ${KINDS.phrase.label(next)}`);
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-daily-'));
  const settings = path.join(tmp, 'settings.json');
  fs.writeFileSync(settings, JSON.stringify({ stateDir: path.join(tmp, 'state'), timezone: 'UTC' }));
  const cp = require('child_process');
  const run = (now, ...args) => {
    const env = Object.assign({}, process.env, { JUDGEMENT_OS_SETTINGS: settings, JAY_DAY_FILE: path.join(tmp, 'state', 'day.json'), JAY_CLOCK_NOW: now });
    const r = cp.spawnSync(process.execPath, [__filename, ...args], { env, encoding: 'utf8' });
    return { code: r.status, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
  };
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  const D1 = '2026-10-06T09:00:00Z', D1b = '2026-10-06T20:00:00Z', D2 = '2026-10-07T09:00:00Z', D5 = '2026-10-10T09:00:00Z';
  ok('nothing set up', JSON.parse(run(D1, 'check').out).reading === false);
  ok('show says how to start', /\/day:daily sets one up/.test(run(D1, 'show', 'reading').out));
  const reading = path.join(tmp, 'r.md');
  fs.writeFileSync(reading, '# Reading: Short poems\n\n### Week 1\n#### 1. [ ] First poem\nThe text.\n\n#### 2. [ ] Second poem\nMore text.\n\n#### 3. [ ] Third poem\nStill more.\n');
  const phrase = path.join(tmp, 'p.md');
  fs.writeFileSync(phrase, '# Phrases: Spanish\n\n### Greetings\n1. [ ] Hola — hello *(OH-lah)* · the h is silent\n2. [ ] Gracias — thanks *(GRAH-syahs)*\n3. [ ] Adiós — goodbye\n');
  const bad = path.join(tmp, 'bad.md'); fs.writeFileSync(bad, '# Reading: nothing\n\nno entries here\n');
  ok('a plan with no entries is refused', run(D1, 'setup', 'reading', bad).code === 1);
  ok('setup installs both', run(D1, 'setup', 'reading', reading).code === 0 && run(D1, 'setup', 'phrase', phrase).code === 0);
  ok('a second setup needs --replace', run(D1, 'setup', 'reading', reading).code === 1);
  ok('reading day 1', /day 1 · Week 1\n\*\*First poem\*\*/.test(run(D1, 'show', 'reading').out));
  ok('the same day shows the same reading', /First poem/.test(run(D1b, 'show', 'reading').out));
  ok('done on the reading acknowledges, never advances', /acknowledged/.test(run(D1b, 'done', 'reading').out) && /First poem/.test(run(D1b, 'show', 'reading').out));
  ok('a new day rolls the reading on by itself', /Second poem/.test(run(D2, 'show', 'reading').out));
  ok('three missed days move it one step, not three', /Third poem/.test(run(D5, 'show', 'reading').out));
  ok('phrase day 1, with its note', /\*\*Hola\*\* — hello \*\(OH-lah\)\*\nthe h is silent/.test(run(D1, 'show', 'phrase').out));
  ok('the phrase holds until done', /Hola/.test(run(D2, 'show', 'phrase').out));
  ok('done moves the phrase on', /next day 2 · Gracias/.test(run(D2, 'done', 'phrase').out));
  ok('a second done the same day is refused', /already done today/.test(run(D2, 'done', 'phrase').out));
  ok('after done, show says it is tomorrow\'s', /already done today[\s\S]*Gracias/.test(run(D2, 'show', 'phrase').out));
  const st = JSON.parse(run(D2, 'status').out);
  ok('status: both, with done today', st.phrase.doneToday === true && st.reading.doneToday === false && /Third poem/.test(st.reading.current));
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

function main(argv) {
  if (argv[0] === '--test') process.exit(selfTest());
  const day = require('./day.js');
  const { args: [cmd, which, ...rest], by } = day.takeBy(argv);
  if (cmd === 'check') return console.log(JSON.stringify({ reading: isSet('reading'), phrase: isSet('phrase') }));
  if (cmd === 'setup') { const replace = rest.includes('--replace'); return setup(which, rest.find(a => a !== '--replace'), replace); }
  if (cmd === 'status' || !cmd) {
    const out = {};
    for (const w of WHICH) if (isSet(w)) out[w] = { current: KINDS[w].label(current(w).it), doneToday: doneToday(day, w) };
    return console.log(JSON.stringify(out, null, 2));
  }
  if (cmd === 'show') return show(day, which, by);
  if (cmd === 'done') return done(day, which, by);
  need(false, `unknown command "${cmd}": check | setup | show | status | done`);
}

if (require.main === module) main(process.argv.slice(2));
