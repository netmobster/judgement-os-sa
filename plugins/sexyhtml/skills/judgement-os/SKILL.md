---
name: judgement-os
description: Make an HTML page in the Judgement OS brand (the lamp-lit room, then the paper dossier; Cinzel, Spectral, Space Mono) for Judgement OS itself, meaning its home, field guide and plugin docs. Use when the user asks for a Judgement OS page or says Judgement OS style. Not the default style, which is /sexyhtml:jay.
argument-hint: "<what the page is>"
---

# /sexyhtml:judgement-os

Requested: **$ARGUMENTS**

Follow `${CLAUDE_PLUGIN_ROOT}/reference/house-rules.md` for the build, the check and the ship.
Judgement OS is one committed look (a dark room, then paper), so set every colour explicitly.

**The reference build is the Judgement OS home page**,
https://netmobster.github.io/unstuck-games/judgement-os/ (from Claude Design). Read it before
building, and reuse its card, row and room patterns rather than redrawing them. It's the brand,
**not the default style.**

**Mood:** a card room at night that turns into a briefing. Lamp-lit dark (ink, amber glow,
a swinging shade), then **"the lights come up"** onto warm paper for the reading part. Two
halves of one page: **show, then paperwork.**

```css
:root{
  /* the room (dark) */
  --ink:#060504; --bone:#e8e2d4; --bone-2:#9a9182; --bone-3:#6b6558;
  --rule:#1c1714; --rule-2:#3b352c;
  --glow-rgb:255,170,60;            /* amber; phosphor variant: 120,255,170 */
  --accent:#c2a46a; --title:#e8d8b0; --flame:rgba(255,205,120,.9);
  /* the dossier (paper) */
  --paper:#ebe4d5; --paper-ink:#14110e; --paper-text:#2a241d; --paper-dim:#6f6557;
  --paper-rule:#d6cbb5; --paper-accent:#7a5c22;
  /* type */
  --display:Cinzel,Georgia,serif;              /* titles, letter-spaced caps */
  --serif:Spectral,Georgia,serif;              /* body 300; italics for asides */
  --mono:'Space Mono',ui-monospace,monospace;  /* labels, keys, data */
}
```

Fonts (Google): `Cinzel:wght@500;600`, `Spectral:ital,wght@0,300;0,400;1,300;1,400`,
`Space+Mono:wght@400;700`.

**Moves that make it Judgement OS:**
- **Two registers on one page:** the dark "room" for the pitch and the paper "dossier" for the
  facts, joined by a gradient: *the lights come up.*
- **Cinzel** for titles, widely letter-spaced. **Spectral italic** for the voice lines.
  **Space Mono**, uppercase and tracked, for labels and keys.
- **Cards that turn over** (hover, tap or pin), with roman numerals in the corners and trigger
  phrases as small mono chips.
- **Rows, not boxes:** a mono key on the left, prose on the right, hairline rules between.
- Ambient motion only in the room (lamp swing, candle flicker), with switches to turn it off.
  Honour reduced motion.
- **The voice speaks in first person** in the room ("You came for a plugin. Sit down."), and
  plainly in the dossier.
