---
gear: loop-read
version: "1.1"
tier: free
category: Loop
title: READ
summary: A conversation is coming that turns on one person, and general impressions of them won't survive contact. READ takes in the room first, then builds a working model of the individual — what they want, what they fear, how they decide — and what they'll need from you.
trigger: '"read [person/situation]" / "what''s the read on [person]?"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# READ

*Trigger: "read [person/situation]" / "what's the read on [person]?"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: Yes — when operator asks "what's the read on [person]?" with a specific individual as the subject.*
*Confirm before load: No*
*Exit: Working model of the person in place — motivations, fears, decision style in current context — return to DEFAULT*
*Chain: SCOUT → PORTRAIT → DEFAULT*

---

## What it is

People-reading loop. SCOUT reads the environment and dynamics, PORTRAIT builds a model of the specific person, DEFAULT acts on the combined intelligence. Use before any high-stakes interaction where understanding the other person matters.

## Chain

1. **SCOUT** — Read the situation. What's the context? What's the political reality? What's not being said?
	*Advance when: the context and dynamics are legible — including what's not being said. Minimum confidence: medium.*
2. **PORTRAIT** — Model the specific person. What do they want? What are they afraid of? How do they make decisions?
	*Advance when: a working model of the person is in place — motivations, fears, decision style. Minimum confidence: provisional.*
3. **DEFAULT** — Act on the read. Prepare for the interaction, adjust the approach.

## When to use

- Before a high-stakes 1:1, negotiation, or presentation
- Need to understand someone's motivations before engaging
- "What does this person actually want from this conversation?"

## When not to use

- Reading a situation, not a person → SCOUT alone
- Already know the person well → DEFAULT
- Mapping multiple stakeholders → STAKEHOLDER loop. READ is for one person, deep model.
- You're reading to confirm what you already think — a Portrait built on confirmation bias is worse than no model

## Loop exit

A working model of the person: what they want, what they're afraid of, and how they make decisions — grounded in the current context, not just general impressions. What you hold when it's done: a structured read — person named, their current state, their likely move, what they need from you.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
