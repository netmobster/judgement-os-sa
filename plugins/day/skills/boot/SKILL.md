---
name: boot
description: "A phased start to the day: a short brief, FOR CC reminders and the daily reading, one pick (style and energy, with the judges weighing in when the morning reads two ways), then one phase at a time, each skippable, ending with the day's phrase. Run it when the user says boot, boot up or morning, or types /day:boot."
argument-hint: "[bare|project|general]"
---

# /boot: a phased start to the day

**Why it's shaped like this.** A morning start that shows everything at once gets skipped. This
one is a brief, not a menu: **Claude decides what matters, the user picks only the style**, and
everything else arrives one piece at a time and can be skipped.

Run it when the user says "boot", "boot up" or "morning", or types `/day:boot`. **Not** on every
session's first message.

**Today's state** is `day.json` in the state folder (the settings' `stateDir`). Change it **only
through** `node "${CLAUDE_PLUGIN_ROOT}/scripts/day.js" <cmd>`, never by hand: another session may
be writing it too. The reading and the phrase change only through
`node "${CLAUDE_PLUGIN_ROOT}/scripts/daily.js"`, and habits only through
`node "${CLAUDE_PLUGIN_ROOT}/scripts/habits.js"`. When the session has a name, pass `--by <name>`
on every write.

## The display rule: what the user must read ends the turn

The app collapses text written before a tool call into a one-line summary. Only the text after a
turn's last tool call reaches the user in full. So:
- **Run every tool call first**, then write the content as the turn's final text.
- **Never follow must-read text with a tool call in the same turn.** If a picker has to come after
  content, it waits for the user's next message.
- A picker's own question text is safe: keep what the choice depends on inside the question.

## 1. Silent pre-step: no output

1. `node "${CLAUDE_PLUGIN_ROOT}/scripts/day.js" show` → today's state, in the settings' time zone.
   If `style` is already set, a boot already ran today: say so in one line and offer the held
   items instead of booting again.
