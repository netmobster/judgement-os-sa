---
gear: loop-localize
version: "1.1"
tier: free
category: Loop
title: LOCALIZE
summary: The content is right, but it was written for someone other than the person who now has to read it. LOCALIZE models the actual audience, shifts the register to match, and cleans up after — so the result reads as written for them, not translated at them.
trigger: '"localize this for [audience]" / "translate this for [context]"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# LOCALIZE

*Trigger: "localize this for [audience]" / "translate this for [context]"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Content reads as written for the target audience, register shift deliberate — return to DEFAULT*
*Chain: AUDIENCE → VOICE CHECK → EDITOR*

---

## What it is

Audience adaptation loop. Model the target audience (AUDIENCE), shift the register to match (VOICE CHECK), then clean up the output (EDITOR). Use when the content is right but needs to speak to a different audience.

## Chain

1. **AUDIENCE** — Model the target audience. What do they know? What do they care about? What's their register?
	*Advance when: a clear picture of the target audience's knowledge level, priorities, and preferred register is established. Minimum confidence: medium.*
2. **VOICE CHECK** — Shift the content's voice, vocabulary, and framing to match the audience model.
	*Advance when: the content reads as if it was written for this audience, not translated for them. Minimum confidence: medium.*
3. **EDITOR** — Clean up. Ensure consistency, remove artifacts from the translation.

## When to use

- Same message, different audience — board vs. team vs. customers
- Technical content that needs to be accessible
- Cross-cultural or cross-functional translation

## When not to use

- The content itself is wrong → fix the content first
- Same audience, different format → REFORMAT
- You don't actually have a target audience in mind — localizing for "general" or "everyone" produces mush, not reach

## Loop exit

Content that speaks to the specific audience, not content that has been vaguely softened. The audience model is named, the register shift is deliberate, and the output reads as if it was written for them. What you hold when it's done: a version of the content that will land with the target audience.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
