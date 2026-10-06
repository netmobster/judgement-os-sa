---
gear: loop-root-cause
version: "1.1"
tier: free
category: Loop
title: ROOT CAUSE
summary: The same problem keeps coming back and the fixes keep not holding, which means you've been treating a symptom. ROOT CAUSE reads the current instance, traces the thread back through the earlier ones, and names the driver that would actually stop the recurrence.
trigger: '"root cause this" / "why does this keep happening?"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# ROOT CAUSE

*Trigger: "root cause this" / "why does this keep happening?"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Root cause named — the specific driver that would prevent recurrence if addressed — return to DEFAULT*
*Chain: SCOUT → THREAD → DEFAULT*

---

## What it is

Diagnostic loop for recurring problems. SCOUT reads the situation, THREAD pulls the pattern back through history, DEFAULT acts on what's found. Use when something keeps going wrong and you don't know why.

## Chain

1. **SCOUT** — Read the current situation. What's present, what's absent, what's not being said.
	*Advance when: the current instance is legible — what's present, what's absent, and what's being obscured. Minimum confidence: medium.*
2. **THREAD** — Pull the thread. Trace the pattern back through previous instances. When has this happened before? What's the common element?
	*Advance when: a root cause candidate is named — a specific element that appears across instances, not just a description of the symptom. Minimum confidence: medium.*
3. **DEFAULT** — Act on the root cause, not the symptom.

## When to use

- A problem recurs and surface-level fixes aren't holding
- "Why does this keep happening?"
- Need to distinguish the symptom from the cause

## When not to use

- First-time problem → SCOUT alone
- Already know the cause, need to fix it → DEFAULT
- You've decided on the root cause before starting — confirmation-seeking disguised as diagnosis produces a named cause that doesn't hold under scrutiny

## Loop exit

A named root cause — not a symptom, not a description of the problem, but the underlying driver that, if addressed, would prevent recurrence. What you hold when it's done: a clear distinction between what you've been treating and what's actually generating the problem.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
