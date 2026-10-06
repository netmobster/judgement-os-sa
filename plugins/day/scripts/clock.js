#!/usr/bin/env node
// clock.js: UserPromptSubmit hook. Read-only.
//
// Stamps the time (the settings' time zone) onto every message the user sends, in any Claude Code
// session, and says when a check-in is due, so Claude can offer it without anyone remembering.
// Reads day.json through day.js; never writes it.
//
//   13:00 → mid-day check-in due, unless done / skipped / snoozed.
//   16:00 → end-of-day check-in due. Mid-day is no longer offered after 16:00;
//           if it never ran, /checkin eod folds its task review in.
//
// Must never block a prompt: any failure prints nothing and exits 0.

const MIDDAY = 13 * 60;
const EOD = 16 * 60;

function stamp() {
  const { now, local, read, checkinState, TZ } = require('./day.js');
  const t = local(now());
  const file = read();
  const day = file && file.date === t.date ? file : null;

  let line = `[clock] ${t.label} ${TZ}`;
  const held = day ? day.held.length : 0;
  if (held) line += ` · held: ${held}`;

  let due = null;
  if (t.minutes >= EOD) {
    if (checkinState(day, 'eod') === 'pending') due = 'eod';
  } else if (t.minutes >= MIDDAY) {
    if (checkinState(day, 'midday') === 'pending') due = 'midday';
  }

  if (due) {
    const name = due === 'midday' ? 'Mid-day' : 'End-of-day';
    // The plugin's install path changes with each version, so name day.js by where this file is.
    const dayJs = require('path').join(__dirname, 'day.js').replace(/\\/g, '/');
    line += ` · ${name.toUpperCase()} CHECK-IN DUE — answer the user first, then offer it once in plain prose:` +
      ` "${name} check-in — now, later, or not today?" Run \`node "${dayJs}" offer ${due}\`` +
      ` as you offer (it goes quiet for 1h), then run the day:checkin skill.`;
  }
  return line;
}


try {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: stamp() },
  }));
} catch {
  // Silent by design: a broken clock must never cost the user a message.
}
process.exit(0);
