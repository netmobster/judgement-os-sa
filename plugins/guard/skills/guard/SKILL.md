---
name: guard
description: Explain what the guard plugin blocks or asks about, and why. Use when a tool call was stopped with a "guard:" reason, or the user asks what the guards do.
---

# guard

When a call comes back with a reason starting `guard:`, **don't route around it.** Say in
one line what was stopped and why, and what the user can do.

| Rule | Result | Why |
|---|---|---|
| `deploy-*.sh`, `terraform apply`, `pm2 restart/reload/…`, `aws ssm send-command` | **deny**: print the command for the user to run | Claude never deploys |
| `git commit/push/merge` on `main` in a protected folder | **deny**: branch first | Branch guard |
| Editing files on `main` in a protected folder | **ask** | Branch guard |
| Force push, `reset --hard`, `clean -f`, `branch -D`, `push --delete`, `rm -rf` | **ask** | Hard to undo |
| Editing a state file (JSON in the state folder) directly | **deny**: its own script writes it | One writer per file |
| Writing the send gate's pass | **deny**: only the user's typed "send" issues it | The send gate |
| A token or key in a write or a tool call | **ask** | No secrets in files or messages |
| `archive_session` | **ask** | Ends the session for good |
| `list_profile_sections`; `vault_list` profile_sections without `fields:"summary"` | **deny** | Both return gated sections |
| A profile section on a private topic (relationships, therapy, health, or a word on the settings' private list) | **deny** in a protected folder, **ask** elsewhere | Silo rules |
| `list_tasks` with no status or `limit` > 200 | **deny** | A wide page overflows |
| A vault write to someone else's username | **ask** | Your machine writes your vault |

**Protected folders, the state folder** and the rest come from the install's settings:
`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints them (`guard.protectMain`,
`stateDir`). With no protected folders set, the branch guard is off.

Tests: `node "${CLAUDE_PLUGIN_ROOT}/scripts/guard.js" --test`.
