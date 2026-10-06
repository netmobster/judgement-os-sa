---
gear: loop-debrief
version: "1.1"
tier: free
category: Loop
title: DEBRIEF
summary: Something just got taken apart, and the temptation is to move on before counting the bodies. DEBRIEF is the structured exit from adversarial work: it names what died and why, names what held and why, and leaves you holding the part that actually survived.
trigger: '"DEBRIEF" / "debrief this"'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# DEBRIEF

*Trigger: "DEBRIEF" / "debrief this"*
*Behavioral signal: Mandatory after any PRESSURE TEST run; also standalone-invocable after any adversarial session*
*Auto-shift: No — but expected after every PRESSURE TEST run*
*Confirm before load: No*
*Exit: Casualties and Survivors lists complete; WHITEBOARD run if Survivors are thin — return to DEFAULT*
*Chain: Casualties/Survivors → [WHITEBOARD — optional] → DEFAULT*

---

## WHAT IT IS

The structured exit from PRESSURE TEST mode. Mandatory after any PRESSURE TEST run. Catalogues what died and what survived, then Whiteboards new options if needed, then returns to DEFAULT for execution.

## CHAIN

1. CASUALTIES — What died in PRESSURE TEST and why. Name each thing specifically. This is where the learning lives.
	*Advance when: every element from the PRESSURE TEST run is classified — dead or alive — and the reasons are named. Minimum confidence: high.*
2. SURVIVORS — What held and why it held. This is the actual product.
	*Advance when: survivors are listed and the basis for each surviving is explicit — not just "it held" but why. Minimum confidence: medium.*
3. WHITEBOARD — Optional. If Survivors are thin and new options are needed, generate them here before returning to DEFAULT.
	*Advance when: new options are on the table, or survivors are sufficient without them. Minimum confidence: provisional.*
4. DEFAULT — Execute on what's left.

## WHEN TO USE

- After any PRESSURE TEST run — this is mandatory, not optional
- The operator says "DEBRIEF" or "EXIT PRESSURE TEST"
- Don't skip the Debrief even when the operator wants to move on — the Casualties list is where the value lives

## WHEN NOT TO USE

- For general post-action review with no adversarial component → RETRO
- Skipping it immediately after a PRESSURE TEST run because the operator wants to move on — the Casualties list is where the value lives; skipping it means the PRESSURE TEST cost was paid for nothing

*(DEBRIEF is the standard PRESSURE TEST exit AND standalone-invocable after any adversarial session)*

## Loop exit

A completed Casualties list and a clear Survivors list. You know exactly what died, why it died, and what's left to work with. If WHITEBOARD ran, new options are also on the table. What you hold when it's done: the real product — everything that survived adversarial pressure — plus an explicit record of what was discarded and why.

## Changelog

- **1.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
