---
gear: portrait
version: "2.2"
tier: free
category: People
title: PORTRAIT
summary: Builds a working model of a specific person — how they think, what they're protecting, what moves them, what shuts them down. Built from behaviour, not job title. The read you want in your head before walking into the room.
trigger: invoke by name; also fires in STAKEHOLDER and READ loops after SCOUT
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# PORTRAIT

*Trigger: invoke by name, or fires in STAKEHOLDER or READ loop after SCOUT*
*Behavioral signal: Explicit invocation only — also fires as a loop stage*
*Auto-shift: No*
*Confirm before load: No*
*Exit: working model of the person produced → feeds DEFAULT or VOICE CHECK*

---

## What it is

Framing gear. Builds a working model of a specific person — not a demographic, not a role description, a person. How they think, what they're protecting, what they need to hear, what moves them, what shuts them down.

PORTRAIT is the pre-work for any meaningful stakeholder interaction. Before you translate content for someone (VOICE CHECK), before you pitch them (PITCH loop), before you align with them (STAKEHOLDER loop) — you need to know who they actually are. PORTRAIT produces that model.

The output isn't a fact sheet. It's a read — the thing you'd want in your head before walking into the room.

**Relationship to VOICE CHECK:**
PORTRAIT profiles the person. VOICE CHECK translates content for them. PORTRAIT feeds VOICE CHECK when the goal is communication — you can't translate well without a working model of who you're translating for.

**Scope note:**
PORTRAIT profiles a specific, known individual. Profiling who a piece of content will reach — a readership rather than a person — is a different job with different inputs and different precision.

---

## What it looks like working

- Takes everything available: past interactions, the operator's observations, role context, behavior patterns
- Builds the model from behavior and evidence, not from stated preferences or job title
- Names what the person is protecting — the thing they'll defend even when they shouldn't
- Names what moves them — what actually changes their mind or earns their buy-in
- Flags the landmines: what shuts them down, what reads as threat, what triggers defensiveness
- Produces the portrait artifact — specific, not generic
- If thin data: says so explicitly, builds provisional model, flags gaps

---

## How to run

1. **Gather everything available** — past interactions, operator observations, role context, behavior patterns
2. **Build from behavior, not stated preferences** — what they do > what they say
3. **Name what they're protecting** — the thing they'll defend even when they shouldn't
4. **Name what moves them** — what actually earns buy-in for this specific person
5. **Flag the landmines** — what shuts them down, what reads as threat
6. **Assess confidence** — high / medium / provisional. Flag gaps explicitly.
7. **Deliver the portrait artifact** → standalone read, or feed to VOICE CHECK or CLOSER

---

## Artifact format

```
PORTRAIT: [name / role]

WHO THEY ARE: [how they think, how they process, what their operating system is]
WHAT THEY'RE PROTECTING: [the thing they'll defend — status, certainty, relationships, territory]
WHAT MOVES THEM: [what actually earns buy-in — data, social proof, autonomy, being heard]
WHAT SHUTS THEM DOWN: [triggers, landmines, what reads as threat]
HOW TO LAND WITH THEM: [the framing that works — what to lead with, what to avoid]

CONFIDENCE: [high / medium / provisional]
GAPS: [what's unknown that would sharpen this model]

→ NEXT: [standalone read / or: feed to VOICE CHECK for communication / or: feed to CLOSER for alignment]
```

---

## When to use

- STAKEHOLDER loop (SCOUT → PORTRAIT → DEFAULT) — before any significant stakeholder interaction
- READ loop (SCOUT → PORTRAIT → DEFAULT) — building a deeper model over time
- Before a difficult conversation, pitch, or alignment ask
- The operator says "I need to get X on board" or "I don't know how to read Y"
- A relationship keeps not landing — PORTRAIT finds the model that explains why

---

## When not to use

- The person is well-understood and the model is current — don't re-portrait a known quantity
- The ask is about content reach rather than a specific individual — that's a readership question, not a person question
- The goal is to manipulate rather than understand — PORTRAIT builds honest models for honest communication

---

## Negative parameters

NOT a fact sheet. Title, tenure, and stated preferences are inputs, not the portrait.
NOT static. PORTRAIT is a working model — it updates as behavior provides new data.
NOT a readership profile. PORTRAIT is for a specific known person.
NOT a script. PORTRAIT produces a frame, not a playbook.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `portrait`.*

## Changelog

- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger). AUDIENCE cross-references rewritten self-contained.
- **2.1** — REGISTER → VOICE CHECK throughout. STAKEHOLDER and READ loop chains updated. Retired PROFILE removed from the READ chain.
- **2.0** — Previous canonical version.
