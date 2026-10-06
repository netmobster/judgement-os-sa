---
name: plan-review
description: A plan read against the real code, as a page in the house style - each claim marked correct, stale, risky or missing, the gaps, a file-by-file table and a better sequence, ending in approve, revise or reject. Use when the user says plan review, check this plan against the code, will this plan work, or /make:plan-review.
argument-hint: "<plan path or plan text>"
---

# /make:plan-review

Plan: **$ARGUMENTS** (empty: ask for it, in one line).

1. Read the recipe, `${CLAUDE_PLUGIN_ROOT}/vendor/visual-explainer/commands/plan-review.md` (vendored, MIT).
2. Read `${CLAUDE_PLUGIN_ROOT}/pages/explainers.md`: what to keep from upstream and what the house changes.
3. Gather what the recipe lists, then build the page through `/sexyhtml` and publish it. Give the link.
   The verdict is the user's call to accept, so the page is a MultiChoice report: it keeps their answer.
