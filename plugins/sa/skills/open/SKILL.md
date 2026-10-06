---
name: open
description: SA session open — server time, next CC session number, active P0/P1 board
argument-hint: (no args)
---

First read `${CLAUDE_PLUGIN_ROOT}/reference/conventions.md` and follow it.

Run the SA session-open sequence. Be brief — this is orientation, not a report.

**Load tools first** (they are deferred in Claude Code):
`ToolSearch` with `select:mcp__a93db3a9-35db-49a6-a63c-f844a63149e5__whoami,mcp__a93db3a9-35db-49a6-a63c-f844a63149e5__get_server_time,mcp__a93db3a9-35db-49a6-a63c-f844a63149e5__list_tasks`

**Steps:**

1. `whoami` → the operator's username. **Never hardcode it.** Fall back to the `VAULT_USERNAME` env var only if `whoami` fails.
2. `get_server_time` with `username` and the operator's timezone (conventions §3).
   This returns `nextSessionNumber.nextCC` in the same call — do not call `get_latest_session_number` separately.
3. `list_tasks` with `priority: ["P0","P1"]`, `status: ["Inbox","Next","Doing"]`, `limit: 10`, `fields: "summary"`.
   **Never call `list_tasks` unfiltered** — the vault holds 300+ tasks.

**Report, in this order:**
- Session label `CC-{nextCC}`, operator first name, local time
- Any P0 that is **overdue or due today** — these go at the very top, called out explicitly
- The rest of the P0/P1 board as a compact list

**Do not:**
- Load the profile. It is pull-only.
- Load any gear. That is `/sa:gear`.
- Call `open_session` or write anything to the vault. Open is a read.
