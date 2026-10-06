# SA command conventions — shared by every `/sa:*` command

## 1. Bare invocation always lists

Every `/sa:*` command with no argument **lists what it can operate on**. It never errors, never asks "what did you mean", never does the destructive or expensive thing by default.

| Command | Bare behaviour |
|---|---|
| `/sa:gear` | all gears, grouped by category |
| `/sa:loop` | the 18 loops |
| `/sa:play` | the 10 plays |
| `/sa:board` | the active board |
| `/sa:task` | recent open tasks, so the operator can see before adding |
| `/sa:orient` | what SA can do inside Claude Code |

Lists are scannable: name, one line, grouped. Not a data dump.

## 2. Never require an exact slug

Every command that takes a name resolves it fuzzily. Work down this ladder, stop at the first hit:

1. **Exact** — `scout`, `loop-forge`
2. **Normalized** — lowercase, strip apostrophes and punctuation, spaces → hyphens. `"Devil's Advocate"` → `devils-advocate`
3. **Affix probe** — try known prefixes and suffixes for that namespace: `loop-<x>`, `play-<x>`, `<x>-mode`, `relationships-<x>`, `job-search-<x>`
4. **Index search** — match against slug, title, tags, and trigger text. Substring and word-overlap both count.
5. **Number alias** where the namespace has one — `"game 5"` → `play-aita`

**Resolution reporting:**
- One clear winner → run it, prefixed by one line: `→ resolved "root cause" → loop-root-cause`
- Several plausible → list them with one line each and ask. Do not guess between real candidates.
- None → say so and show the closest three. Never dump the full list as a failure mode.

Steps 1–3 are free. Only fall through to an index fetch if they miss.

## 3. Identity

Resolve the operator with `whoami` — **never hardcode a username**, never assume from the repo. Fall back to the `VAULT_USERNAME` env var only if `whoami` fails.

Timezone: the settings' `timezone` (`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints the settings); if it's empty, the machine's.

## 4. Pull, never push

These commands exist so SA is *available* in Claude Code, not *ambient*. A command loads exactly what was asked for and nothing adjacent. Never load the profile, a gear, or a play the operator did not ask for — including "helpfully" alongside something they did ask for.

## 5. Vault safety

- **Never call `list_tasks` unfiltered.** 300+ tasks. Always scope by status/priority/context, and use `fields: "summary"` unless full bodies are genuinely needed.
- **Never call `archive_session`.** It kills the live session. Only on the operator's explicit use of the word "archive" about a specific named session — never as part of a close.
- Vault writes get confirmed before they happen. Reads do not.

## 6. Tooling note

SA MCP tools are deferred in Claude Code. Load them before use:
`ToolSearch` → `select:mcp__a93db3a9-35db-49a6-a63c-f844a63149e5__<tool>,mcp__a93db3a9-35db-49a6-a63c-f844a63149e5__<tool>`
Batch every tool a command needs into one `ToolSearch` call.

The vault comes in through the selfActual connector (`mcp.selfactual.ai/mcp`), whose tools are
prefixed with its connector id. The prefix differs between installs, so **find tools by name**
(`ToolSearch` → `get_server_time`) and use the prefix that comes back. No connector at all: the
selfActual Edition needs one, and an account: **selfactual.ai**.

Large reads (`list_profile_sections` is 132k chars) overflow the tool-result cap and spill to a file. **That is useful, not a failure** — parse the file with Bash and pull only what you need into context.
