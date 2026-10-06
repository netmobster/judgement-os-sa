#!/usr/bin/env node
// send-gate.js: the rule "nothing is sent to another person without the user's approval",
// enforced in code, because remembering it failed once and an "ask" failed once (bypass-permissions
// mode approves an ask automatically; a deny it cannot override).
//
// Two halves of one file:
//   PreToolUse   (default)    every outbound send is DENIED unless a pass exists. A pass is
//                             used up by one send.
//   UserPromptSubmit (--prompt)  a pass is issued ONLY when the user's own typed message is a bare
//                             approval ("send", "send it", "yes send", "approved", "ship it").
//                             Claude can't type the user's messages, so it can't issue itself a pass.
//
// The pass lives in the settings' state folder (jos-settings: stateDir), as send-pass.json. The
// guard plugin blocks Claude writing it by any route. The settings' sendGate.exempt lists the user's
// OWN Slack user id and self-DM channel, the only sends that need no pass.
// Test: node send-gate.js --test

const fs = require('fs');
const path = require('path');
const os = require('os');
const S = require('./jos-settings');

const PASS = process.env.JAY_SEND_PASS || path.join(S.stateDir(), 'send-pass.json');
const TTL_MS = 15 * 60 * 1000;
const OUTBOUND = /^mcp__.+__(slack_send_message|slack_schedule_message|send_message|broadcast_message|respond_to_feedback|send_email|gmail_send|send_draft)$/;
// The WHOLE message must be the approval, so "Send me a test DM" never counts.
const APPROVAL = /^\s*(yes[\s,!.]*)?(send( it)?|send that|approved?|ship it|go ahead,? send( it)?)[\s.!]*$/i;

function readPass() { try { return JSON.parse(fs.readFileSync(PASS, 'utf8')); } catch (e) { return null; } }
function validPass(now = Date.now()) { const p = readPass(); return p && p.uses > 0 && now - p.issuedAt < TTL_MS ? p : null; }

function onPrompt(prompt, now = Date.now()) {
  if (!APPROVAL.test(String(prompt || ''))) return false;
  fs.mkdirSync(path.dirname(PASS), { recursive: true });
  fs.writeFileSync(PASS, JSON.stringify({ issuedAt: now, uses: 1, by: 'typed', text: String(prompt).trim().slice(0, 40) }));
  return true;
}

// The user themselves. The rule is about messages to OTHER people, and a scheduled task that DMs the
// user has nobody there to type "send". Slack only, and only the ids in the settings. Message-rail
// sends and broadcasts get no exemption.
const SELF_SLACK = new Set((S.load().sendGate.exempt || []).map(String));

function onTool(input, now = Date.now()) {
  const tool = String(input.tool_name || '');
  if (!OUTBOUND.test(tool)) return null;
  const verb = tool.replace(/^mcp__.+__/, '');
  const ti = input.tool_input || {};
  const to = ti.channel_id || ti.to || ti.recipient || ti.toUsername || ti.username || '?';
  if (/^slack_(send|schedule)_message$/.test(verb) && SELF_SLACK.has(String(ti.channel_id || ''))) return null;
  const p = validPass(now);
  if (p) {
    try { fs.unlinkSync(PASS); } catch (e) {}          // single use
    return null;                                       // allow
  }
  return {
    decision: 'deny',
    reason: `Send gate: ${verb} to ${to} is blocked. Show the user the exact text and recipient and ask. ` +
      `The gate opens for ONE send when the user types "send" (or "send it" / "approved") as their whole message. ` +
      `Then retry the identical call. Never ask them to type it for a message they haven't seen.`,
  };
}

function emitTool(res) {
  if (!res) return;
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: res.decision, permissionDecisionReason: res.reason } }));
}

if (process.argv[2] === '--test') {
  const tmp = path.join(os.tmpdir(), `send-pass-test-${process.pid}.json`);
  const settings = path.join(os.tmpdir(), `send-gate-settings-${process.pid}.json`);
  fs.writeFileSync(settings, JSON.stringify({ sendGate: { exempt: ['U1SELF', 'D1SELF'] } }));   // never the operator's own
  const gate = require('child_process');
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  // Re-run this file's logic against a temp pass file and temp settings.
  const T = { tool_name: 'mcp__x__slack_send_message', tool_input: { channel_id: 'U1', message: 'hi' } };
  const run = (args, stdin) => gate.execFileSync(process.execPath, [__filename, ...args], { input: JSON.stringify(stdin), env: { ...process.env, JAY_SEND_PASS: tmp, JUDGEMENT_OS_SETTINGS: settings }, encoding: 'utf8' });
  try { fs.unlinkSync(tmp); } catch (e) {}
  ok('self-DM by user id passes', run([], { tool_name: 'mcp__x__slack_send_message', tool_input: { channel_id: 'U1SELF', message: 'metrics' } }) === '');
  ok('self-DM by channel passes', run([], { tool_name: 'mcp__x__slack_send_message', tool_input: { channel_id: 'D1SELF', message: 'metrics' } }) === '');
  ok('a team channel is still blocked', /"deny"/.test(run([], { tool_name: 'mcp__x__slack_send_message', tool_input: { channel_id: 'C0TEAM', message: 'x' } })));
  ok('a message-rail send to yourself is not exempt', /"deny"/.test(run([], { tool_name: 'mcp__x__send_message', tool_input: { toUsername: 'me', body: 'x' } })));
  try { fs.unlinkSync(tmp); } catch (e) {}
  ok('no pass → deny', /"deny"/.test(run([], T)));
  ok('draft passes', run([], { tool_name: 'mcp__x__slack_send_message_draft', tool_input: {} }) === '');
  ok('read passes', run([], { tool_name: 'mcp__x__slack_read_channel', tool_input: {} }) === '');
  for (const s of ['Send me a test Slack DM saying gate test', 'send the report to the team later', 'can you send it?', 'I approved of that'])
    { run(['--prompt'], { prompt: s }); ok(`"${s}" issues no pass`, !fs.existsSync(tmp)); }
  for (const s of ['send', 'Send it', 'yes send', 'yes, send it!', 'approved', 'ship it', 'go ahead, send it'])
    { try { fs.unlinkSync(tmp); } catch (e) {} run(['--prompt'], { prompt: s }); ok(`"${s}" issues a pass`, fs.existsSync(tmp)); }
  ok('pass → allow', run([], T) === '');
  ok('pass used up → deny again', /"deny"/.test(run([], T)));
  fs.writeFileSync(tmp, JSON.stringify({ issuedAt: Date.now() - TTL_MS - 1000, uses: 1 }));
  ok('expired pass → deny', /"deny"/.test(run([], T)));
  try { fs.unlinkSync(tmp); } catch (e) {}
  try { fs.unlinkSync(settings); } catch (e) {}
  console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
} else {
  let raw = '';
  process.stdin.on('data', d => (raw += d));
  process.stdin.on('end', () => {
    let input = {};
    try { input = JSON.parse(raw || '{}'); } catch (e) { return; }
    try {
      if (process.argv[2] === '--prompt') onPrompt(input.prompt);
      else emitTool(onTool(input));
    } catch (e) {
      // Fail CLOSED for sends: if anything breaks, an outbound call is still denied.
      if (process.argv[2] !== '--prompt' && OUTBOUND.test(String(input.tool_name || '')))
        emitTool({ decision: 'deny', reason: 'Send gate errored, so the send is blocked. Tell the user.' });
    }
  });
}
