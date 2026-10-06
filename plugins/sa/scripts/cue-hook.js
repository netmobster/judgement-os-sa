#!/usr/bin/env node
// cue-hook.js: UserPromptSubmit. A prompt that STARTS with `::` is a CUE command. A `::`
// anywhere else (a pasted doc, a quote) is ignored on purpose: that's CUE's one
// security-shaped test (os/docs/cue/README.md).
//
// Determinism is the product, so the fixed-text commands (bare, HELP, README) are read from
// disk HERE and handed to the model verbatim. No skill hop, nothing to improvise.
// TRY and STATUS go to the sa:cue skill, because they have to run things.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MENU = [
  'CUE: what this system can do, without needing to know its names.',
  '',
  '  :: HELP     what exists, and how to call it',
  '  :: TRY      run one of them on your own material',
  '  :: STATUS   what\'s running, and what\'s broken',
  '',
  '  :: README   what Judgement OS is',
].join('\n');

function catalog() {
  try {
    const t = fs.readFileSync(path.join(ROOT, 'reference', 'catalog.md'), 'utf8');
    const m = t.match(/```\n([\s\S]*?)\n```/);
    return m ? m[1] : t;
  } catch (e) { return null; }
}

function verbatim(text) {
  return `[cue] The user typed a CUE command. Reply with EXACTLY the text between the markers, in one fenced code block, and nothing else: no intro, no follow-up, no offer.\n<<<\n${text}\n>>>`;
}

let raw = '';
process.stdin.on('data', d => (raw += d));
process.stdin.on('end', () => {
  let prompt = '';
  try { prompt = String(JSON.parse(raw || '{}').prompt || ''); } catch (e) { return; }
  const m = prompt.replace(/^﻿/, '').match(/^\s*:\s?:(.*)$/s);
  if (!m) return;
  const rest = m[1].trim().split('\n')[0].slice(0, 200);
  const [cmd, ...more] = rest.split(/\s+/);
  const verb = (cmd || '').toLowerCase();
  const arg = more.join(' ');
  let ctx;

  if (!verb) ctx = verbatim(MENU);
  else if (verb === 'help') {
    const c = catalog();
    if (!c) ctx = '[cue] The catalog file is missing. Say so in one line: reinstall the sa plugin.';
    else if (arg) {
      const block = c.split(/\n(?=\S)/).find(b => b.toLowerCase().startsWith(arg.toLowerCase() + ' '));
      const installed = c.split('\n').map(l => (l.match(/^([a-z][a-z0-9-]*)  v\d/) || [])[1]).filter(Boolean).join(', ');
      ctx = verbatim(block ? block.trim() : `No plugin called "${arg}". Installed: ${installed}.`);
    } else ctx = verbatim(c);
  } else if (verb === 'readme') {
    const c = catalog();
    ctx = verbatim(c ? c.split(/\n\n(?=[a-z-]+  v)/)[0].trim() : 'Judgement OS: tools for Claude Code, as plugins.');
  } else if (verb === 'try' || verb === 'status') {
    ctx = `[cue] The user typed \`:: ${rest}\`. Run the sa:cue skill with arguments: ${rest}. Follow it exactly; no commentary.`;
  } else {
    ctx = verbatim(`Unknown CUE command "${verb}".\n\n${MENU}`);
  }
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: ctx } }));
});
