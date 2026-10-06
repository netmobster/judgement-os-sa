---
name: checkin
description: "A check-in, mid-day or end-of-day: held items, habits still open, then tasks; at the end of the day, what carries to tomorrow and whether the reading and the phrase landed. Claude offers it when the clock hook says it's due."
argument-hint: midday|eod
---

# /checkin: mid-day and end-of-day

**Why it exists.** Boot is a brief and a style pick. Whatever was skipped there is **held, not
lost**: it comes back here, when there's momentum to spend on it.

Today's state is `day.json` in the state folder. **Change it only through**
`node "${CLAUDE_PLUGIN_ROOT}/scripts/day.js" <cmd>`, never by hand.

## When it runs

The clock hook stamps every message with the time (the settings' time zone) and adds
`MID-DAY CHECK-IN DUE` after 13:00 or `END-OF-DAY CHECK-IN DUE` after 16:00, until that check-in
is done, skipped or snoozed. When it says one is due:

1. **Answer what the user actually asked first.** The check-in never jumps the queue.
2. Then **one line, plain prose** (a picker would swap out their input mid-work):
   *"Mid-day check-in: now, later, or not today?"* (or End-of-day).
3. **As you offer, run** `day.js offer <midday|eod>`: it goes quiet for an hour in every
   session. No answer counts as "later".
4. **now** → run it (below). **later** → nothing more. **not today** → `day.js skip <kind>`.

The user can also say "check-in", "mid-day" or "eod" at any time: run it directly. It's once a
day across all sessions, because day.json is the shared record.

**Display rule (from `/boot`):** pickers and writes first; what the user must read is the final
text. Each task question carries its own content (the title, how overdue) inside the question.

## Mid-day

1. **Held items.** `day.js show` → `held`. If any, one `AskUserQuestion` question, multiSelect:
   "Held from this morning: load any?" (at most four options; `from: "yesterday"` items say so).
   Chosen items run as boot phases, one per turn, and `day.js unhold <item>` once loaded.
2. **Habits still open** (when habits are set up). Scores from the morning can't be the whole day,
   so the rest come back here, and only those. `node "${CLAUDE_PLUGIN_ROOT}/scripts/habits.js" show`
   prints the nearest rung and the rows not yet done. It goes in the final text exactly as printed,
   with no commentary. The user scores in their next message however they like ("walk 2, water 3,
   pushups 2 x20") or pastes the scoring page: turn it into JSON (reps go under `"reps"`) and run
   `habits.js log '<json>'`, sending only what they just scored. Unscored rows are fine: blank is
   never zero. **Skip the step** when every row is done, or when there's no line today and `habits`
   was held (step 1 already offered it). No line and not held: one line, *"Habits aren't logged
   today. Want the page?"*
3. **Task review.** The overdue and due-today tasks,
   from the vault: `list_tasks(status: ["Inbox","Next","Doing"], dueBefore: <today>, sortBy: "due",
   limit: 100, fields: "summary")`. **Three oldest overdue**, then due-today P0s, as
   `AskUserQuestion` questions, **one per task, at most four per call**, with the days overdue in
   each question. Exactly 100 back means say `100+`, never a short count. Options: `done` ·
   `tomorrow` · `next week` · `drop` → `complete_task` · `update_task(due: today+1)` ·
   `update_task(due: today+7)` · `drop_task`. No selfActual connector, or the sign-in fails: say
   so once (sign in, or start at **selfactual.ai**) and review the project's `TASKS.md` instead.
   *(Today+1, not due+1: pushing a nine-day-old task to its own due+1 leaves it overdue.)*
   **Dismissed = skip:** write nothing; it comes back next time. **Private task contexts are left
   out** (the settings' `privateTopics.taskContexts`).
4. `day.js done midday`.

## End of day

1. **Tasks still due today**, most important first, with the same shape and verbs as mid-day.
   If mid-day never ran today, include the three oldest overdue too. Say it once: "N left for
   today". No percentages, no lecture. If the user waves it off, don't raise it again.
2. **Held items still open.** One question per item (at most four per call): `keep for
   tomorrow` · `let go`. Keep → `day.js carry <item>` (it becomes tomorrow's held item, marked
   from yesterday). Let go or dismissed → nothing. **Nothing carries unless it was kept on
   purpose.**
3. **Habits still open** (when habits are set up). Same as mid-day step 2: `habits.js show` in the
   final text, open rows only, and anything they score goes through `habits.js log`. It's the last
   chance to score today; after that the day's line stands as it is, and nothing is chased.
4. **The reading and the phrase** (when either is set up).
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/daily.js" status`. For each one not done today, one
   `AskUserQuestion` question (both in one call): "Reading done?" / "Phrase done?", options `yes` ·
   `not today`. Yes → `daily.js done <reading|phrase>`. Not today or dismissed → nothing: it stays
   where it is and comes back tomorrow. Never scored, never counted: no "3 days behind".
5. `day.js done eod`. The end of the day isn't the end of the session: close nothing unasked.

## Picker answers

`[No preference]` means dismissed: nothing, never a choice. A blank `Other` is also nothing.
Text typed into `Other` is a request: do what it names, or ask once.
