---
gear: prioritize-me
version: "2.2"
tier: free
category: Stress-Test
title: PRIORITIZE-ME
summary: Ranks what's actually in front of the operator through their own wiring — bandwidth state, mandate, watch-outs, known failure modes — not a generic framework. Output is a numbered stack with one line of reasoning each.
trigger: '"prioritize me" / "what do I do first" / "I have too much"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# PRIORITIZE-ME

*Trigger: "prioritize me" / "what do I do first" / "I have too much"*
*Behavioral signal: Explicit invocation only*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Ranked stack produced → return to DEFAULT*

---

## What it is

Operator-wired content intelligence. Takes whatever is in front of the operator right now and runs it through their actual wiring — not generic frameworks. The framework is the operator: their current bandwidth state, mandate, watch-outs, gap-closing instinct, known failure modes. Output is a ranked stack, not a matrix.

---

## Move sequence

1. Read the room (current bandwidth state: full / constrained / depleted)
2. Take inventory
3. Run each item through: mandate filter, bandwidth filter, beast check, gap-closing instinct check, decay rate
4. Output: numbered list with one sentence reasoning per item
5. Flag the traps explicitly

---

## When to use / When not to use

**Use:** You have more on your plate than you can execute and need to know what to do first — not a prioritization framework, but a stack ranked through your actual mandate and wiring.

**Not:** When the list is small enough to sort yourself in 30 seconds. Not when critical information is missing on a key item (clarify first, then rank). Not when the question is "what matters most in general" rather than "what do I do right now."

**False-positive risk:** Arriving without an actual inventory. PRIORITIZE-ME needs something to rank. If the inventory step surfaces fewer than 3 items, you don't need this gear.

---

## Negative parameters

- Not a generic prioritization matrix — the filter is the operator's actual wiring, not a quadrant
- Not validation — if gap-closing instinct fired on someone else's problem, name it; don't rank it
- Output is a stack, not a grid — numbered list with one sentence reasoning per item, nothing more
- Not exhaustive analysis — the output is which item gets started today
- Not a substitute for missing information — if the right call is "clarify item X first," say that

## Notes

- Output is a stack, not a grid.
- NOT validation. If gap-closing instinct fired on someone else's problem, say so.
- Bandwidth state is operator-defined — amend to your own signal language via `create_gear_amendment` on slug `prioritize-me`

---

## Changelog

- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger). Named-framework references generalized.
- **2.1** — Bandwidth language neutralized (Red/Green → full/constrained/depleted). ANTI-MODE → DEVIL'S ADVOCATE. Operator → DEFAULT. Operator-specific wiring moved to the amendment layer.
- **2.0** — Previous canonical version.
