# Judgement OS: selfActual Edition

A second opinion for your Claude Code skills, only when they need one, working from your selfActual vault. The "OS"
is a joke; the plugins aren't.

Version 0.1.0 · MIT · made by Jay Wright · [the Judgement OS page](https://netmobster.github.io/unstuck-games/judgement-os/)

## What it does

Your skills run their steps, same as always. At the few decisions where the right answer depends on you, or on
something nobody could know when the skill was written, a rule picks first. When the rule can't tell, two judges
read your profile and answer one small question. You only hear about it when both disagree with the rule and both
mean it. Every call is logged on your machine.

The selfActual Edition works from your vault: your tasks and sessions at boot and at the check-ins, your gears,
loops and modes through one router, your messages, and your profile at the depth you pick. Pages for selfActual work
come out in the selfActual design system.

The judges recommend. They never authorise: they can't send a message, deploy, merge or touch protected files, and
the guard's hard rules run as hooks, not instructions.

## Install

In Claude Code:

```
/plugin marketplace add netmobster/judgement-os-sa
/plugin install labs@judgement-os-sa
/plugin install guard@judgement-os-sa
/plugin install sexyhtml@judgement-os-sa
/plugin install make@judgement-os-sa
/plugin install comms@judgement-os-sa
/plugin install day@judgement-os-sa
/plugin install dice@judgement-os-sa
/plugin install sa@judgement-os-sa
```

Install all of them, or just the ones you want. `labs` is the core; the others use it when it's there and carry on
when it isn't. The first session after you install opens a field guide, one step per part.

Then run `/labs:profile`, or `/sa:profile` to build a local copy from your vault. Until a profile exists, the rules
run on their own.

## What's in it

- **labs**: The Judgement OS core: two judges consulted at marked decisions inside skills, the recorder that checks every answer and combines the two, the append-only log, /labs:profile, the one file the judges read about you, and /labs:try, which puts both judges on a morning blind so you can see which one you trust.
- **guard**: Hard rules as hooks: deploys are printed for you to run, destructive commands and secrets ask first, state files change only through their scripts, writes to someone else's vault ask, and a session is archived only when you say so.
- **sexyhtml**: House styles for finished HTML pages. /sexyhtml picks the style (ECHO-JAY by default, selfActual for work, Seren for games) and the shape, with the Judgement OS weighing in when a request reads two ways; or name one: /sexyhtml:jay, /sexyhtml:sa, /sexyhtml:seren, /sexyhtml:judgement-os.
- **make**: Say what you want made, and it lands in the right place, in your look: a page, a form or card in the chat, a deck, a design, a living doc, a file or a design system. /make picks where it lands, with the Judgement OS weighing in when a request reads two ways, then hands it to the right maker. Pages go to sexyhtml, selfActual work in the selfActual design system.
- **comms**: The send gate, which stops every outbound message until you type send; humanify, a de-tic pass for drafts written with AI in the room; poll, which reads the Slack channels you choose and drafts replies that post only when you approve them; and your selfActual vault's messages, FOR CC reminders and /ping.
- **day**: A day loop for Claude Code: a short boot with the judges on the style pick, mid-day and end-of-day check-ins from your selfActual vault, habits you set up once, a daily reading and a phrase in a language you're learning, /flag for work you want to come back to, and a clock on every message.
- **dice**: Real dice for tabletop games: any notation, advantage and disadvantage, damage, ability scores. Never an invented roll.
- **sa**: selfActual in Claude Code: your gears, loops and modes, fetched from your vault through one router, with the General Edition's set as files for when the vault isn't there, and the vault session commands: open, close, board and task.

## What it needs

A selfActual account ([selfactual.ai](https://selfactual.ai)) and Claude's selfActual connector. Without them it
still runs, with less to work from: tasks come from a `TASKS.md`, and the gears from the files that ship with it.
`/comms:poll` needs Claude's Slack connector. Your settings and state live in `~/.claude/judgement-os/`.

## What it isn't, yet

It's young: in daily use since October 2026, first by its author, then by a few alpha users. The log is short, and
every claim about it comes from that log.

## Read more

- [The Judgement OS page](https://netmobster.github.io/unstuck-games/judgement-os/)
- [How it was built, in six posts](https://echofiles.substack.com/p/how-do-i-turn-my-claude-code-setup), on The ECHO Files

## Credit

MIT. If you build on the pattern, credit Judgement OS and link back here. That's the whole ask.
