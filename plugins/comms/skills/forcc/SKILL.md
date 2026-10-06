---
name: forcc
description: FOR CC reminders, the tasks the user wants Claude to raise at every boot. List them, add one, or mark one done. Use when the user says FOR CC, remind me at boot, add a CC reminder, or done <task id> on a FOR CC item.
argument-hint: "[list | add <text> | done <SAI-n>]"
---

# /forcc: reminders addressed to CC

A task whose title carries **`FOR CC`** or **`ASSIGN CC`** is the user saying "have Claude remind
me at boot". `/boot` shows them under the brief every day until they're done or dropped.

## Which titles count (from `/boot`, tested against 11 cases)

- The marker **starts the title**, any case, followed by `:`, `-` or `—` ("FOR CC: …",
  "For CC - …", "ASSIGN CC: …", "FOR-CC: …"); **or**
- the marker appears **uppercase** anywhere ("Remind me FOR CC about the PRD").
- **Not:** lowercase prose mid-title ("Ask the team for CC access"), a session label
  ("Prep for CC-50"), or other CC words ("S228 CC Tab Closeout", "FOR CCTV").

## list (default)

Read the settings once: `node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints them. **The vault
username** is `vault.username` (if it's empty, ask the vault: `whoami`); **the time zone** is `timezone`.

`list_tasks` for that username with `status: ["Inbox","Next","Doing","Waiting"]`,
`fields: "summary"`, `sortBy: "due"`, **`limit: 75`, paging with `offset`** until a page comes
back short. Bigger pages overflow (see `/boot` §1). Filter titles by the rules above.
Render one line each, prefix stripped: `<id> · <title> · due Thu 1 Oct`.

## add <text>

Title `FOR CC: <text, short and imperative>`. Infer context and priority (today → P0,
this week → P1, someday → P3, default P2). `source: "ClaudeCode"`. **Check for a duplicate
first.** Show the task, then create it. Report the shortId.

## done <id>

`complete_task` on that id, with a one-line `outcomeNotes` if there's anything to record.
