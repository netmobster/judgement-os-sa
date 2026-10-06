#!/usr/bin/env node
// day.js: the one writer of day.json, in the settings' state folder (jos-settings: stateDir).
//
// day.json is today's shared state across every Claude Code session on this machine:
// which boot style ran, energy, what was held, where the check-ins stand, and an
// event log of everything done today. CC changes it only through this script, so
// concurrent sessions and hand-edited JSON can't corrupt it. clock.js (the
// UserPromptSubmit hook) only reads it. Times are in the settings' time zone.
//
//   node day.js show
//   node day.js boot <style> <energy> <session>     e.g. boot general 9 morning
//   node day.js hold <item> [item...]                skipped at boot → held
//   node day.js unhold <item>                        loaded later → no longer held
//   node day.js offer <midday|eod>                   offered: quiet for 1h (no answer = later)
//   node day.js done <midday|eod>
//   node day.js skip <midday|eod>                    "not today"
//   node day.js carry <item> [item...]               EOD "keep for tomorrow"
//
// Every command takes an optional `--by <session>` and is appended to the day's
// `events` — who did what, when. No --by means by:null, never a guess.
//
// A new date starts a fresh day. The finished day is first appended to
// days.jsonl beside day.json (append-only history), then yesterday's `carry`
// becomes today's held items, marked from:"yesterday" — nothing carries unless
// it was kept on purpose.
//
// Test overrides: JAY_DAY_FILE (path; days.jsonl sits beside it), JAY_CLOCK_NOW.

const fs = require('fs');
const path = require('path');
const os = require('os');

const S = require('./jos-settings');
const TZ = S.timezone();
const DAY_FILE = process.env.JAY_DAY_FILE || path.join(S.stateDir(), 'day.json');
const HISTORY_FILE = path.join(path.dirname(DAY_FILE), 'days.jsonl');
const SNOOZE_MS = 60 * 60 * 1000;
const KINDS = ['midday', 'eod'];

function now() {
  return process.env.JAY_CLOCK_NOW ? new Date(process.env.JAY_CLOCK_NOW) : new Date();
}

// Wall-clock parts for an instant, in the settings' time zone.
function local(d) {
  const p = {};
  for (const { type, value } of new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short',
  }).formatToParts(d)) p[type] = value;
  const month = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, month: 'short' }).format(d).slice(0, 3);
  return {
    date: `${p.year}-${p.month}-${p.day}`,
    minutes: Number(p.hour) * 60 + Number(p.minute),
    label: `${p.weekday} ${Number(p.day)} ${month} ${p.hour}:${p.minute}`,
  };
}

function read() {
  try { return JSON.parse(fs.readFileSync(DAY_FILE, 'utf8')); } catch { return null; }
}

function fresh(date, prev) {
  const at = now().toISOString();
  return {
    date,
    session: null,
    style: null,
    energy: null,
    held: (prev && Array.isArray(prev.carry) ? prev.carry : [])
      .map(c => ({ item: c.item || c, from: 'yesterday', at })),
    carry: [],
    midday: { status: 'pending' },
    eod: { status: 'pending' },
    events: [],
    updatedAt: at,
  };
}

// Today's day object: the file if it's today's, otherwise a fresh day seeded
// from whatever the old file carried. `prev` is set when a rollover is pending.
function load() {
  const date = local(now()).date;
  const prev = read();
  if (prev && prev.date === date) {
    if (!Array.isArray(prev.events)) prev.events = [];
    return { day: prev, prev: null };
  }
  return { day: fresh(date, prev), prev: prev && prev.date ? prev : null };
}

function today() {
  return load().day;
}

// Append the finished day to history once, even if two sessions roll over at once.
function archive(prev) {
  let last = null;
  try {
    const lines = fs.readFileSync(HISTORY_FILE, 'utf8').trim().split('\n');
    last = JSON.parse(lines[lines.length - 1]);
  } catch { /* no history yet */ }
  if (last && last.date === prev.date) return;
  fs.appendFileSync(HISTORY_FILE, JSON.stringify(prev) + '\n');
}

