---
name: project-recap
description: A project recap for someone coming back to it, as a page in the house style - what it is, how it fits together, recent activity by theme, the current state, hot spots, the commands and files, and evidence-based next steps. Use when the user says project recap, catch me up on this repo, where was I with this project, or /make:project-recap.
argument-hint: "[time window, e.g. 2w]"
---

# /make:project-recap

Window: **$ARGUMENTS** (empty: since the last tag, or the last two weeks).

1. Read the recipe, `${CLAUDE_PLUGIN_ROOT}/vendor/visual-explainer/commands/project-recap.md` (vendored, MIT).
2. Read `${CLAUDE_PLUGIN_ROOT}/pages/explainers.md`: what to keep from upstream and what the house changes.
3. Gather what the recipe lists, and the project's own files first (the newest `HANDOFF`, the open part of
   `TASKS.md`), then build the page through `/sexyhtml` and publish it. Give the link.

A recap of one session is the session recap, made at close: `${CLAUDE_PLUGIN_ROOT}/pages/session-recap.md`.
