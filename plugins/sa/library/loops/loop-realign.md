---
gear: loop-realign
version: "1.2"
tier: free
category: Loop
title: REALIGN
summary: A project that's been running starts to feel off, and you can't tell whether the work evolved or just wandered. REALIGN reads the gap between what you set out to do and where you actually are, then leaves you with the drift named, classified, and corrected.
trigger: '"realign" / "realign this" / "am I still on track?"'
auto: "true"
updated: 2026-08-10
canonical: "true"
---

# REALIGN

*Trigger: "realign" / "realign this" / "am I still on track?"*
*Behavioral signal: Operator says something feels off about a project that's been running — scope, tone, or direction no longer matches original intent*
*Auto-shift: No*
*Confirm before load: Yes — near-match to CALIBRATE; confirm which loop fits*
*Exit: Drift classified as intentional or unconscious, artifact realigned, corrected course clear — return to DEFAULT*
*Chain: REALIGN → EDITOR → DEFAULT*

---

## What it is

When a project that's been running starts to feel off — and you can't tell if the work evolved or just wandered. REALIGN reads the gap between where you started and where you are now. EDITOR cleans up the misalignment. DEFAULT proceeds on the corrected course.

## Chain

**1. REALIGN** — Read the gap between original intent and current state. Where has the work drifted? Is the drift intentional evolution or unconscious wandering?
*Advance when: the drift is named and the operator has confirmed whether it's intentional. Minimum confidence: medium.*

**2. EDITOR** — Clean up. Realign language, scope, or direction to match the corrected intent.
*Advance when: the artifact reflects the corrected intent. Minimum confidence: medium.*

**3. DEFAULT** — Proceed on the corrected course.
*Loop exit: operator knows whether drift was intentional or unconscious, has cleaned up the artifact accordingly, and has a clear corrected course ahead.*

## Loop exit

Operator knows whether their drift was intentional or unconscious, has cleaned up accordingly, and has a clear course to proceed on.

## When to use

- A project has been running for a while and "something feels off"
- The deliverable no longer matches the original brief
- Need to distinguish intentional evolution from scope creep

## When not to use

- Just started — there's nothing to drift from yet
- The drift is the point — sometimes the original intent was wrong. Sit with it before REALIGN.
- Deeper pattern issue → PATTERN or ROOT CAUSE

## Changelog

- **1.2** — Rename note "(was: DRIFT CHECK)" dropped from the header.
- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger). Retired RECALIBRATE reference replaced.
