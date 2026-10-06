---
gear: audience
version: "2.2"
tier: free
category: Session
title: AUDIENCE
summary: Read gear. Profiles who a piece of content actually lands with — not who the operator thinks it's for — based on what it assumes and how it's framed. Names the gap between intended and actual before it costs anything.
trigger: invoke by name; also fires as first stage of the PITCH and LOCALIZE loops
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# AUDIENCE

*Trigger: invoke by name, or fires as first stage of PITCH or LOCALIZE loop*
*Behavioral signal: Explicit invocation only — also fires as a loop stage*
*Auto-shift: No*
*Confirm before load: No*
*Exit: audience profile artifact produced → returns to DEFAULT or feeds VOICE CHECK*

---

## WHAT IT IS

Read gear. Takes content — a message, a pitch, a piece of writing, a strategy — and profiles who it actually lands with. Not who the operator thinks it's for. Who it's *actually* for based on what the content assumes, how it's framed, and what it requires the reader to already believe.

The gap between intended audience and actual audience is where communication dies. AUDIENCE finds that gap before it costs anything.

Output: an audience profile artifact — specific, not generic. Not "marketers" — "a growth marketer at a mid-size company who already knows paid is broken and is looking for permission to try something different."

**Parent gear relationship:**

AUDIENCE is a standalone read. It can also feed VOICE CHECK, which translates the content for the profiled audience. When the goal is translation, run AUDIENCE first — VOICE CHECK depends on its output.

---

## WHAT IT LOOKS LIKE WORKING

- Reads the content or message provided
- Identifies: who does this content implicitly assume is reading it?
- Identifies: who will it actually reach, based on framing, vocabulary, and assumed prior knowledge?
- Names the gap between intended and actual (if one exists)
- Produces the audience profile artifact
- If translation is the goal: flags "feed this to VOICE CHECK" at the end

---

## ARTIFACT FORMAT

```
AUDIENCE PROFILE: [content name or slug]

INTENDED: [who the operator thinks this is for]
ACTUAL: [who this will really land with, based on the content itself]
GAP: [what the gap is, if any — or "none identified"]

WHO THEY ARE: [specific profile — role, context, what they believe coming in]
WHAT THEY NEED TO HEAR: [the thing that makes this land for them]
WHERE THIS HITS: [what's working for this audience]
WHERE THIS MISSES: [what's not landing, or what assumes too much/too little]

→ NEXT: [standalone read complete / or: feed to VOICE CHECK for translation]
```

---

## WHEN TO USE

- Before any pitch, message, or piece of content goes out
- PITCH loop (DEFAULT → AUDIENCE → CLOSER) — reading the room before closing
- LOCALIZE loop (AUDIENCE → VOICE CHECK → EDITOR) — profiling before translating
- The operator says "who is this actually for" or "will this land"
- The content has been built but something feels off about the fit

---

## WHEN NOT TO USE

- The audience is already sharply defined and confirmed — don't re-profile a known audience
- The operator is still in generation mode — profile the audience after there's something to profile against
- The problem is the content itself, not the audience fit — that's EDITOR or DEVIL'S ADVOCATE

---

## NEGATIVE PARAMETERS

NOT a demographics exercise. "35-44, male, urban" is not an audience profile. Specific beliefs, context, and prior knowledge are the profile.

NOT prescriptive about who the audience *should* be. AUDIENCE reads who the content reaches. Changing the target is a separate decision.

NOT VOICE CHECK. AUDIENCE profiles. VOICE CHECK translates. Don't do both in one pass.

NOT generic. "Busy professionals" is not a profile. Name the person, the context, and what they believe before they read the first word.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `audience`.*

## Changelog

- **2.2** — Rename propagation: REGISTER → VOICE CHECK (×6), Operator → DEFAULT (×2), Anti-Mode → DEVIL'S ADVOCATE (×1), LOCALIZE chain corrected to AUDIENCE → VOICE CHECK → EDITOR. Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger); duplicate METADATA block removed.
- **2.1** — Migrated to Imprint product pod.
