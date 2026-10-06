# Judgement OS: selfActual Edition 0.1.0

Built 2026-10-06 from source da667dc.

The selfActual Edition reads your tasks, sessions and gears from your selfActual vault. Without a selfActual account it still runs, with less to work from: see selfactual.ai.

## What is in it

| Plugin | Version | What it does |
|---|---|---|
| `labs` | 0.8.1 | The Judgement OS core: two judges consulted at marked decisions inside skills, the recorder that checks every answer and combines the two, the append-only log, /labs:profile, the one file the judges read about you, and /labs:try, which puts both judges on a morning blind so you can see which one you trust. |
| `guard` | 0.2.2 | Hard rules as hooks: deploys are printed for you to run, destructive commands and secrets ask first, state files change only through their scripts, writes to someone else's vault ask, and a session is archived only when you say so. |
| `sexyhtml` | 0.15.2 | House styles for finished HTML pages. /sexyhtml picks the style (ECHO-JAY by default, selfActual for work, Seren for games) and the shape, with the Judgement OS weighing in when a request reads two ways; or name one: /sexyhtml:jay, /sexyhtml:sa, /sexyhtml:seren, /sexyhtml:judgement-os. |
| `make` | 0.8.1 | Say what you want made, and it lands in the right place, in your look: a page, a form or card in the chat, a deck, a design, a living doc, a file or a design system. /make picks where it lands, with the Judgement OS weighing in when a request reads two ways, then hands it to the right maker. Pages go to sexyhtml, selfActual work in the selfActual design system. |
| `comms` | 0.6.1 | The send gate, which stops every outbound message until you type send; humanify, a de-tic pass for drafts written with AI in the room; poll, which reads the Slack channels you choose and drafts replies that post only when you approve them; and your selfActual vault's messages, FOR CC reminders and /ping. |
| `day` | 0.3.1 | A day loop for Claude Code: a short boot with the judges on the style pick, mid-day and end-of-day check-ins from your selfActual vault, habits you set up once, a daily reading and a phrase in a language you're learning, /flag for work you want to come back to, and a clock on every message. |
| `dice` | 0.2.1 | Real dice for tabletop games: any notation, advantage and disadvantage, damage, ability scores. Never an invented roll. |
| `sa` | 0.3.1 | selfActual in Claude Code: your gears, loops and modes, fetched from your vault through one router, with the General Edition's set as files for when the vault isn't there, and the vault session commands: open, close, board and task. |

## Changes

First release. Everything in the General Edition, working from your selfActual vault, plus your gears, loops and modes through one router, the vault session commands, /sa:profile, the selfActual design system, and a field guide that opens on first run. It runs for selfActual users: once a month it checks that the selfActual server answers for you.
