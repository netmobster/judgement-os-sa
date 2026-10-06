#!/usr/bin/env node
// welcome.js: a SessionStart hook. Plugins can't run anything when they're installed, so this is the
// nearest thing: the first sessions after an install (or an update) open the field guide.
//
// Until the user's own copy of the guide exists (`pages/guide.json` in the settings folder, which
// /day:guide writes when it publishes the page), it tells Claude to run /day:guide. It says so at
// most three times, counted in welcome.json in the state folder, then stays quiet: a guide that
// never got opened is the user's call, and nagging isn't a welcome.
//
//   node welcome.js            the hook: prints the context, or nothing
//   node welcome.js --test
// Test override: JUDGEMENT_OS_SETTINGS.

const fs = require('fs');
const path = require('path');
const os = require('os');

const MAX = 3;

function paths() {
  const S = require('./jos-settings');
  return { link: path.join(path.dirname(S.file()), 'pages', 'guide.json'), count: path.join(S.stateDir(), 'welcome.json') };
}

// What the welcome says the system is, per edition.
let WHAT = 'Judgement OS is a set of Claude Code plugins: a second opinion at the few decisions inside skills where '
  + 'the right answer depends on the user, a day loop (boot, check-ins, habits), house styles for pages, a send gate, '
  + 'and thinking tools. It works from files on their machine and never needs an account.';
WHAT = 'Judgement OS, the selfActual Edition, is a set of Claude Code plugins that work from the user\'s selfActual '
  + 'vault: a second opinion at the few decisions inside skills where the right answer depends on them, a day loop '
  + 'from their vault tasks, their gears, loops and modes through one router, their messages, and their profile at '
  + 'the depth they pick. It runs for selfActual users: if the sa plugin\'s account check asks for it, do that first, '
  + 'and open the guide only once it says open.';

const MESSAGE = [
  'Judgement OS was just installed or updated, and the user hasn\'t opened its field guide yet.',
  WHAT,
  'Before other work this session, welcome them to it in one or two plain lines: what it is, and that their field',
  'guide is opening. Then run /day:guide: it publishes the user\'s own copy of the field guide (one step per part,',
  'with what to type and what they should see) and opens it. With no Artifact tool on this surface, it says where the',
  'page is instead. If the user\'s first message is already a task, do the task first, then give the welcome and offer',
  'the guide in one line at the end.',
].join(' ');

function hook() {
  const p = paths();
  if (fs.existsSync(p.link)) return '';
  let seen = { shown: 0 };
  try { seen = JSON.parse(fs.readFileSync(p.count, 'utf8')) || seen; } catch (e) {}
  if ((seen.shown || 0) >= MAX) return '';
  const next = { shown: (seen.shown || 0) + 1, first: seen.first || new Date().toISOString(), last: new Date().toISOString() };
  try {
    fs.mkdirSync(path.dirname(p.count), { recursive: true });
    const tmp = `${p.count}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + '\n');
    fs.renameSync(tmp, p.count);
  } catch (e) { /* a read-only state folder must never break a session */ }
  return JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: MESSAGE } });
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-welcome-'));
  const settings = path.join(tmp, 'settings.json');
  fs.writeFileSync(settings, JSON.stringify({ stateDir: path.join(tmp, 'state') }));
  const env = Object.assign({}, process.env, { JUDGEMENT_OS_SETTINGS: settings });
  const cp = require('child_process');
  const run = () => (cp.spawnSync(process.execPath, [__filename], { env, encoding: 'utf8' }).stdout || '').trim();
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  const first = run();
  let parsed = null; try { parsed = JSON.parse(first); } catch (e) {}
  ok('the first session after an install gets the guide', parsed && parsed.hookSpecificOutput.hookEventName === 'SessionStart' && /\/day:guide/.test(parsed.hookSpecificOutput.additionalContext));
  ok('it is counted', JSON.parse(fs.readFileSync(path.join(tmp, 'state', 'welcome.json'), 'utf8')).shown === 1);
  run(); run();
  ok('at most three times, then quiet', run() === '' && JSON.parse(fs.readFileSync(path.join(tmp, 'state', 'welcome.json'), 'utf8')).shown === 3);
  fs.writeFileSync(path.join(tmp, 'state', 'welcome.json'), JSON.stringify({ shown: 0 }));
  fs.mkdirSync(path.join(tmp, 'pages'));
  fs.writeFileSync(path.join(tmp, 'pages', 'guide.json'), JSON.stringify({ url: 'https://example.com/guide' }));
  ok('once the guide has been opened, quiet', run() === '');
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

if (require.main === module) {
  if (process.argv[2] === '--test') process.exit(selfTest());
  let out = '';
  try { out = hook(); } catch (e) { out = ''; }
  if (out) process.stdout.write(out + '\n');
  process.exit(0);
}
module.exports = { hook };
