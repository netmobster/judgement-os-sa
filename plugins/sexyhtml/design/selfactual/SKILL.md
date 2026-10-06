---
name: selfactual-design
description: Generate HTML in the selfActual design system — pages, 1920×1080 slide decks, mocks, prototypes and one-off assets — or write production UI that matches the selfActual brand. Use whenever the user asks for anything selfActual-branded, mentions "Choose your AI. Keep yourself.", evidence tags (shipped / measured / building / hypothesis), or the paper-and-ink two-ground look.
user-invocable: true
---

# selfActual design — HTML generation

> **Where the files are:** everything this skill names (`GUIDE.md`, `reference/`, `templates/`, `styles.css`, `tokens/`, `assets/`, `components/`) lives in `${CLAUDE_PLUGIN_ROOT}/design/selfactual/`. Copy what a page needs from there. *(Installed into Judgement OS `sexyhtml`, as `/sexyhtml:sa`, on 1 Oct 2026 from Claude Design's "Design System Skill Package". It is SA's brand: SA-facing pages only.)* *The 3 Oct components (Timeline, StepList, Comparison, QuestionPanel, Figure, Bars, LineChart, SmallMultiples, Flow, Layers) are in the class layer and `reference/blocks.html`, but not yet in `_ds_bundle.js`, which was compiled before them: build them from the plain-HTML recipes until a fresh export carries them.*

selfActual is an operator layer for people who use AI: profile, state, judgment and ledger stay constant while models, tools, agents and infrastructure swap underneath. Tagline: **Choose your AI. Keep yourself.** The system is precise, evidence-first and two-grounded. Its defining rule is not visual: **every claim wears a tag saying how true it is.**

## Before you build
1. Read `GUIDE.md` once per session: voice, foundations, the evidence vocabulary, do/don't.
2. Read `reference/html-recipes.md`: exact markup for every component. The class layer in `tokens/classes.css` *is* the component library; there is no build step.
3. Start from a template: `templates/page.html` (pages, mocks, prototypes) or `templates/deck.html` (slides). Copy it beside your output and edit; fix the two relative paths (`../styles.css`, `../assets/`) if the file moves.

## Setup for any HTML output
Copy `styles.css`, `tokens/` and `assets/` next to the file (or reference them by relative path) and link one stylesheet:

```html
<link rel="stylesheet" href="styles.css">
```

Fonts (Caprasimo, Figtree, IBM Plex Mono) load from Google Fonts via `tokens/fonts.css`. Nothing else needs a network.

## Three ways to use it
- **Plain HTML + classes (default).** `<button class="btn btn-primary">`, `<div class="ev-row">`, `<section class="slide slide-ink">`. Use for slides, mocks, one-pagers, static prototypes, print.
- **React in the browser, no build.** Load React 18 + Babel standalone from unpkg, then `_ds_bundle.js`; components live on `window.SelfActualDesignSystem_f093ce` (`Button`, `Card`, `EvidenceRow`, `StackRow`, `Timeline`, `StepList`, `Comparison`, `QuestionPanel`, `Figure`, `Bars`, `LineChart`, `SmallMultiples`, `Flow`, `Layers`, `Console`, `Slide`, `Hl`, …). See `examples/keep-yourself-deck/index.html` or any `components/*/*.card.html`. Use for interactive prototypes.
- **Production React.** Copy `components/<group>/*.jsx` (+ `.d.ts`) and `styles.css` into the codebase; each component renders exactly the classes in `classes.css`. `adherence.oxlintrc.json` flags raw hex, raw px, off-brand fonts and unknown props.

