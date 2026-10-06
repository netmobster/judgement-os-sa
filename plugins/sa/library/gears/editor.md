---
gear: editor
version: "2.2"
tier: free
category: Output
title: EDITOR
summary: Precision pass. Takes a draft and makes three cuts in order — length, clarity, landing — in the operator's own voice. Surgical, not a rewrite. If more than 40% changes, it's a rebuild, not an edit.
trigger: '"run Editor" / "clean this up" / "tighten this"; also fires as a loop stage in PATCH, REFORMAT and LOCALIZE'
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# EDITOR

*Trigger: "run Editor" / fires as loop stage after generation*
*Behavioral signal: Fires as a loop stage in PATCH, REFORMAT and LOCALIZE chains; also explicit when the operator wants a precision pass on an existing draft*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Sharpened output produced → return to DEFAULT*

---

## What it is

Precision pass gear. Takes a V0.1 draft — from WHITEBOARD, BRIEF, DEFAULT, wherever — and sharpens it. Not a rewrite. Not a translation (that's VOICE CHECK/LOCALIZE). Not an audience calculation (that's AUDIENCE). One job: make the operator's output as sharp as it can be in the operator's voice.

The three cuts EDITOR makes, in order:

1. **Length** — what can be removed without losing meaning? Cut it.
2. **Clarity** — what is ambiguous, padded, or hedged? Fix it.
3. **Landing** — does the last line hit? If not, find the line that does.

EDITOR works on the operator's voice, not a generic clean voice. Sharpening means the output sounds more like the operator, not less.

---

## What it looks like working

- Takes the V0.1 as input — reads it fully before touching anything
- Identifies the three to five highest-value cuts or fixes
- Makes them surgically — doesn't rewrite what doesn't need rewriting
- Returns the sharpened version with a one-line diff note: what changed and why
- Doesn't explain every edit — names the pattern, not each instance

---

## When to use

- A draft exists and needs to be tighter before it goes anywhere
- PATCH loop (REALIGN → EDITOR → DEFAULT) — fixing something that has drifted
- REFORMAT loop (REALIGN → EDITOR → DEFAULT) — reshaping for a container
- LOCALIZE loop stage three — cleaning up after VOICE CHECK
- The operator says "clean this up" or "tighten this" or "something's off but I can't name it"
- Output is good but not landing — EDITOR finds where it loses the thread

---

## When not to use

- Nothing exists yet — EDITOR has no input. Go to WHITEBOARD or DEFAULT first.
- The problem is the idea, not the execution — DEVIL'S ADVOCATE, not EDITOR
- The output needs to land for a specific audience in a different register — that's VOICE CHECK or LOCALIZE, not EDITOR
- The operator wants a full rewrite — EDITOR is surgical, not wholesale. If the V0.1 is fundamentally wrong, say so and rebuild from DEFAULT.

**False-positive risk:** "Something's off" can mean the writing is loose (EDITOR) or the thinking is wrong (DEVIL'S ADVOCATE). Read which one it is before firing. Sharpening bad logic produces sharp bad logic.

---

## Negative parameters

NOT a rewrite. If more than 40% of the draft changes, that's a rebuild, not an edit.
NOT genericizing. EDITOR sharpens the operator's voice — doesn't sand off the edges that make it theirs.
NOT explaining every cut. One-line diff note on the pattern.
NOT slow. EDITOR is a fast pass. V0.1 → V0.2 in one move.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `editor`.*

## Changelog

- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
- **2.1** — REGISTER → VOICE CHECK propagation. PATCH chain corrected to REALIGN → EDITOR → DEFAULT. SCAFFOLD removed from the loop-stage list (its chain is WHITEBOARD → BRIEF → DEFAULT and does not include EDITOR). Anti-Mode → DEVIL'S ADVOCATE.
- **2.0** — Previous canonical version.
