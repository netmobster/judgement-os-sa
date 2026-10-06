# ECHO-JAY design system

ECHO-JAY is a personal system, made by Jay Wright, for the HTML artifacts Claude Code and Claude Desktop build for you in a ~500px sidebar: posts and drafts, reports, points of view, status boards, architecture diagrams. Every artifact has the same shape — a nameplate header with a live readout, a title block, then content: prose, tables, controls, charts, diagrams — and the same bearing: light, industrial, precise.

The look is hyper-industrial light mode in the lineage of early-2000s 2advanced Studios and the bridge displays of *Star Trek: Strange New Worlds*, kept bright. A cool steel-white ground, gold for attention and liveness, steel blue for data and structure. Condensed display type, a readable sans for body, a mono voice for readouts. Nothing is rounded: corners are chamfered or bracketed. Surfaces are raised or recessed with shallow steel-tinted shadows and a one-pixel bevel, so the page has depth without decoration. Ambient motion — a blinking dot, a breathing glow — says "this is on".

## Sources

- Direction mockups built in this project (`ECHO-JAY B - Clearly.dc.html`, the chosen direction; `ECHO-JAY A - Hints.dc.html`, the quieter alternative). The brief was gathered in conversation: Claude Desktop artifacts at ~500px, light and dark with a toggle, an A−/A+ text-size control, condensed display type, cool steel-white ground, gold with steel blue, ambient motion, deliberately different from the owner's other design systems.
- References named by the owner: 2advanced Studios (light-mode work), *Strange New Worlds*. Neither was available as files; nothing was copied from them.
- No logo, no font binaries, no product code were provided. Fonts come from Google Fonts. The wordmark is set in type.
- Sample content from the brief was stripped on 1 Oct 2026 at the owner's request: Claude Design had read it as rules.

## Content fundamentals

The system sets the look, never the content. Nothing here prescribes what an artifact says.

- **Voice:** the owner's text, verbatim. Declarative, specific, short. No exclamation marks, no emoji, no hype.
- **Title + subtitle:** the owner's words. The subtitle is a few plain sentences at most.
- **Readouts** speak machine: `SYS.ECHO // 14:02:33`, then whatever is live for this artifact. Uppercase comes from CSS. `//` separates readout parts, `·` separates label parts, dates are `YYYY.MM.DD`.
- **Labels number things:** `01 //`, `02 //`, `FIG.01 //`, `TBL.04 //`, `PNL.02 //`, then the block's own name. Numbering is the industrial tell; use it on every block that has a label.
- **Receipts:** when an artifact records something done, one receipt says what happened, stamped `CC · MM.DD`.
- **Buttons** are verbs with objects. Switch rows are plain nouns.
- **Numbers** are exact and small, and they are counts: never a score out of anything, no fractions, no percentages, no progress bars. A figure gets the gold glow only if it is the point of the block.

## Visual foundations

- **Grounds:** light is the default — `--ej-bg` #eef2f6 steel white with white surfaces. Dark (`[data-theme="dark"]`) is a second ground, not an afterthought: #0d1319 with #131b24 surfaces, gold brightened to #e2b93b, steel to #6f9fd0. With no attribute set, the artifact follows the host (`theme-auto.css`). The toggle in the header switches and persists.
- **Color:** gold `--ej-gold` #c9a227 is attention and liveness — nameplate, primary button, the highlighted bar, live readout values, focus. As text it is `--ej-gold-text` #7a5c0e so it reads on the ground. Steel `--ej-steel` #3f6b96 is data and structure — bars, table heads, node brackets, links; as text `--ej-steel-text` #2b5276. Body text is `--ej-fg` #0f1720; secondary copy `--ej-fg-muted` #4f6076; labels `--ej-fg-faint` #627186. Status green/red exist for tags only.
- **Type:** Barlow Condensed 600 for titles (35px, line-height 1.02), figures and node titles; 700 for the nameplate at 0.1em tracking. Source Sans 3 for everything read: 17px subtitle, 15px body at 1.6, 14px tables, 13px button labels. Share Tech Mono for readouts, labels, keys and stamps at 11–12px with 0.08–0.12em tracking, uppercase by CSS. 11px is the floor. Sizes are rem on a 15px root; `data-size="-1|1"` moves the root to 14 or 16px.
- **Spacing:** 4px scale. 20px content gutter, 16px chrome gutter, 22px between content blocks, 14/16px inside panels, 10px between rows.
- **Geometry:** no radii anywhere. Chamfers (a cut corner): 5px on tags, controls and the switch; 8px on the primary button; 10px on the nameplate's trailing edge. Brackets (an L in the corner): 12px gold on panels, 8px steel on flow nodes. Hairlines are 1px `--ej-line`; strong lines `--ej-line-strong`; the byline rule is dashed.
- **Elevation:** two directions. Raised — panels, tables, receipts, nodes, secondary buttons: `--ej-shadow-raise` (a 1px contact shadow plus a soft steel-tinted drop) with a 1px white bevel on top. Recessed — the readout strip, inputs, the chart well, code, the switch track: `--ej-shadow-inset`. Gold fills carry `--ej-bevel-gold` (light on top, shade on the bottom). The header casts down, the footer casts up. Framed previews add `--ej-shadow-frame` on a desk.
- **Texture:** the readout strip has a 1px-on-3px scan-line gradient; the chart well has 18px gridlines; a framed desk has a faint 24px grid. Hazard stripes (135° repeating gradient) are the divider. No photos, illustrations or gradients beyond these; the only glow is gold.
- **Motion:** ambient only. `ej-dot` blinks on a 2s cycle; `ej-readout-live`, `ej-figure` and `ej-pulse` breathe a gold text-shadow on a 3s cycle; a readout clock ticks. Hover and switch transitions are 150ms. Nothing enters, slides or bounces. All of it stops under `prefers-reduced-motion`.
- **Hover / press:** primary steps to `--ej-gold-bright`, presses to `--ej-gold-edge` with an inset shade. Secondary turns its border gold and tints to `--ej-surface-2`; pressed, it recesses. Controls turn their border gold. Inputs turn their border steel on hover, gold with a halo on focus. Table rows tint on hover. Disabled is 45% opacity. No transforms.
- **Layout:** one column, `ej-shell` fills the host pane. Header pinned by content order (nameplate row, readout strip), footer pushed to the bottom with `margin-top:auto`. Blocks are full width; two-up grids only for tags and small figures. Flow diagrams run horizontally up to four nodes, then vertically; sequences hold three or four actors; layers stack bands of boxes with a verb between them. Slides (`.ej-slide`) are 1920×1080 with 96px gutters and a 24px floor: nameplate and numbered label top, title, body, mono footer.

