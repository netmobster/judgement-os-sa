---
name: fact-check
description: Check every verifiable claim on a page against the code and git history, mark each verified, corrected, unsupported or unverifiable, fix the errors in place, and add a verification strip. Use when the user says fact-check this page, is this page right, check the claims, or /make:fact-check.
argument-hint: "<artifact link or file path; empty = the last page made in this session>"
---

# /make:fact-check

Page: **$ARGUMENTS** (empty: the last page made in this session; none, ask in one line).

1. Read the recipe, `${CLAUDE_PLUGIN_ROOT}/vendor/visual-explainer/commands/fact-check.md` (vendored, MIT).
2. Read `${CLAUDE_PLUGIN_ROOT}/pages/explainers.md`: what to keep from upstream and what the house changes.
3. An artifact link: read it with the `Artifact` tool, fix it, and republish to the **same URL**. A file: edit it
   in place. Either way the verification strip goes at the top, in counts, never a score.
