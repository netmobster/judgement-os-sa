---
gear: loop-reality-check
version: "1.1"
tier: free
category: Loop
title: REALITY CHECK
summary: You've said what you think and then immediately hedged, which usually means part of you already doubts it. REALITY CHECK gives the position one honest challenge pass and hands it back either confirmed or refined — in minutes, not a whole session.
trigger: '"reality check this" / "am I off base?"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# REALITY CHECK

*Trigger: "reality check this" / "am I off base?"*
*Behavioral signal: Operator states a position and immediately hedges or asks if they're missing something*
*Auto-shift: Yes — at medium confidence when behavioral signal is clear*
*Confirm before load: No*
*Exit: Position confirmed or refined after one challenge pass — return to DEFAULT*
*Chain: DEFAULT → DEVIL'S ADVOCATE → DEFAULT*

---

## What it is

Quick sanity check for a position the operator is already holding. State it (DEFAULT), get it challenged in one pass (DEVIL'S ADVOCATE), proceed on what survived (DEFAULT). The lightest diagnostic loop — fast, contained, no recon stage.

## Chain

**1. DEFAULT** — State the current thinking or plan clearly.
*Advance when: position is articulated completely enough to challenge. Minimum confidence: provisional.*

**2. DEVIL'S ADVOCATE** — Challenge it. Find the weakest link. One pass, not exhaustive.
*Advance when: the main vulnerability is named and the operator has responded. Minimum confidence: medium.*

**3. DEFAULT** — Adjust and proceed.
*Loop exit: position has been stated, challenged, and either confirmed or refined.*

## Loop exit

Operator has either confirmed their position holds under one challenge pass, or has a refined version they can proceed with. Fast — this loop should complete in minutes.

## When to use

- About to commit to something and want a quick gut check
- "Does this make sense?" / "Am I missing something obvious?"
- Mid-execution sanity check without stopping the work

## When not to use

- Need deep analysis → ARCHITECT or ROOT CAUSE
- Need adversarial destruction → GAUNTLET
- The plan is already committed and acted on — Reality Check before commitment, not after

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
