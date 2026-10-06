---
gear: loop-architect
version: "1.2"
tier: free
category: Loop
title: ARCHITECT
summary: For the build where getting it wrong costs something real, and where the room, the politics, and the unspoken requirements shape the outcome as much as the idea does. You come out holding an artifact that was scouted before it was built and stress-tested after.
trigger: '"Architect this" / "Run Architect" / "I want to architect [thing]"'
auto: "true"
updated: 2026-08-10
canonical: "true"
---

# ARCHITECT

*Invoke: "Architect this" / "Run Architect" / "I want to architect [thing]"*
*Behavioral signal: Operator is building something with significant stakes where environment, politics, or hidden requirements matter as much as the idea*
*Auto-shift: No — confirm before loading*
*Chain: SCOUT → WHITEBOARD → DEFAULT → DEVIL'S ADVOCATE*

---

## What it is

Full-spectrum build loop. Use when building something with real stakes and you need to see the whole picture before committing. The distinction from FORGE: ARCHITECT maps the terrain before generating. FORGE builds and tests. ARCHITECT scouts, then builds and tests.

## Chain

**1. SCOUT** — Read the terrain first. Map it before building. What's not being said? What are the hidden requirements? What will the environment do to this plan?
*Advance when: key unknowns are named and the build context is clear. Minimum confidence: medium.*

**2. WHITEBOARD** — Generate with SCOUT's intelligence loaded. Options, structures, approaches — informed by what SCOUT found.
*Advance when: options feel exhausted or a clear direction has emerged. Minimum confidence: provisional.*

**3. DEFAULT** — Execute on the best option. Build the thing.
*Advance when: a complete first draft or working structure exists. Minimum confidence: medium.*

**4. DEVIL'S ADVOCATE** — Stress-test the built thing. Find what's weak now that it exists. Final gate before commitment.
*Loop exit: operator has a built, stress-tested artifact they can commit to or iterate on.*

## Loop exit

Operator has a fully built artifact that has survived intelligence-informed generation and explicit stress-testing. They know what the environment will do to it, what was generated, what was built, and what held under pressure.

## When to use

- Building with real stakes — product architecture, strategy, major decisions
- The environment matters as much as the idea (political dynamics, team dynamics, market dynamics)
- You need the full picture before committing: read the terrain, generate, execute, stress-test
- "I want to architect this" is the natural trigger

## When not to use

- Smaller builds where FORGE is sufficient — ARCHITECT is the more expensive loop
- Already have the intelligence and just need to build → FORGE
- Need to destroy an idea, not build one → GAUNTLET

## Changelog

- **1.2** — Retired RECON references removed from stage 1 and the loop-exit copy. Chain line and stage 2 now name WHITEBOARD and SCOUT consistently in gear case.
- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