2. **The tasks.**
   From the vault: `list_tasks` for the vault username (the settings' `vault.username`; if it's
   empty, ask the vault with `whoami`), `status: ["Inbox","Next","Doing","Waiting"]`,
   `fields: "summary"`, `sortBy: "due"`, **`limit: 75`, paging with `offset`** until a page comes
   back short: a bigger page can overflow the tool result. **No selfActual connector, or the
   sign-in fails:** say once that the selfActual Edition reads tasks from the vault (sign in, or
   start at **selfactual.ai**), then use the project's `TASKS.md` if there is one.
   **Private task contexts never appear** (the settings' `privateTopics.taskContexts`), and
   neither does a task whose title carries a private word.
3. **The handoff.**
   `get_session_history(limit: 1, fields: "conversationSource,nextSteps,openLoops")`: the last
   session's next steps and open loops.
4. **The reading and the habits.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/daily.js" status` says
   whether a reading and a phrase are set up, and whether each is done today. If a reading is set up
   and not done today, `daily.js show reading` → today's reading, ready to render.
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/habits.js" show` → whether habits are set up, and whether
   today's are logged.
5. **The judges on the style (`boot.style`)**, when the labs plugin is installed. Find it:
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/find-plugin.js" labs scripts/record.js` prints its scripts
   folder (`$LABS` below; write the path out, since shell variables don't carry over). **Not found:**
   skip this step, and turn 2 asks the style with the plain picker.
   - With the `Write` tool, write the tasks from step 2 as one JSON array to
     `<scratchpad>/boot-tasks.json` (`[{ "title", "id", "due", "priority", "status", "context" }]`,
     each field only where the source gives it), and the handoff from step 3 to
     `<scratchpad>/boot-handoff.json` (`{ "conversationSource": { "project" }, "nextSteps", "openLoops" }`).
   - `node "$LABS/style-default.js" --live --tasks <that file> --handoff <that file> > <scratchpad>/boot-decision.json`
     writes the **decision**: boot's own pick (`default`), whether the rule says to ask the judges,
     why, and their `question`. With no profile filled in (`/labs:profile`), the rule decides alone.
   - `node "$LABS/record.js" open --decision <scratchpad>/boot-decision.json --run live --point boot.style --prefix live`
     logs the call and prints its id, `consult` and, when consulting, the two `judges`. **Every path
     logs this line.**
   - **`consult: false`:** no judges. Go on.
   - **`consult: true`: two judges, one wait.** In **one message**, make two Agent calls, both in the
     foreground, both with `subagent_type: "labs:second-opinion"` and the prompt set to the
     decision's `question`, word for word: one with `model:` set to `judges.small.model`, the other
     to `judges.big.model`.
   - Record each answer **exactly as it came back**. **An answer never goes through the shell:**
     write it with the `Write` tool to `<scratchpad>/boot-answer-<small|big>.txt`, then run
     `node "$LABS/record.js" verdict --call <id> --run live --model <that judge's model> --role <small|big> --point boot.style --ms <duration> --file <that file>`.
     `--ms` is the duration the Agent result reports (leave it out if none). An invalid answer
     counts as no answer.
   - **Then combine them:** `node "$LABS/record.js" combine --call <id>`. It prints `show` and,
     when it's true, the leading judge's `verdict`, `confidence`, `why` and `suggestion`, plus
     `other`: the second judge's different suggestion, when there is one.
   - **Keep the outcome for turns 1 and 2.** `show: false` means boot's own pick stands, and nothing
     is said about the judges.

## 2. Turn 1: the brief, the reminders and the reading

After the pre-step's tool calls, the final text is the brief, then the reminders (if any), then the
reading (if any), then one line, and **the turn ends.** No picker in this turn (display rule).

**A redirect.** If `combine` said `show: true` with a **redirect**, the brief gets one more line,
right under it: *"Second opinion: {why} ({confidence}). Boot anyway, or {suggestion}?"*. The user's
next message settles it. If they take the redirect, close the call (§3b) with `final` set to that
skill and `--settled-by user --shown`, then run that skill instead of the rest of boot. If they boot
anyway, carry on to turn 2.

**The last line:**
- **The rule's pick stands** (no judges were asked, or `combine` said `show: false`): *"Ready?
  {Style} boot today: {the rule's reason, in a few words}. Energy next, or name another style."*
- **The judges disagree** (`show: true`, with a challenge or clarify), or labs isn't installed:
  *"Ready? Style and energy next."*

### The brief: three lines, at most

```
{Day} {d} {Mon}
{the thing that matters most today}
{the second thing, if there is one}
```

Lines 2–3 are **Claude's pick**, in plain words, from: something due today that matters · a
blocker or an at-risk item in the handoff · the handoff's first next step · items held from
yesterday (`from: "yesterday"` in day.json).

- **Every number carries its action.** "The release notes are due today: finish the changes
  list", never "1 task due today".
- **No overdue count, no totals.** Counts with no action attached are guilt scores. Task review
  happens at the mid-day check-in, when there's momentum to spend on it.
- Fewer lines is fine. One line is fine.

### Reminders for Claude

A task whose title **starts** with `FOR CC` or `ASSIGN CC` (any case, followed by `:`, `-` or
`—`), or carries the marker in capitals anywhere, is the user saying *"remind me at boot."* They
show under the brief at every boot, one line each with the marker stripped, until they're done
or dropped. **Not:** lowercase prose ("ask for CC access"). No matches: no block at all.

### The reading

When a reading is set up (`/day:daily`) and not done today, render `daily.js show reading` under the
reminders **exactly as printed**. No aside and no commentary, not even a light one. It's shown, never
scored.

## 3. Turn 2: style and energy

On the user's next message after turn 1, whatever it says. If it already names a style and/or
energy ("general 7", "bare"), take them and skip the picker (or ask only for what's missing). A named
style that differs from the rule's pick is `typed`. Otherwise:

**A. The rule's pick stands** (the common path): one `AskUserQuestion` call, **one question,
energy only.** The style was announced in turn 1, so it isn't asked again. The question carries it,
with the escape: *"Energy? {Style} boot today (the rule's pick). To change the style, choose Other
and type it, like `bare` or `project 7`."* Options: `1–3 low` · `4–5` · `6–7` · `8–10`.

**B. The judges disagree** (`combine` said `show: true`, with a **challenge** or **clarify**): one
`AskUserQuestion` call, three questions:
1. **Style?** `bare` · `project` · `general` (described from the table below), with **boot's own
   pick first, marked "(Recommended)"**.
2. **Energy?** `1–3 low` · `4–5` · `6–7` · `8–10`.
3. **The second opinion:**
   - **challenge:** *"Second opinion: {suggestion} instead of {default} ({confidence}). {why}"*.
     Options: `Yes, {suggestion}` · `Yes, {other}` (only when there is one) · `No, keep my pick`.
   - **clarify:** the question is `why` itself. Options: `{default} still fits` ·
     `Use {suggestion, or general}`.

**C. Labs isn't installed:** one `AskUserQuestion` call, two questions: **Style?** `bare` ·
`project` · `general`, and **Energy?** as above.

A typed number wins for energy; otherwise store the midpoint (2, 4.5, 6.5, 9). **Dismissed:** in A
the style stays the rule's pick; in B or C a dismissed style is `bare`. A dismissed energy is
unknown (`-`). Then:
`node "${CLAUDE_PLUGIN_ROOT}/scripts/day.js" boot <style> <energy|-> <session name|->`

**Energy is acted on, never discussed.** Low means shorter responses, fewer options, one thing at
a time.

### 3b. Close the judges' call

When step 5 opened a call, log what actually happened, as one line:
`node "$LABS/record.js" close --call <id> --final <the style used, or the redirect taken> --settled-by <how>`,
adding `--shown` when the judges' answer was put in front of the user.

| `settled-by` | when |
|---|---|
| `rule` | path A: the style was announced and the user didn't change it |
| `user` | they answered the second opinion: path B's third question, or the redirect line |
| `picker` | path B's style question, answered without taking the judges' suggestion |
| `typed` | they named a different style, in their reply to turn 1 or in Other. Their pick stands |
| `dismissed` | they dismissed path B's picker, so the style is `bare` |

Say nothing about the log.

## 4. Styles

| style | what it is | phases, in order |
|---|---|---|
| `bare` | Just the brief. Straight to work. | none |
| `project` | Heads-down on one project. | `habits` → `project` → `handoff` |
| `general` | A normal day. | `handoff` → `habits` → `project` |

**`habits` only when habits are set up and today's aren't logged yet**: `habits.js show` prints
`No habits line for <date> yet.` Once any session logs them, boot leaves them out, and the check-ins
bring back the rows still open. Never on `bare`.

A style is picked fresh every boot. Nothing loads because it loaded yesterday.

## 5. Running a phase

**One phase per turn: offer → load → content last.** Offer it with one `AskUserQuestion`
question, "Next: {phase}: {one line on what it is}" → `load` · `skip` · `stop here`, at the
**start** of a turn, never after content.

- **load** → its tool calls, then its content as the turn's final text. Then **stop and wait**:
  the user's next message closes the phase.
- **skip** → `day.js hold <phase>`, and offer the next phase straight away.
- **stop here** → `day.js hold <this phase> <every remaining phase>`, then straight to the last
  step (§6), whose final text says "Held: {list}. They come back at mid-day."
- **Dismissed** → same as skip.
- **If this is the last phase**, fetch §6's phrase first, so the phase content and the phrase land
  together as the turn's final text.

| phase | what it loads |
|---|---|
| `handoff` | The last session's next steps and open loops: the first three of each, `more` for the rest. Say where they came from. |
| `habits` | The scoring page, built by `/day:habits page`. When the user pastes it back, or scores in chat, log it with `habits.js log '<json>'`: it merges onto the day's line, and the rows still open come back at the check-ins. |
| `project` | The top of the project's board: what's next and what's blocked. Not the whole board. |

## 6. Last step, every path: the phrase

**Whatever path boot took, it ends here:** after the last phase, straight after the pick for
`bare`, or right after "stop here".

**Tool calls first:** `daily.js show phrase` when a phrase is set up, and any `day.js` write still
owed. **Then the final text:** the last phase's content (if any), one line if anything was held
("Held: habits. They come back at mid-day."), and the phrase **exactly as printed**: the phrase, how
to say it, and its pattern note. If it says it's already done today, leave it out. Then the turn
ends and work starts.

If the user asks about the phrase or any word in it, answer it: that's part of the lesson.

## "Done" at any time

If the user acknowledges the reading or the phrase in any way ("done", "got it", a comment on it),
at boot or any point in the day, run `daily.js done <reading|phrase>`. Don't wait for the word
"done". The phrase moves on (once a day at most); the reading only records it, since it moves on by
itself tomorrow. Silence leaves both where they are.

## Picker answers

`[No preference]` means dismissed: nothing, never a choice. A blank `Other` is also nothing.
Text typed into `Other` is a request: do what it names, or ask once if it names nothing.
