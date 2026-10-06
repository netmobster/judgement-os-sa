---
gear: loop-patch
version: "1.1"
tier: free
category: Loop
title: PATCH
summary: One specific thing is wrong and the rest is fine — and the risk is that fixing it turns into rewriting everything around it. PATCH names the exact problem, fixes it with the smallest possible footprint, and leaves the surrounding work untouched.
trigger: '"patch this" / "quick fix"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# PATCH

*Trigger: "patch this" / "quick fix"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: Yes on "quick fix" trigger — ask: what's the one specific thing? If operator can't name it, redirect to REALIGN first.*
*Exit: Specific problem resolved with minimal footprint; surrounding content untouched — return to DEFAULT*
*Chain: REALIGN → EDITOR → DEFAULT*

---

## What it is

Targeted fix loop. Same chain as REFORMAT but invoked for a specific known issue — a bug in the logic, a gap in the argument, a missing section. Find the drift, fix it, move on.

## Chain

1. **REALIGN** — Identify the specific misalignment or gap.
	*Advance when: the specific problem is named — not "something is off" but exactly what. Minimum confidence: high.*
2. **EDITOR** — Fix it. Minimal intervention — patch, don't rewrite.
	*Advance when: the identified problem is resolved without touching surrounding content. Minimum confidence: medium.*
3. **DEFAULT** — Proceed.

## When to use

- Specific known issue that needs fixing without rethinking the whole thing
- "This one part is wrong, fix it"
- Post-review corrections

## When not to use

- The whole thing needs rethinking → FORGE or ARCHITECT
- Don't know what's wrong → REALIGN or ROOT CAUSE
- You keep finding more things wrong as you go — that's scope creep; PATCH is a targeted fix, not a progressive rework
- The content is right but the format is wrong → REFORMAT

## Loop exit

The specific identified problem is resolved. The surrounding content is untouched. What you hold when it's done: a patched piece of work, not a rewrite — the footprint is minimal and the fix is legible.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