## Hard rules
- **Two grounds, hard cut.** Light `--color-bg` (#fafaf7) carries the argument; ink `--color-ink` (#101418) carries the cover, the turn and the close. Put `.on-ink` on a container and every token rebinds. Never a gradient, blur or soft edge between them.
- **Tag every claim.** `shipped` / `measured` / `building` / `hypothesis` as `<span class="ev ev-…">`. A real ledger row sits on white with a shadow; a hypothesis sits flat (`ev-row-open`). A claim you would not tag out loud does not go on the page.
- **Figures are counts.** "7 of 7", "33 of 34", "14 of 35" — a count out of a total, always tagged. Never a percentage, never a progress bar. `chart-head`, `fig-caption`, `tl-row`, `step` and `qp-option` all have a place for the tag; use it.
- **Headlines turn.** A plain statement, then the turn in `<span class="hl">`: "Choose your AI. **Keep yourself.**"
- **Type.** Caprasimo for headings only. Figtree for everything you read. IBM Plex Mono only for the machine's voice (IDs, keys, clocks, the loop line), never prose. Body on light is `--color-neutral-700`, never full ink; body on ink is `--color-ink-muted`, never pure white.
- **Geometry.** Radii 3 / 6 / 16 / 28px. No pills. 4px spacing scale. Hairlines at `--color-divider`; emphasis is a 3px accent border or a 4px left rule. Shadows shallow and ink-tinted; only the console window gets `--shadow-window`.
- **Nothing decorative.** No photos, illustrations, textures, gradients (the wordmark PNG is the only gradient), no icons on slides, no emoji. Lucide icons at stroke 2 in UI chrome only. The console palette means "a real screen is running" and is never used as decoration.
- **Slides.** 1920×1080. 92px vertical / 116px horizontal padding, 70px column gap. 24px text floor, no exceptions. Kicker row top, folio (wordmark + number) bottom, argument between. Two columns, asymmetric: headline left 40–46%.
- **Copy.** Sentence case (uppercase comes from CSS). Short, declarative, second person. Middot · between label parts, → for change. Buttons are verbs with objects: "Open the ledger". No exclamation marks, no marketing adjectives. Small numbers, stated exactly.
- **Tokens, not literals.** Colors via `var(--color-*)`, spacing via `var(--space-*)`, radii via `var(--radius-*)`. Literal px only on slides (the slide scale is literal px by design) and where a recipe says so.
- **Motion.** None by default; decks cut. If unavoidable, opacity only and short.

## Review before you hand over
- Every number and claim carries an evidence tag; every figure is a count out of a total — no %, no progress bar.
- Where the piece has a turn, both grounds appear and the cut is hard.
- No radius above 28px, no pill, no gradient, no icon on a slide, no emoji.
- Headings Caprasimo, body Figtree, mono only on machine text.
- Slide text ≥ 24px. UI body 15px, controls 14px, labels 11px uppercase.
- Wordmark used as supplied (`assets/selfactual-logo.png`), never redrawn, recolored or cropped.

## Files
- `GUIDE.md` — the full guide: voice, foundations, evidence, components, do/don't.
- `styles.css` → `tokens/` — fonts, colors, typography, spacing, base element styles, `classes.css` (the component layer).
- `reference/html-recipes.md` — plain-HTML markup for every component, plus slide-scale overrides.
- `reference/tokens.md` — every CSS variable with its value.
- `reference/blocks.html` — Timeline, StepList, Comparison, QuestionPanel, Figure, charts and diagrams in plain HTML, on paper and on ink.
- `templates/page.html`, `templates/deck.html` — plain-HTML starters (open in a browser as-is).
- `assets/selfactual-logo.png` — the only mark (5592×1242, transparent).
- `components/<group>/` — React source (`.jsx`, `.d.ts`, `.prompt.md`) and one `*.card.html` demo per group.
- `_ds_bundle.js` — browser bundle of the React components (`window.SelfActualDesignSystem_f093ce`).
- `examples/keep-yourself-deck/` — the six-slide v4 deck as a click-through, built from the React components.
- `guidelines/` — 20 specimen cards (open in a browser): colors, type, spacing, brand.
- `adherence.oxlintrc.json` — lint config for production React.
