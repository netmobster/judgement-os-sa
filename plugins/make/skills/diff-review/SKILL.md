---
name: diff-review
description: A visual diff review as a page in the house style - the verdict on a branch, commit, range or the working tree, with the evidence, risks and next steps, every claim citing a file and line. Use when the user says diff review, review this branch, review the last commit, what changed and is it safe, or /make:diff-review.
argument-hint: "[branch, commit, range or PR; empty = the working tree against main]"
---

# /make:diff-review

Scope: **$ARGUMENTS** (empty: the working tree against `main` or `master`).

1. Read the recipe, `${CLAUDE_PLUGIN_ROOT}/vendor/visual-explainer/commands/diff-review.md` (vendored, MIT).
2. Read `${CLAUDE_PLUGIN_ROOT}/pages/explainers.md`: what to keep from upstream and what the house changes.
3. Gather what the recipe lists, then build the page through `/sexyhtml` and publish it. Give the link.

For a quick look at one change in the chat, the before-and-after card is lighter: `/make before and after`.
