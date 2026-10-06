---
name: flag
description: "Mark this piece of work as one the user should come back to: when it's done, the turn ends with one question, and their phone gets one line."
---

# /flag: say when to come back

The user is often away from the desk while Claude works. `/flag` says: **this piece of work
is one they want to review**, so when it's finished, pull them back, once.

It changes nothing about how the work runs. It only changes how the turn ends.

## What it does

When Claude has finished the work in flight and is genuinely stopped:

1. **End the turn with one question to the user.** That's the flag. It's what tells them the
   work is parked and waiting on them.
2. **Send one `PushNotification`** (`status: "proactive"`), one line, under 200
   characters, leading with what they'd act on. It reaches their phone when Remote Control
   is connected, and it skips itself when they're already at the terminal, so it never
   duplicates what they're reading.

## The rules

- **One question, never two.** If the response already ends with a real question, that
  *is* the flag. Don't add another, and don't restate it.
- **A real question, not a receipt.** "Both PRs merged, nothing deployed — want the
  follow-up PR now, or after the backlog block?" is a flag. "Done, is that ok?" is not.
- **Decisions go in a MultiChoice modal** (`AskUserQuestion`): what the task is,
  the implication, a recommendation, 2–3 other options, free text. A modal counts as
  the question — still send the push, still don't ask twice.
- **Only when Claude has actually stopped.** Never mid-task, never as progress. If Claude
  is about to keep working, it isn't flagged yet.
- **If it failed or stopped early, the question says so.** "Hit a wall on X: stop here
  or try Y?" A flag that hides a failure behind a cheerful question is worse than no
  flag.
- **The push carries the headline, not a summary.** The detail is in the chat, which they
  read when they get back.

## Scope

`/flag` applies to the work in flight: the task being done when they type it, including
work already running. It doesn't persist to later tasks. They flag again when they want
it again.

If the user types `/flag` with nothing in flight, treat it as "flag whatever I ask next".
