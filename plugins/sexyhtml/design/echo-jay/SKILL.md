---
name: echo-jay-design
description: Generate HTML artifacts in ECHO-JAY, the personal design system Jay Wright made, for ~500px Claude Desktop / Claude Code sidebar artifacts — drafts and posts, reports, points of view, status boards, architecture diagrams — or write production UI that matches it. Use whenever the user asks for an ECHO-JAY artifact, "my design system", "the ECHO look", or any sidebar HTML for themselves.
user-invocable: true
---

# ECHO-JAY — sidebar artifacts in HTML

ECHO-JAY is a light, industrial system: cool steel-white ground, gold for attention and liveness, steel blue for data, condensed display type, a mono readout voice, chamfers and corner brackets instead of radii, raised and recessed surfaces instead of flat cards. Every artifact is one column: nameplate header with a live readout → title block → content.

## Before you build
1. Read `README.md` once per session (voice, foundations, do/don't).
2. Read `reference/html-recipes.md` — exact markup for every block. The class layer in `tokens/classes.css` *is* the component library; no build step.
3. Copy `templates/artifact.html` beside your output and replace its slot text (header label, title, subtitle, byline, content, footer label) with the artifact's own. Keep the structure of its header, readout and footer, and the two scripts (theme + text size, clock). Fix `../styles.css` if the file moves.

## Setup
Copy `styles.css` and `tokens/` next to the artifact (or reference them by relative path) and link one stylesheet:

```html
<link rel="stylesheet" href="styles.css">
```

Fonts (Barlow Condensed, Source Sans 3, Share Tech Mono) load from Google Fonts through `tokens/fonts.css`. For a single self-contained file, inline the token CSS into a `<style>` block in `<head>` — keep the `@import` for fonts first.

## The shape of an artifact
- `ej-shell` → `ej-header` (`ej-header-row` with `ej-nameplate` + `ej-label` + `ej-controls`; `ej-readout`) → `ej-titleblock` (`ej-title`, `ej-subtitle`, `ej-byline`) → `ej-content` → `ej-footer`.
- Content blocks are direct children of `ej-content`: `<p>`, lists, `ej-panel`, `ej-table` (in `ej-table-wrap`), `ej-callout`, `ej-stats`, `ej-timeline`, `ej-steps`, `ej-compare`, `ej-question`, `ej-quote`, `ej-fig` (framing `ej-bars`, `ej-line`, `ej-multiples`, `ej-flow`, `ej-seq`, `ej-layers`), `ej-receipt`, `ej-btn-row`, `ej-code`, `ej-kv`, `ej-divider`. Markup for each is in `reference/html-recipes.md`; all of them render in `reference/blocks.html`.
- Controls: every artifact ships the A−/A+ and DARK/LIGHT buttons from the template; they persist in `localStorage` (`ej-theme`, `ej-size`).

## Hard rules
- **The system sets the look, never the content.** Titles, readout values, labels and figures are the owner's, for each artifact. Numbers are counts, never a score out of anything: no fractions, no percentages, no progress bars.
- **Light by default.** `<html>` without `data-theme` follows the host; the header toggle sets `data-theme="dark|light"`. Never hard-code dark.
- **One gold thing per block.** Gold marks attention and liveness: nameplate, primary button, the highlighted bar, live readout values, the receipt. Everything else is steel or neutral. Gold text is always `var(--ej-gold-text)`; text on a gold fill is `var(--ej-on-gold)`.
- **Counts only.** Every figure is a count — 14, 0, +2 — never a fraction, a percentage, a score or a progress bar. `ej-stats` carries the numbers that matter; the one that matters most is the gold one.
- **No radii.** Chamfer (`clip-path`) or bracket (`::before/::after`), never `border-radius`. Use the existing classes; do not invent new corner treatments.
- **Depth has a direction.** Raised (`--ej-shadow-raise` + `--ej-bevel`) for things the reader looks at or presses; recessed (`--ej-shadow-inset`) for things they type into or read as a well (inputs, chart, code, readout strip). Never flat, never both.
- **Type roles.** Barlow Condensed for titles, figures, node titles and the nameplate only. Source Sans 3 for anything read. Share Tech Mono for readouts, labels, keys, stamps — never prose. 11px (`--ej-text-label`) is the floor.
- **Number the labels.** `01 //`, `02 //`, `FIG.01 //`, `TBL.02 //`, then the block's own name. Readout parts separate with `//`, label parts with `·`. Readout dates use the `YYYY.MM.DD` format.
- **Motion is ambient only.** The dot blinks, live values and figures breathe, the clock ticks. Nothing else moves. Keep the reduced-motion rule.
- **Tokens, not literals.** Colors `var(--ej-*)`, spacing `var(--ej-space-*)`, type `var(--ej-text-*)`. The template's inline `--v` custom property on bars is the one sanctioned inline value.
- **Copy.** Keep the owner's text verbatim. Sentence case; CSS does the uppercasing. Verbs with objects on buttons. No emoji, no exclamation marks.
- **No logo.** The nameplate is type. Do not draw a mark.

## Content at 500px
- Title 35px wraps to 2–3 lines; that is fine. Subtitles stay under ~45 words.
- Tables: 3–4 columns max; wrap in `ej-table-wrap`. Beyond that, use `ej-kv`.
- Flow diagrams: ≤4 nodes per row, otherwise `ej-flow-vertical`.
- Charts: `ej-bars` up to ~30 bars, `ej-line` up to ~12 points, `ej-multiples` two or three across on one shared scale. Axes in mono, values as counts.
- Diagrams: `ej-seq` holds three or four actors, `ej-layers` three or four bands. Label every arrow with a verb.
- `ej-stats`: two to four counts, one gold at most. `ej-timeline` vertical in the sidebar, `ej-timeline-h` on slides.

## Slides
`ej-slide` is a 1920×1080 frame: `ej-slide-head` (nameplate + numbered label), `ej-slide-title`, `ej-slide-body` (`ej-slide-cols` for a 44/56 split), `ej-slide-foot`. Set `data-theme="dark"` on the section for an ink slide. Every block class is rescaled inside `.ej-slide` so nothing drops below 24px; use literal px for anything you add.

## Review before you hand over
- Header has nameplate, a numbered label, controls and a readout; footer present.
- Each block has one gold element at most; gold text uses `--ej-gold-text`.
- Every number is a count: no percentage, no score, no progress bar.
- No `border-radius`, no second accent color, no emoji, no icon fonts.
- Headings condensed, body sans, mono only on machine text; nothing under 11px.
- Light and dark both read: toggle once before shipping.
- Toggle and A−/A+ work and persist.

## Files
- `README.md` — the full guide.
- `styles.css` → `tokens/` — fonts, colors (+ `theme-auto.css`), typography, spacing, base, `classes.css`.
- `reference/html-recipes.md`, `reference/tokens.md`, `reference/blocks.html` (every block in plain HTML, light and dark).
- `templates/artifact.html` — the starter; open it in a browser as-is.
- `components/<group>/` — React source (`.jsx`, `.d.ts`, `.prompt.md`) for production React; `*.card.html` demos need the compiled design-system bundle (Claude Design) and will not render standalone.
- `guidelines/` — specimen cards.
