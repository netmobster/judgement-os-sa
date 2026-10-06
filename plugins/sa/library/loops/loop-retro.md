---
gear: loop-retro
version: "1.1"
tier: free
category: Loop
title: RETRO
summary: Something ended — well or badly — and the lesson will evaporate unless it gets named now. RETRO reads what actually happened against what was planned, checks whether it's part of a larger pattern, and closes with specific changes you're committing to.
trigger: '"retro on [thing]" / "what happened?"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# RETRO

*Trigger: "retro on [thing]" / "what happened?"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Named lessons extracted and specific forward changes committed — return to DEFAULT*
*Chain: SCOUT → THREAD → DEFAULT*

---

## What it is

Post-action review. SCOUT reads what happened, THREAD connects it to patterns, DEFAULT extracts the lessons. Use after a project, a decision, a meeting — anything worth learning from.

## Chain

1. **SCOUT** — Read the situation as it played out. What happened? What was the gap between plan and reality?
	*Advance when: the gap between what was planned and what happened is named — not just "it didn't go to plan" but specifically what diverged. Minimum confidence: medium.*
2. **THREAD** — Connect to patterns. Is this part of a larger trend? Has this happened before?
	*Advance when: a verdict on pattern is reached — either this is connected to something larger, or it's an isolated event. Minimum confidence: provisional.*
3. **DEFAULT** — Extract the actionable lessons. What changes going forward?

## When to use

- After a completed project, sprint, or initiative
- After something went wrong (or right) and you want to understand why
- Periodic review — weekly, monthly, quarterly

## When not to use

- Still in the middle of it → save the retro for after
- Already know the lesson → just apply it
- Running a retro so soon after the event there's no perspective yet — a retro run within minutes of something ending is just venting with structure

## Loop exit

A named set of lessons and a specific set of changes to make going forward. You know what happened, what drove it, and what you're doing differently. What you hold when it's done: an actionable learning — not just a review, but a commitment.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
