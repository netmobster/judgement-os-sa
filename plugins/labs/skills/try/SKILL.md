---
name: try
description: "Judge the judges, blind. Give any morning (or 'today'); both judges answer as Judge 1 and Judge 2, and the user picks the better one before learning which model wrote which. Typed only, as /labs:try."
disable-model-invocation: true
argument-hint: "[today | a morning in plain words] [ask anyway]"
---

# /labs:try: judge the judges, blind

Requested: **$ARGUMENTS**

Every script below is in `${CLAUDE_PLUGIN_ROOT}/scripts/`. Work files go in your scratchpad. The
question is the one `/day:boot` asks the judges: which boot style fits the morning.

## 1. The morning

**`today`, or nothing:** read what `/day:boot` reads.
- Load the vault tools first: `ToolSearch` for `list_tasks` and `get_session_history` on the
  selfActual connector. The vault username is the settings' `vault.username`; if it's empty, ask the
  vault with `whoami`.
- `list_tasks(status:["Inbox","Next","Doing","Waiting"], sortBy:"due", limit:75, offset:0, fields:"summary")`.
  Page by 75 until a page comes back short.
- `get_session_history(limit:1, fields:"conversationSource,nextSteps,openLoops")`.
- Write the rows (one JSON array) to `labs-try-tasks.json` and the handoff to
  `labs-try-handoff.json` with the `Write` tool.

Then run:
`node style-default.js --live --tasks <tasks file> --handoff <handoff file> [--ask-anyway] > <scratchpad>/labs-try-decision.json`

**A morning in the user's own words:** write it as `<scratchpad>/labs-try-scenario.json`:
- `name`: their words, short.
- `now`: the time as an ISO string with its offset, in the settings' time zone
  (`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints `timezone`; empty means the machine's own).
- `recent`: the styles of recent boots, oldest first (`bare`, `project` or `general`).
- `tasks`: `[{ "title", "due", "priority" }]`.
- `handoff`: `{ "conversationSource": { "project" }, "nextSteps", "openLoops" }`.

**Only what they said.** Anything they left out stays empty. Don't invent signals to make the morning
interesting. Then run:
`node style-default.js --case <scenario file> [--ask-anyway] > <scratchpad>/labs-try-decision.json`

**Add `--ask-anyway`** when the user says "ask anyway", "force it" or "judge it anyway". The judges are
told plainly that nothing flagged this morning. **That's the consultation-bias test:** a good judge
says proceed.

## 2. Open the try

Run `node record.js try-open --decision <decision file> [--scenario <scenario file>]`.
- It prints `call`, `consult`, `default` and `question`.
- Code has already drawn which model is Judge 1, and logged it.

**If `consult` is false** because there's no profile (the decision's `notes` say so), say in one line
that the judges need a profile to read and `/labs:profile` starts one. Then stop.

**If `consult` is false** otherwise, the final text is three lines:
1. Boot's pick, and why.
2. "The rule stayed out: nothing on this morning calls for a judge."
3. "Say **ask anyway** to put both judges on it."

Then stop.

## 3. Both judges at once

Send one message with two Agent calls:
- `subagent_type: "labs:second-opinion"`.
- The prompt is the `question`, word for word. Add nothing to it.
- One call with `model: "sonnet"` and one with `model: "opus"`, both in the foreground.

## 4. Record both answers

**An answer never goes through the shell.** For each one:
1. Write the answer, exactly as it came back, to `<scratchpad>/labs-try-<model>.txt`.
2. Run `node record.js verdict --call <call> --run blind --model <sonnet|opus> --ms <duration> --file <that file>`.

## 5. The blind pick

`node record.js try-show --call <call>` prints `judge1` and `judge2`, with no model names.
**Build the picker from this output only.** Say nothing that hints which judge is which: not speed,
not length, not style.

One `AskUserQuestion`, one question:
- **question:** "{scenario}. Boot's pick: {default}. Which judge got it right?"
- **options:**
  - `Judge 1`: the description is `{verdict} → {suggestion} · {confidence}. "{why}"`, and the
    `preview` is the fact.
  - `Judge 2`: the same.
  - `Both fine`.
  - `Neither`.
- **An invalid answer:** its description is "No valid answer ({reason})".

## 6. Reveal

1. If the user typed a reason in Other, write it to `<scratchpad>/labs-try-why.txt` first.
2. Run `node record.js try-pick --call <call> --pick <1|2|both|neither>`. Add
   `--why-file <that file>` if there's a reason.
3. The final text is:
   - the reveal, exactly as printed;
   - the question the judges saw, in a code block, so the user sees exactly what they saw;
   - one line: "`node labs-log.js blind` counts every pick so far."

**One pick per try.** The recorder refuses a second pick, because a pick made after the reveal isn't
blind.