## Iconography

- No icon set is required by any component. When an icon is genuinely needed, use Lucide (https://lucide.dev) inline SVG on `currentColor`, stroke-width 2, 14px in buttons and 16px in rows.
- No emoji. Unicode is typography: `//`, `·`, `→`, `↓`.
- **Nameplate:** `FOR <NAME>` set in Barlow Condensed 700 on the gold nameplate: who the page is for, the operator by default (`FOR YOU` when no name is set). The system is ECHO-JAY; the nameplate names the reader, not the system. No logo was supplied and none was drawn; do not draw one.

## Components

Namespace: the compiler assigns it from the project name (cards resolve it at runtime). Groups under `components/`:

- `shell/` — **Shell** (header, readout slot, footer), **Readout**, **Controls** (theme + text size, persisted), **TitleBlock**, **Divider**
- `actions/` — **Button** (primary / secondary / ghost, sm), **Tag** (neutral / gold / steel / ok / alert)
- `forms/` — **Field**, **Input** (multiline, select), **Switch**, **SwitchList**
- `surfaces/` — **Panel** (plain, list), **Label**, **Count** (the gold figure, `.ej-figure`), **Receipt**, **Code**, **Callout** (info / warning / decision), **Comparison**, **QuestionPanel**, **Quote**, **Figure** (the numbered frame)
- `data/` — **Table**, **StatRow**, **KeyValue**, **Timeline** (vertical, horizontal), **StepList**, **Bars**, **LineChart**, **SmallMultiples**, **Flow** (+ **Node**), **Sequence**, **Layers**
- `slides/` — **SlideFrame** (1920×1080, with slide-scale overrides for every block)

Every component renders classes from `tokens/classes.css`, so each has a plain-HTML twin in `reference/html-recipes.md` and in `reference/blocks.html`. Each `*.card.html` previews its component on both grounds.

Not included on purpose: Tabs, Dialog, Toast, Tooltip, Avatar, Progress. A sidebar artifact is one scrolling column; if one of those is needed, compose it from Panel and Button and add it here. Progress was removed because the system shows counts, not scores.

## Do / Don't

Do: number your labels; give every artifact a readout; keep one gold thing per block; raise what the reader acts on and recess what they type into; let the readout and the figures be the only glow; count things and show the count; keep it light unless the host is dark.

Don't: round a corner; add a second accent; put gold text on gold; show a percentage, a score or a progress bar; use the mono for prose; animate anything but the dot, the glow and the clock; draw a logo; drop below 11px.

## Index

- `SKILL.md` — agent-skill entry (Claude Code).
- `styles.css` — the single entry; imports `tokens/`.
- `tokens/fonts.css` (Google Fonts), `colors.css` (light `:root`, dark `[data-theme="dark"]`, aliases), `theme-auto.css` (follow the host), `typography.css`, `spacing.css`, `base.css` (element defaults, keyframes, `data-size`), `classes.css` (the class layer).
- `reference/html-recipes.md` — markup for every component; `reference/tokens.md` — every variable with its value.
- `reference/blocks.html` — every content block in plain HTML, light and dark side by side.
- `templates/artifact.html` — plain-HTML starter with working theme, text-size and clock scripts.
- `components/<group>/` — React components (`.jsx`, `.d.ts`, `.prompt.md`) and one `*.card.html` demo per group.
- `guidelines/` — specimen cards: colors, type, spacing, elevation, brand.

## Open questions

- Fonts load from Google Fonts. An offline Claude Desktop artifact falls back to Arial Narrow / system-ui / Menlo; supply WOFF2 files to pin them.
- The gold-on-light contrast is carried by `--ej-gold-text` (#7a5c0e, 6.5:1 on the ground). Gold fills always take `--ej-on-gold` text. If a brighter gold text is wanted, it needs the dark ground.
- The brief allowed a louder "full HUD" register (frame brackets, scan sweep, signal meters). It is not in the system; the grid desk and hazard divider are the loudest elements kept.
