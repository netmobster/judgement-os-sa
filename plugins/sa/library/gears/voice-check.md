---
gear: voice-check
version: "2.2"
tier: free
category: Output
title: VOICE CHECK
summary: Translation layer. Rewrites existing content into the register that reaches a specific audience — vocabulary, framing, assumed prior knowledge. Same idea, different entry point. Requires an AUDIENCE profile as input.
trigger: invoke by name after AUDIENCE; also fires as LOCALIZE loop stage 2
auto: "true"
updated: 2026-08-09
canonical: "true"
---

# VOICE CHECK

*(was: REGISTER)*

*Sub-gear. Requires AUDIENCE output as input, or an explicit audience profile from the operator.*

*Trigger: invoke by name after AUDIENCE, or fires as second stage of LOCALIZE loop*
*Behavioral signal: Explicit invocation only — also fires as a loop stage*
*Auto-shift: No*
*Confirm before load: No*
*Exit: translated content produced → feeds EDITOR or returns to DEFAULT*

---

## What it is

Translation layer. Takes content that exists and an audience profile that's been established — and rewrites the content to land for that specific audience. Not a different message. The same message, in the register that reaches them.

VOICE CHECK adjusts: vocabulary, assumed prior knowledge, framing, tone, entry point. It does not change the underlying idea. If the idea needs to change, that's DEVIL'S ADVOCATE or EDITOR — not VOICE CHECK.

**Sub-gear dependency:**

VOICE CHECK cannot run without an audience profile. It either receives the output of AUDIENCE directly, or the operator provides the profile explicitly. VOICE CHECK running blind produces generic content — which is worse than the original.

The LOCALIZE loop: `AUDIENCE → VOICE CHECK → EDITOR`

- AUDIENCE: who is this actually for?
- VOICE CHECK: translate it for them
- EDITOR: sharpen the result

---

## What it looks like working

- Takes: (1) the original content, (2) the audience profile from AUDIENCE or the operator
- Identifies: what does this audience already know? What do they need explained? What framing opens them up?
- Rewrites the content in the register that reaches them — same idea, different entry point
- Returns the translated version with a one-line note: what changed and why
- Flags anything that can't be translated without changing the underlying idea

---

## How to run

1. **Receive inputs** — (1) the content, (2) the audience profile from AUDIENCE or the operator
2. **Map the gap** — what does this audience already know? What needs explaining? What framing opens them?
3. **Rewrite** — same idea, different entry point: vocabulary, framing, assumed prior knowledge adjusted for this audience
4. **Note what changed** — one line: what shifted and why
5. **Flag if untranslatable** — if the idea itself would need to change to land, name it and stop. Don't change substance silently.
6. **Deliver** → feed EDITOR or return to DEFAULT

---

## Artifact format

```
VOICE CHECK: [content name] → [audience]
TRANSLATION NOTE: [what changed and why — one line]

---

[translated content]
```

---

## When to use

- LOCALIZE loop — always after AUDIENCE, never before
- The content is right but the framing is wrong for the target audience
- Same content needs to reach multiple different audiences (run VOICE CHECK once per audience)
- The operator says "make this land for [specific person/group]"
- AUDIENCE identified a gap — VOICE CHECK bridges it

---

## When not to use

- No audience profile exists — run AUDIENCE first, always
- The content itself is wrong — that's EDITOR or DEVIL'S ADVOCATE, not VOICE CHECK
- The audience is already the right one and the content already lands — don't translate what doesn't need translating
- The operator wants a completely different piece for a different audience — that's a new Brief, not a translation

---

## Negative parameters

NOT a rewrite of the idea. VOICE CHECK changes how the idea lands, not what the idea is. If the translation requires changing the substance, flag it — don't do it silently.
NOT a tone pass. "Make this friendlier" is not a register translation. VOICE CHECK is about assumed knowledge, framing, and entry point — not personality.
NOT AUDIENCE. VOICE CHECK does not profile. It translates. If the profile is unclear, stop and run AUDIENCE first.
NOT generic. Translating for "a broader audience" is not a brief VOICE CHECK can work from. Specific audience profile required.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `voice-check`.*

## Changelog

- **2.2** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger).
- **2.1** — Renamed REGISTER → VOICE CHECK. Anti-Mode → DEVIL'S ADVOCATE. Operator → DEFAULT. LOCALIZE chain updated. Slug: register → voice-check.
- **2.0** — Previous version (REGISTER).
