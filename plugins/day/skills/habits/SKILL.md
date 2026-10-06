---
name: habits
description: "Daily habits: set up your rows once, then score them any time of day, and the check-ins bring back whatever is still open. Use when the user says habits, set up my habits, score my habits, log habits, or pastes a habits block."
argument-hint: "[setup | show | page | log '<paste>']"
---

# /day:habits: your daily habits

**The files are the script's.** The rows live in `habits.json` and the scores in `habits.jsonl`, both
in the state folder (the settings' `stateDir`). **The only writer is**
`node "${CLAUDE_PLUGIN_ROOT}/scripts/habits.js"`. Never edit either file by hand. When the session has
a name, pass `--by <name>` on every write.

## First run: set them up

`habits.js check` prints `no` until the habits are set up. Then set them up before anything else, in
one or two short turns:

1. **The rows.** What does the user want to do every day? Each row gets a short name: "Walk",
   "Read 20 pages", "Water". Four to eight is a good start.
2. **Core or stretch.** Which rows does a day need (tier 1, the core), and which are stretch (tier 2)?
3. **Categories and a focus.** Group the rows into a few categories (body, mind, work, people), and
   pick one category to focus on for now. The focus can change any time.
4. **Kinds.** Most rows are scored 0 to 3. A row can take a number instead (weight, pages, minutes:
   `"kind": "num"`), or a score plus a rep count (`"kind": "reps"`).

Show the setup back as a short list, then write it:
`node "${CLAUDE_PLUGIN_ROOT}/scripts/habits.js" setup '<json>'`, with
`{"rows": [{"name", "tier", "cat", "kind"}], "focus": {"category"}}`. To change it later, add
`--replace`. The scores already logged stay as they are.

**Habits are private.** They don't come up in a work session unless the user asks, and a row on one
of the settings' `privateTopics` never appears in a brief.

## The rules

- **Scores run 0 to 3.** 2 or more is done; 3 is done properly.
- **The rungs:** ★ every core row done · ★★ that, plus at least 80% of the focus category done
  (rounded up) · ★★★ every row done · GOLD every row at 3. A week counts when six of its days do.
- **Blank is never zero.** A day with no line wasn't lived, wasn't failed, and never enters an
  average.
- **Never render a score out of anything.** "4 to go" is fine; "62%" and progress bars are not. If a
  display could make the user not want to open it, it's broken, however accurate it is.
- Show a streak only while it runs. Never show one that reset.

## What to do

- **`show`** (the default when they ask what's left): `habits.js show`. Render the open rows, nearest
  rung first, exactly as printed. Nothing else.
- **`page`** (they want to score): build the scoring page as an artifact with `/sexyhtml`, from
  `habits.js rows`. One line per row with 0 to 3 picks (a number box for `num` rows, a rep box for
  `reps` rows), and a copy-and-send button whose text is
  `{"date": "YYYY-MM-DD", "rows": {…}, "reps": {…}}`. One page per invocation.
- **`log`** (they pasted a block, or gave scores in chat, in any words: "walk 2, water 3, pushups 2
  x20"): turn it into JSON (reps go under `"reps"`) and run `habits.js log '<json>'`. It merges onto
  the day's latest line. Then say in one line what's still open, if anything.

`/day:boot` offers the habits until they're logged each day, and the mid-day and end-of-day
check-ins bring back only the rows still open.
