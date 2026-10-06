---
gear: loop-scaffold
version: "1.1"
tier: free
category: Loop
title: SCAFFOLD
summary: You have a vague idea and something concrete is due. SCAFFOLD expands the raw material first, then forces it into a real brief — scope bounded, deliverables named, sequence and constraints on the page — so you leave with something you can actually build against.
trigger: '"scaffold this" / "run Scaffold"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# SCAFFOLD

*Trigger: "scaffold this" / "run Scaffold"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Structured brief produced — scope, deliverables, sequence, constraints — return to DEFAULT for execution*
*Chain: WHITEBOARD → BRIEF → DEFAULT*

---

## What it is

Generate then structure. WHITEBOARD for expansion, BRIEF to turn it into a structured deliverable, DEFAULT to execute. Use when you need a plan or spec, not just ideas.

## Chain

1. **WHITEBOARD** — Expand. Generate the raw material.
	*Advance when: the full range of possibilities is on the table — ideas, constraints, angles, open questions. Minimum confidence: provisional.*
2. **BRIEF** — Structure the WHITEBOARD output into a clear, actionable brief — scope, deliverables, sequence, constraints.
	*Advance when: the brief is specific enough to execute against — scope is bounded, deliverables are named, sequence is clear. Minimum confidence: high.*
3. **DEFAULT** — Execute against the brief.

## When to use

- Need to go from "vague idea" to "structured plan" quickly
- Building a spec, a project plan, a proposal
- The raw material exists but needs to be organized before execution

## When not to use

- Need stress-testing → FORGE or ARCHITECT
- Already have the structure → DEFAULT
- Just exploring ideas with no deliverable endpoint → WHITEBOARD. SCAFFOLD commits to producing a buildable structure.
- You have a vague idea and want SCAFFOLD to make it feel more defined without actually committing to scope — SCAFFOLD requires enough clarity to generate a real brief, not just organized ambiguity

## Loop exit

A structured brief with scope, deliverables, sequence, and constraints — built from the raw material generated in WHITEBOARD. What you hold when it's done: a structured brief — scope bounded, deliverables named, sequence clear, constraints surfaced — specific enough to execute, not just a list of ideas.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
