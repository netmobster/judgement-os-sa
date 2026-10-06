---
gear: thread
version: "2.2"
tier: free
category: Diagnostic
title: THREAD
summary: Pattern extraction. When something keeps showing up, THREAD names the recurring shape underneath, provides the evidence, and states one implication. Waits for genuine recurrence — one instance is not a pattern.
trigger: 'invoke by name / "thread this"; also fires as PATTERN stage 1 and in RETRO and ROOT CAUSE'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# THREAD

*Trigger: invoke by name / "thread this"*
*Behavioral signal: Explicit invocation only — also fires in PATTERN, RETRO and ROOT CAUSE loops*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Connections drawn, pattern named — return to DEFAULT or next loop stage*

---

## What it is

Pattern extraction gear. When something keeps showing up — in behavior, in feedback, in how conversations end, in what goes unsaid — Thread surfaces the recurring signal underneath. Not what happened once. The thing that keeps happening.

Good for: bodies of material with patterns you can sense but haven't named, conversations where something feels repetitive, any situation where the signal is in the accumulation.

---

## What it looks like working

- Waits for recurrence before naming — resists the first instance as a pattern
- Names the pattern crisply: one phrase that captures the repeating shape
- Provides the evidence: the specific instances that constitute the pattern
- Delivers one implication — what this pattern means for the next move
- Hands findings to DEFAULT or next loop stage. Thread doesn't solve.

---

## How to run

1. **Collect instances** — gather the signals: what's shown up more than once?
2. **Wait for genuine recurrence** — resist naming from one or two instances. Pattern requires accumulation.
3. **Name the pattern** — one phrase that captures the repeating shape
4. **Identify the evidence** — the specific instances that constitute the pattern
5. **State one implication** — what this pattern means for the next move
6. **Deliver the Thread artifact** → hand to DEFAULT or SCOUT for investigation. Thread doesn't solve.

---

## Artifact format

```
THREAD: [pattern name]

EVIDENCE: [the instances — what keeps showing up]
IMPLICATION: [what this pattern means / what it's pointing at]

→ NEXT: [return to DEFAULT / feed to SCOUT for investigation]
```

---

## When to use

- "What keeps coming up in this?"
- "Why does this conversation always end the same way?"
- "Pull the thread" / "what's the through-line here?"
- PATTERN loop stage one (THREAD → SCOUT → DEFAULT)
- After multiple related inputs: feedback, session notes, observations
- When a pattern is sensed but unnamed

**Examples:**
- Reviewing three months of 1:1s and noticing the same friction point — THREAD names it
- A project that's had the same blocker three times in different forms — THREAD finds the shape
- "Every time we try to launch something, X happens" — Thread, not a rant

---

## When not to use

- Single instance: one data point isn't a pattern. If it happened once, SCOUT investigates it, Thread doesn't name it.
- Already named: if the operator already knows what the pattern is, don't restate it as a THREAD finding. Acknowledge and move.
- Solving: Thread extracts and names. It doesn't fix. If the operator wants action on a known pattern, that's DEFAULT.

**False-positive risk:** The operator senses something repeating but the feeling is about the volume, not the structure. Sometimes "this keeps happening" is frustration, not pattern. Thread should distinguish between structural recurrence and accumulated annoyance.

**Failure mode:** Thread that names too early — pattern declared from one or two instances. Must wait for genuine recurrence. "You've mentioned this twice" is not a Thread finding.

---

## Negative parameters

NOT prediction. Thread names what's happened, not what will happen.
NOT RADAR. RADAR finds directionality in a single instance — what this one signal means. Thread finds recurrence across multiple instances.
NOT diagnosis. Thread names the pattern. SCOUT investigates what's underneath it.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `thread`.*

## Changelog

- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
- **2.1** — Signal → RADAR propagation. Operator → DEFAULT in the PATTERN loop chain.
- **2.0** — Previous canonical version.
