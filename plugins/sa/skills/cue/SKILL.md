---
name: cue
description: "CUE :: TRY and :: STATUS. Run only when the :: hook says to, or when the user types /sa:cue. Never for ordinary requests."
argument-hint: "[help | try <name> | status | readme]"
---

# CUE in Claude Code

Requested: **$ARGUMENTS** (blank means the bare menu)

A hook in this plugin sends a prompt that **starts with `::`** here. A `::` anywhere else
in a message (a pasted doc, a quote) does nothing. That's CUE's one security-shaped test,
and it's why the hook only reads the start.

**Determinism is the product.** HELP, STATUS and the bare menu print fixed text. Same input,
same output. Don't add commentary, suggestions or a "want me to…?" afterwards.

## Bare `::`

Print exactly:

```
CUE: what this system can do, without needing to know its names.

  :: HELP     what exists, and how to call it
  :: TRY      run one of them on your own material
  :: STATUS   what's running, and what's broken

  :: README   what Judgement OS is
```

## `:: HELP` (also `:: help <plugin>`)

Print `${CLAUDE_PLUGIN_ROOT}/reference/catalog.md` **verbatim**. With a plugin name, print only
that plugin's block. The catalog is generated from the plugins that were built and installed,
so it can't drift from what's real.

## `:: TRY <name>`

Resolve `<name>` against the `sa` router's menu (conventions §2) and run it **on whatever the user
gives next, or on what's already in the conversation.** This is the one voiced command: it
runs a real gear. If there's no material yet, ask for it in one line.

## `:: STATUS`

Run these, then print one line each with ✓ or ✗:

1. **Today:** read `day.json` in the settings' state folder (`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints the settings, `stateDir`;
   read-only, `day.js` is its only writer). Report the style, and which check-ins are still
   pending. If the file isn't there, say `day` hasn't run.
2. Connectors: `session_connectors_status` (load it with ToolSearch). Report the vault
   connector, Slack and team docs, plus anything `failed` or `needs_auth`.
3. The vault: `get_server_time` through the vault connector. If it answers, ✓.

When something is ✗, give the fix in one line (a VPN or antivirus HTTPS scanning can break a
connector; a sign-in that lapsed needs `/mcp`). Nothing else.

## `:: README`

Print the first section of `${CLAUDE_PLUGIN_ROOT}/reference/catalog.md` (the part above the
first plugin block), verbatim.
