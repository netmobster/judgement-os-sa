---
name: seren
description: Make an HTML page in the Seren style (dark ink, bone, copper and verdigris, IBM Plex) for anything Seren or Unstuck Games. Use when the user asks for a Seren, gaming or Unstuck Games page, or says Seren style.
argument-hint: "<what the page is>"
---

# /sexyhtml:seren

Requested: **$ARGUMENTS**

Follow `${CLAUDE_PLUGIN_ROOT}/reference/house-rules.md` for the build, the check and the ship.
Seren is one committed dark look, so set every colour explicitly and skip the light theme.

**The package:** `${CLAUDE_PLUGIN_ROOT}/design/seren/` (Claude Design, 4 Oct). Start there:
- `styles.css`: the whole look in one stylesheet (the tokens, seren.css, and the `sr-` blocks).
  Copy it beside the page and link it, and publish it with the page.
- `components/<Name>/README.md`: each component's markup, as classes to copy. `preview.html` shows it.
- `reference/blocks.html`: the ten blocks (callout, timeline, step list, comparison, question
  panel, figure, charts, drawings, status tags, slide frame) in plain HTML on one page.
- `README.md`: the brand book.

**Mood:** a lamp-lit map table. Ink ground, bone text, one copper accent, verdigris for
"live". Quiet, literate, a little arcane.

```css
:root {
  --ink:#100d0b;          /* page ground */
  --bone:#e8e1d6;         /* primary text */
  --dust:#a39a8f;         /* secondary text */
  --dust-hi:#c4bcb1;      /* chip text */
  --copper:#b07a4e;       /* accent, rules, focus */
  --copper-hi:#c89060;    /* accent text, links */
  --verdigris:#7f9b8c;    /* live / positive marker */
  --verdigris-hi:#8fa89a;
  --hair:rgba(232,225,214,.09);
  --edge:rgba(232,225,214,.16);
  --edge-soft:rgba(232,225,214,.22);
  --sans:'IBM Plex Sans', system-ui, sans-serif;     /* body, weight 300 */
  --serif:'IBM Plex Serif', Georgia, serif;         /* display */
  --mono:'Space Mono', ui-monospace, monospace;     /* labels, data */
  color-scheme: dark;
}
```

Fonts (Google): `IBM+Plex+Sans:wght@300;400;500`, `IBM+Plex+Serif:ital,wght@0,400;0,500;1,400`,
`Space+Mono:wght@400;700`.

**Moves that make it Seren:**
- Body at weight **300**, line-height 1.6. Serif for headings and pull-quotes.
- Hairline rules (`--hair`) and 1px edges (`--edge`), not shadows.
- `::selection` in copper on ink.
- Mono, uppercase and letter-spaced, for labels: the "files and the shell keep the numbers
  honest" voice.
- Motion is slow and rare: a pulse (`srPulse`) on live markers. Honour reduced motion.
- Links are copper-hi, and turn to bone on hover.
