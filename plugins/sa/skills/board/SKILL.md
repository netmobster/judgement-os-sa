---
name: board
description: Show the active task board. Bare shows all active; arg filters by context.
argument-hint: [context — fuzzy, e.g. "SA", "work", "dnd", "seren"]
---

First read `${CLAUDE_PLUGIN_ROOT}/reference/conventions.md` and follow it.

Filter: **$ARGUMENTS**

`list_tasks({ username, status: ["Inbox","Next","Doing"], priority: ["P0","P1","P2"], fields: "summary", limit: 50 })`

**Never unfiltered.** Always pass status. Always `fields: "summary"`.

**Bare** → the whole active board, grouped by priority, P0 first. Call out anything overdue or due today at the top.

**With an argument** → resolve it to a real context fuzzily, against the live set from `list_task_contexts`. Then filter on it.

Render as a compact table: shortId, title, status, priority, due. Do not pad it with commentary. If nothing matches, say so in one line.
