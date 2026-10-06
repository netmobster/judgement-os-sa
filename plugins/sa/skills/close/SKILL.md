---
name: close
description: Session close: git check, session log, task reconcile and profile flags, plus the changelog where one is set up. Also use when the user says "update changelog", which runs that step alone.
argument-hint: [optional session slug, e.g. "sa-slash-commands"]
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git log:*)
---

First read `${CLAUDE_PLUGIN_ROOT}/reference/conventions.md` and follow it.

Session slug hint: **$ARGUMENTS**

## ⛔ Never call `archive_session`

"Close it out" / "wrap up" / "good night" trigger **this checklist and nothing else.** `archive_session` stops the session process and ends the conversation — no input, no UI, no way to continue. Two operators have lost live sessions to this. Call it only if the operator uses the word **"archive"** about a specific named session. Never offer it as part of a close. If the phrasing is ambiguous, run this checklist.

## Is this session substantive?

Code written or changed, an architectural decision made, or a bug diagnosed. If it was read-only exploration with no conclusions, say so and skip the log — do not manufacture one.

## 1. Git status

Branch: !`git branch --show-current 2>/dev/null`
Status: !`git status --short 2>/dev/null`
Ahead of main: !`git log main..HEAD --oneline 2>/dev/null`

Flag uncommitted work or an unopened PR. Do not commit or push unless asked.


## 2. Write the session log

Get `nextCC` from `get_server_time({ username, timezone })`. Then `write_session_log`:

- `username`
- `sessionSummary` — `"CC-{n}: {slug}\n\n{summary}"`
- `conversationSource` — `{ platform: "claude-code", name: "CC-{n}: {slug}" }`
- `decisions` — architectural choices **with rationale**
- `openLoops` — blockers, unresolved ambiguities, things needing a human
- `nextSteps` — what to pick up next session
- `profileFlags` — anything noticed about how the operator works
- `startedAt` — session-open timestamp if captured

## 3. Reconcile tasks

Batch the commitments made this session and ask, **in plain prose**: "Log these as tasks?" If yes → `create_task` with `source: "ClaudeCode"`. Check for duplicates first.

## 4. Profile flags

If something real emerged about how the operator works, ask **in plain prose**: "Want me to update your profile?" If yes → `update_profile_section`.

**Steps 3 and 4 are ordinary sentences. Do not use `AskUserQuestion`** — it swaps the chat input for a picker in the middle of a wrap-up.


## 6. Rename line

The **literal last line** of the close response:

`✅ CC-{n}: {summary slug ≤50 chars}`
