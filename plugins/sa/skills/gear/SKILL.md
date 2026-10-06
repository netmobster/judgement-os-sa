---
name: gear
description: Load a gear, loop or mode by name. Bare lists the menu.
argument-hint: "[name, fuzzy: scout, \"root cause\", goofy]"
disable-model-invocation: true
---

The typed shortcut into the library. Requested: **$ARGUMENTS**

Follow the `sa` router's skill (`${CLAUDE_PLUGIN_ROOT}/skills/sa/SKILL.md`) for the menu, the
hidden parts and the rules. This only adds the two things a typed command needs.

- **Bare:** print the menu from the router's skill, grouped as gears, loops and modes, one
  line each, with each item's summary (its frontmatter's `summary:`, or the manifest's). Don't
  list the hidden parts.
- **With a name:** resolve it with conventions §2. The affix probe here is `loop-<x>` and
  `<x>-mode`.
  `→ resolved "<input>" → <slug>`.
