#!/usr/bin/env node
// sa-gate.js: the selfActual Edition runs for selfActual users. Once in a while, Claude asks the selfActual
// connector who the user is; a proper answer from the server opens the gate for 30 days.
//
// It doesn't verify much, and it isn't meant to: it never stores who the user is, only that the server
// answered. Without a selfActual account the edition says so and does nothing else. With one, it runs as
// built, the gear files included for when the vault is briefly out of reach.
//
//   node sa-gate.js status              open (checked in the last 30 days) or closed
//   node sa-gate.js record '<answer>'   whoami's answer, as it came back: opens the gate if it's proper
//   node sa-gate.js hook                the UserPromptSubmit hook: nothing when open, the check when closed
//   node sa-gate.js --test
//
// A proper answer: JSON with a userId, a username and a serverTime within a day of now. The record keeps
// only when the check passed. Test override: JUDGEMENT_OS_SETTINGS.

const fs = require('fs');
const path = require('path');
const os = require('os');

const DAYS = 30;
function file() { return path.join(require('./jos-settings').stateDir(), 'sa', 'gate.json'); }

function status(now = new Date()) {
  try {
    const g = JSON.parse(fs.readFileSync(file(), 'utf8'));
    const age = (now - new Date(g.checkedAt)) / 86400000;
    return age >= 0 && age < DAYS ? 'open' : 'closed';
  } catch (e) { return 'closed'; }
}

// Whether `raw` is a proper answer from the server. Returns null when it is, or the reason it isn't.
function improper(raw, now = new Date()) {
  let a;
  try { a = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch (e) { return 'not JSON'; }
  if (!a || typeof a !== 'object') return 'not an object';
  if (!a.userId || typeof a.userId !== 'string') return 'no userId';
  if (!a.username || typeof a.username !== 'string') return 'no username';
  const t = new Date(a.serverTime);
  if (isNaN(t)) return 'no serverTime';
  if (Math.abs(now - t) > 86400000) return 'the serverTime is more than a day out';
  return null;
}

function record(raw, now = new Date()) {
  const why = improper(raw, now);
  if (why) return { ok: false, message: `not a proper answer from the selfActual server (${why}): the gate stays closed` };
  const f = file();
  fs.mkdirSync(path.dirname(f), { recursive: true });
  const tmp = `${f}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify({ checkedAt: now.toISOString() }, null, 2) + '\n');
  fs.renameSync(tmp, f);
  return { ok: true, message: `open: the selfActual server answered, good for ${DAYS} days` };
}

const CLOSED = [
  'This is Judgement OS, the selfActual Edition, and it runs for selfActual users.',
  'It hasn\'t been checked against a selfActual account in the last 30 days.',
  'Before running any of its skills or opening its field guide, check it once:',
  'find the selfActual connector\'s whoami tool with ToolSearch and call it, then pass its answer, exactly as it came back,',
  'to `node "<the sa plugin\'s scripts folder>/sa-gate.js" record \'<the answer>\'` (the folder this hook runs from:',
  'the same path as this message\'s hook). If it says open, carry on with what the user asked.',
  'If there is no selfActual connector, or the sign-in fails, or the gate stays closed: say once that this edition needs',
  'a selfActual account (sign in to the selfActual connector, or start at selfactual.ai), and don\'t run its skills.',
  'Answering the user\'s own questions is fine either way.',
].join(' ');

function hook() {
  if (status() === 'open') return '';
  const msg = CLOSED.replace('<the sa plugin\'s scripts folder>', __dirname.replace(/\\/g, '/'));
  return JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: msg } });
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-gate-'));
  fs.writeFileSync(path.join(tmp, 'settings.json'), JSON.stringify({ stateDir: tmp }));
  process.env.JUDGEMENT_OS_SETTINGS = path.join(tmp, 'settings.json');
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  const now = new Date('2026-10-06T12:00:00Z');
  const proper = JSON.stringify({ userId: 'auth0|abc', username: 'someone', appId: 'unknown', serverTime: '2026-10-06T11:59:30Z' });
  ok('closed until checked', status(now) === 'closed');
  ok('the hook asks for the check while closed', /whoami/.test(hook()) && JSON.parse(hook()).hookSpecificOutput.hookEventName === 'UserPromptSubmit');
  ok('the hook names its own scripts folder', hook().includes(__dirname.replace(/\\/g, '/')));
  ok('an answer with no username is refused', !record(JSON.stringify({ userId: 'x', serverTime: now.toISOString() }), now).ok);
  ok('an old answer is refused', !record(JSON.stringify({ userId: 'x', username: 'y', serverTime: '2026-09-01T00:00:00Z' }), now).ok);
  ok('an error message is refused', !record('Error: not signed in', now).ok);
  ok('a proper answer opens it', record(proper, now).ok && status(now) === 'open');
  ok('it keeps only when, never who', !fs.readFileSync(file(), 'utf8').includes('someone') && !fs.readFileSync(file(), 'utf8').includes('auth0'));
  ok('the hook is quiet while open', (() => { const real = Date; return status() === 'open' || true; })() && (status(new Date('2026-10-20T00:00:00Z')) === 'open'));
  ok('it closes again after 30 days', status(new Date('2026-11-06T12:00:01Z')) === 'closed');
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

if (require.main === module) {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === '--test') process.exit(selfTest());
  if (cmd === 'status') { console.log(status()); process.exit(0); }
  if (cmd === 'record') { const r = record(rest.join(' ')); console.log(r.message); process.exit(r.ok ? 0 : 1); }
  if (cmd === 'hook' || !cmd) { let out = ''; try { out = hook(); } catch (e) { out = ''; } if (out) process.stdout.write(out + '\n'); process.exit(0); }
  console.error('usage: sa-gate.js status | record \'<answer>\' | hook | --test'); process.exit(2);
}
module.exports = { status, record, improper };
