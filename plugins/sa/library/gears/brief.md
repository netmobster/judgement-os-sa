---
gear: brief
version: "2.3"
tier: free
category: Generative
title: BRIEF
summary: Structured intake before building. Extracts What, Who, Success and Constraints — plus the failure condition that kills the thing even when built correctly. Asks at most three questions, then produces the brief, not the work.
trigger: '"brief" / "run Brief" / invoke at the start of any build; also fires as SCAFFOLD loop stage 2'
auto: "true"
updated: 2026-08-16
canonical: "true"
---

# BRIEF

*Trigger: "brief" / "run Brief" / invoke at the start of any build*
*Behavioral signal: Explicit invocation only — also fires as SCAFFOLD loop stage (WHITEBOARD → BRIEF → DEFAULT)*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Brief artifact delivered — return to DEFAULT or next loop stage*

---

## What it is

Structured intake gear. Before building anything, Brief extracts the four things that prevent building the wrong thing: What, Who, Success, and Constraints. Also pulls the failure condition — what would make this not work even if built correctly.

Brief reads the room. If enough context has landed, it structures silently. If it's thin, it asks — max 3 questions, targeted, not an interrogation. Output is always the brief, never the thing itself.

Good for: kicking off any build, preventing scope creep before it starts, surfacing hidden constraints before they become problems mid-build.

---

## What it looks like working

- Structures silently when context is rich enough — doesn't ask questions it can answer from what's already in the room
- Asks at most 3 questions, and only the ones that would materially change the brief
- Pulls the failure condition explicitly — not just success criteria, but what kills it even when built right
- Surfaces gaps if present, but doesn't stall on them
- Produces the brief artifact, hands to DEFAULT or build stage. Does not start building.

---

## How to run

1. **Read the room** — assess what's already in the conversation: What, Who, Success, Constraints already visible?
2. **Structure silently** — if context is rich enough, build the brief from what's there. No unnecessary questions.
3. **Ask if thin** — if gaps exist that would materially change the brief, ask. Max 3 questions. Stop there even if more gaps exist.
4. **Pull the failure condition** — always explicit: what kills this even if built correctly?
5. **Surface any remaining gaps** — flag open questions without stalling on them
6. **Deliver the brief** → hand to DEFAULT or next build stage. Do not start building.

---

## Artifact format

```
BRIEF: [name of the thing being built]

WHAT: [what's being built — the thing itself]
WHO: [who it's for and what they need]
SUCCESS: [what done looks like — specific and falsifiable]
CONSTRAINTS: [time, scope, format, platform, resources]
FAILURE: [what kills this even if built correctly]
GAPS: [open questions that would change the brief — only if present]

→ NEXT: [return to DEFAULT / proceed to build / enter SCAFFOLD loop]
```

---

## When to use

- Start of any build: document, system, artifact, campaign
- "Let's build X" / "I need a Y" / invocation
- SCAFFOLD loop entry (WHITEBOARD → BRIEF → DEFAULT)
- Any situation where the risk is building the wrong thing

**Examples:**
- "Let's build a landing page for this" → Brief before touching copy
- "I need to write a presentation for the board" → Brief on audience, stakes, constraints
- Kicking off a new system: Brief prevents the 3-hour build that solves the wrong problem

---

## When not to use

- Thing already defined: if the brief is complete and the operator is ready to build, skip Brief and build.
- Tiny task: if the scope is small enough that constraints are obvious, Brief is overhead.
- Already in build: don't pause mid-build to run Brief. Scope creep mid-stream is DEFAULT noticing drift, not Brief.

**False-positive risk:** Using Brief as avoidance. If the operator knows what they want and is ready to move, Brief can become a stall. Read the room — if they're ready, skip it.

**Failure mode:** Brief that asks more than 3 questions. It becomes an interrogation and the operator loses patience. Ask only what would materially change the brief.

---

## Negative parameters

NOT the thing itself. Brief produces the brief, not the output.
NOT an interrogation. Max 3 questions. Stop there even if more gaps exist.
NOT a project plan. Brief is intake, not architecture.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `brief`.*

## Changelog

- **2.3** — Corrected the 2.1 entry below, which stated the SCAFFOLD chain backwards as BRIEF → WHITEBOARD → DEFAULT. The chain is WHITEBOARD → BRIEF → DEFAULT, as stated in this gear's own body, in `whiteboard.md`, in `editor.md`'s 2.1 entry, and in the SCAFFOLD loop spec. The error was confined to that one line and nothing inherited it.
- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
- **2.1** — SCAFFOLD loop chain updated to WHITEBOARD → BRIEF → DEFAULT naming.
- **2.0** — Previous canonical version.
