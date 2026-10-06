#!/usr/bin/env node
// profile-init.js: the starter profile for a new operator (2 Oct 2026, step 4).
//
// The judges read one file about the operator: the `profile` in the settings (jos-settings). This
// writes the starter (templates/profile-starter.md) there, but only when nothing is there yet. It
// never overwrites: a profile someone wrote is theirs. The starter carries a line that keeps every
// judge quiet until it's filled in and the line is deleted (/labs:profile walks through it).
//
//   node profile-init.js            write the starter if there's no profile; print the state
//   node profile-init.js --check    the state, and the lines that carry a private word
//   node profile-init.js --test
//
// Prints JSON: {path, state: none|starter|ready, created} (+ privateLines with --check).
const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./jos-settings');

const STARTER_FILE = path.join(__dirname, '..', 'templates', 'profile-starter.md');

function init(env = process.env) {
  const p = S.load(env).profile;
  if (!p) return { path: null, state: 'none', created: false, problem: 'the settings name no profile file' };
  let created = false;
  if (!fs.existsSync(p)) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    try { fs.writeFileSync(p, fs.readFileSync(STARTER_FILE), { flag: 'wx' }); created = true; }   // wx: never over a file that appeared meanwhile
    catch (e) { if (e.code !== 'EEXIST') throw e; }
  }
  return { path: p, state: S.profileState(env), created };
}

// Which lines carry a word from the settings' private list. Line numbers only: the words are the
// operator's own, in their own file, and the fix is theirs to make.
function check(env = process.env) {
  const p = S.load(env).profile;
  const out = { path: p || null, state: S.profileState(env) };
  if (out.state !== 'none') {
    const re = S.silo(env);
    out.privateLines = fs.readFileSync(p, 'utf8').split('\n').map((l, i) => (re.test(l) ? i + 1 : 0)).filter(Boolean);
  }
  return out;
}

module.exports = { init, check, STARTER_FILE };

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--test') {
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-init-'));
    const env = (body) => { const f = path.join(tmp, `settings-${n}-${Math.random().toString(36).slice(2, 6)}.json`); fs.writeFileSync(f, JSON.stringify(body)); return { JUDGEMENT_OS_SETTINGS: f }; };
    const starterText = fs.readFileSync(STARTER_FILE, 'utf8');
    ok('the starter carries the line that keeps the judges quiet, first', starterText.split('\n')[0].includes(S.STARTER));
    const fresh = path.join(tmp, 'new', 'profile.md');
    const e1 = env({ profile: fresh });
    const r1 = init(e1);
    ok('no profile: the starter is written, and it counts as not filled in', r1.created && r1.state === 'starter' && fs.readFileSync(fresh, 'utf8') === starterText);
    ok('the starter carries no private word', check(e1).privateLines.length === 0);
    fs.appendFileSync(fresh, '\nmine now\n');
    const r2 = init(e1);
    ok('a second run never overwrites', !r2.created && fs.readFileSync(fresh, 'utf8').endsWith('mine now\n'));
    const written = path.join(tmp, 'written.md');
    fs.writeFileSync(written, '# How I work\nI ship fast.\nMy health comes first.\n');
    const e2 = env({ profile: written });
    const r3 = init(e2);
    ok('a filled-in profile is ready and left alone', !r3.created && r3.state === 'ready' && fs.readFileSync(written, 'utf8').startsWith('# How I work'));
    ok('check names the line with a private word', JSON.stringify(check(e2).privateLines) === '[3]');
    ok('no profile path in the settings: said, not guessed', !!init(env({ profile: null })).problem);
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  console.log(JSON.stringify(arg === '--check' ? check() : init(), null, 2));
}