function write(day) {
  day.updatedAt = now().toISOString();
  fs.mkdirSync(path.dirname(DAY_FILE), { recursive: true });
  const tmp = `${DAY_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(day, null, 2) + '\n');
  fs.renameSync(tmp, DAY_FILE);
}

// The one way to change day.json: load today (rolling over if needed), apply
// `change`, log the event, write. Other scripts use this too.
function record(cmd, args, by, change) {
  const { day, prev } = load();
  if (prev) archive(prev);
  if (change) change(day);
  // Unattributed is honest; defaulting to the boot session would credit the wrong one.
  day.events.push({ at: now().toISOString(), cmd, args, by: by || null });
  write(day);
  return day;
}

// Where a check-in stands right now: pending | snoozed | done | skipped.
function checkinState(day, kind) {
  const c = day && day[kind];
  if (!c) return 'pending';
  if (c.status === 'done' || c.status === 'skipped') return c.status;
  if (c.snoozedUntil && new Date(c.snoozedUntil) > now()) return 'snoozed';
  return 'pending';
}

// Pull `--by X` out of an argument list.
function takeBy(argv) {
  const i = argv.indexOf('--by');
  if (i === -1) return { args: argv, by: null };
  return { args: [...argv.slice(0, i), ...argv.slice(i + 2)], by: argv[i + 1] || null };
}

function need(cond, msg) {
  if (!cond) { console.error(`day.js: ${msg}`); process.exit(1); }
}

function main(argv) {
  const { args: [cmd, ...args], by } = takeBy(argv);
  if (!cmd || cmd === 'show') { console.log(JSON.stringify(today(), null, 2)); return; }

  const at = now().toISOString();
  let change;

  switch (cmd) {
    case 'boot': {
      const [style, energy, session] = args;
      need(['bare', 'project', 'general', 'full'].includes(style), 'boot <bare|project|general|full> <energy> <session>');
      change = day => {
        day.style = style;
        day.energy = energy && energy !== '-' ? Number(energy) : null;
        day.session = session || null;
      };
      break;
    }
    case 'hold':
      need(args.length, 'hold <item> [item...]');
      change = day => {
        for (const item of args) {
          if (!day.held.some(h => h.item === item)) day.held.push({ item, from: 'boot', at });
        }
      };
      break;
    case 'unhold':
      need(args.length, 'unhold <item> [item...]');
      change = day => { day.held = day.held.filter(h => !args.includes(h.item)); };
      break;
    case 'offer':
    case 'snooze':
      need(KINDS.includes(args[0]), `${cmd} <midday|eod>`);
      change = day => {
        day[args[0]] = { status: 'pending', offeredAt: at, snoozedUntil: new Date(now().getTime() + SNOOZE_MS).toISOString() };
      };
      break;
    case 'done':
    case 'skip':
      need(KINDS.includes(args[0]), `${cmd} <midday|eod>`);
      change = day => { day[args[0]] = { status: cmd === 'done' ? 'done' : 'skipped', at }; };
      break;
    case 'carry':
      need(args.length, 'carry <item> [item...]');
      change = day => {
        for (const item of args) {
          if (!day.carry.some(c => c.item === item)) day.carry.push({ item, at });
        }
        day.held = day.held.filter(h => !args.includes(h.item));
      };
      break;
    default:
      need(false, `unknown command "${cmd}"`);
  }

  const day = record(cmd, args, by, change);
  // `boot` sets the session, so attribute the boot event itself to it.
  if (cmd === 'boot' && !by && day.session) {
    day.events[day.events.length - 1].by = day.session;
    write(day);
  }
  console.log(JSON.stringify(day, null, 2));
}

module.exports = { TZ, DAY_FILE, HISTORY_FILE, now, local, read, today, record, checkinState, takeBy };

if (require.main === module) main(process.argv.slice(2));
