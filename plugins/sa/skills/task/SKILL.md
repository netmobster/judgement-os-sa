---
name: task
description: Create a task in the vault from freeform text. Bare lists recent open tasks.
argument-hint: [the commitment, e.g. "ship the grant matrix by Monday"]
---

First read `${CLAUDE_PLUGIN_ROOT}/reference/conventions.md` and follow it.

Task: **$ARGUMENTS**

**Bare** → list recent open tasks (`status: ["Inbox","Next","Doing"]`, `fields: "summary"`, `limit: 20`) so the operator can see the board before adding to it. Do not create anything.

**With text** → create a task, but **read before you write**:

1. Check for duplicates first — `list_tasks` scoped to the likely context and open statuses. If something close already exists, surface it and ask whether to update rather than create.
2. Infer the fields:
   - **title** — short, imperative, verb-first
   - **context** — one from `list_task_contexts` (the live set)
   - **priority** — from the language: *today* → P0, *this week* → P1, *someday* → P3, default → **P2**
   - **due** — only if a date is actually stated or clearly implied. Convert relative dates to absolute using `get_server_time`.
   - **source** — always `"ClaudeCode"`
3. **Show the resolved task and get confirmation before writing.** Vault writes are confirmed.
4. `create_task`, then report the assigned `shortId`.

The shortId prefix follows the task's **context**, not the authoring surface (`list_shortid_prefixes`).
