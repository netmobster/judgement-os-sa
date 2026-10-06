---
gear: loop-reformat
version: "1.1"
tier: free
category: Loop
title: REFORMAT
summary: The thinking is right but it doesn't read right where it's going. REFORMAT names what the target container actually demands, reshapes the presentation to meet it, and leaves the substance alone — the same content, correctly shaped.
trigger: '"reformat this" / "clean this up for [target]"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# REFORMAT

*Trigger: "reformat this" / "clean this up for [target]"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Content matches target format and reads cleanly in its intended container — return to DEFAULT*
*Chain: REALIGN → EDITOR → DEFAULT*

---

## What it is

Content correction loop. Check for drift from intent (REALIGN), then clean up (EDITOR). Same chain as PATCH but invoked when the issue is known to be a formatting/presentation problem, not a strategic one.

## Chain

1. **REALIGN** — Check if the content has drifted from its intended purpose or audience.
	*Advance when: the specific format gap is identified — what the target format requires that the current content doesn't deliver. Minimum confidence: medium.*
2. **EDITOR** — Clean, restructure, tighten. Match the output to the target format.
	*Advance when: the content matches the target format and reads cleanly for the intended container. Minimum confidence: medium.*
3. **DEFAULT** — Deliver.

## When to use

- Content exists but doesn't match the target format or audience
- "This is right but it doesn't read well"
- Repurposing content for a different container

## When not to use

- The content is wrong, not just badly formatted → ROOT CAUSE or FORGE
- Writing from scratch → SCAFFOLD
- The target format is undefined — reformatting without a clear destination produces content that's been fiddled with, not reformatted
- The content itself has a specific error (not a format issue) → PATCH. If unsure which, run REALIGN first.

## Loop exit

Content that fits the target format and reads cleanly in its intended container. The substance is unchanged; only the presentation and structure changed. What you hold when it's done: the same content, correctly shaped for where it's going.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
