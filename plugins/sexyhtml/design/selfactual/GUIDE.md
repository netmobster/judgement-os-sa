# selfActual design system

selfActual is an "operator layer" for people who use AI: the profile, state, judgment and ledger that stay constant while models, tools, agents and infrastructure swap underneath. The tagline is the whole pitch: **Choose your AI. Keep yourself.** The product surface seen in the source is the *Insights* window (heartbeat, insight card, mirror of what the current AI has loaded, gated sections). The primary medium is the deck.

The system is precise, evidence-first and two-grounded: a near-white paper (`#fafaf7`) that carries the argument and a near-black ink (`#101418`) that carries the turns, with a blue accent that brightens to sky when it lands on ink. Caprasimo display headings over Figtree body, IBM Plex Mono for the machine's voice. Squared geometry — 16px and 28px radii, no pills. The defining rule is not visual: **every claim wears a tag saying how true it is.**

## Sources

- Attached codebase `selfactual-design-system/` (mounted read-only): a hand-authored CSS design system — `styles.css` (tokens + class layer), `theme.json`, `readme.md`, `foundations/*.html`, `components/*.html`, `templates/deck/Deck.dc.html`, `assets/selfactual-logo.png`. It was itself derived from *selfActual Keep Yourself Deck* (v4, 7 Sept 2026). No Figma, no product code, no font binaries were provided.
- selfactual.ai is referenced in the source as using a grotesk display face that differs from Caprasimo; that site was not available here.

Everything below is a faithful port of that source into compiler-readable form: tokens split into `tokens/`, the class layer kept verbatim, React components wrapping exactly the classes the source defines.

## Content fundamentals

- **Voice:** first-person plural for the company only when needed; mostly second person ("you", "yours", "your AI"). Declarative, short, matter-of-fact. No exclamation marks, no emoji, no marketing adjectives.
- **The two-clause headline:** a plain statement, then the turn, highlighted in accent. "Choose your AI. **Keep yourself.**" / "Every time your AI changes, **you start over.**" / "Export is a zip file. **This is a thing that's on.**" / "Swap any layer. **Only one has to stay.**"
- **Sentence case everywhere.** Kickers and labels are uppercase by CSS, not by typing: "02 · The problem", "Mirror · what this AI loaded". Middots (·) separate parts of a label; arrows (→) show change ("206→150", "ask → dispatch → work").
- **Honesty is the brand.** Numbers are small and specific ("7 of 7", "33 of 34 planted defects caught", "69/69 writes, 0 failures") and every number carries an evidence tag: `shipped`, `measured`, `building`, `hypothesis`. Hypotheses are stated as hypotheses: "Nobody has done it yet." "No test record exists." Figures are counts out of totals — "33 of 34", "14 of 35" — never a percentage and never a progress bar.
- **Product copy** (console) is terse and mono-keyed: `working-rhythm · Bursts, then long tails. Never schedule the tail. · core`; `finances · Gated — opens only on your spoken phrase · locked`. Insights are one sentence, then a button: "You moved **SA-212** to Monday in ChatGPT two minutes ago. Claude and the web already show it." → "Open the ledger" / "Undo".
- **Buttons** are verbs with objects: "Open the ledger", "Join the alpha", "Speak the phrase", "See the manifest". Cancel is "Cancel", undo is "Undo".
- **Speaker-note register:** "Say the line and stop." Nothing is padded.

## Visual foundations

- **Grounds:** two, alternating on purpose. Light (`--color-bg`) for argument and evidence; ink (`--color-ink`) for the cover, the turns and the close. Never gradient or blur between them — the hard cut is the point. Put `.on-ink` (or `<Ground ink>`) on a container and every token rebinds.
- **Color:** blue accent `#2563eb` (text at 700 `#1d4ed8`), cyan accent-2 `#06b6d4`. On ink they brighten to sky `#38bdf8` and cyan `#67e8f9`. 100–900 ramps share a lightness scale; 100–300 are tints, 600 base, 700–900 text on tints. Body copy on light is neutral-700, never full ink; body on ink is `--color-ink-muted`, never pure white. The console family (slate-teal `#18242a` with `#79b8d1`) means "this is a real screen" and is never decorative.
- **Type:** Caprasimo 400 for headings (line-height 1.04–1.06, -0.02em), Figtree 400/600/700 for body and controls (15px UI body, 14px controls, 13px card body, 11px uppercase labels at 0.08–0.14em), IBM Plex Mono for IDs, keys, clocks and the loop line — never prose. Slides use literal px at 1920×1080 with a hard 24px floor.
- **Spacing:** a true 4px scale (4/8/12/16/24/32). Slides pad 92px vertical, 116px horizontal, 70px column gap. Layouts are two-column and asymmetric: the headline holds the left 40–46%, evidence or the product window the right.
- **Radii:** 3px chips, 6px buttons/inputs/console, 16px rows and cards, 28px panels and quotes. Nothing rounder; no pills (the only 999px radius in the source is a skeleton bar inside a panel).
- **Borders:** hairlines at 14% ink (`--color-divider`); the console uses 1.5px hairlines in its own line color. Emphasis borders are 3px accent (`.card-focus`, `.stack-row-keep`) or a 4px left rule (`.rule-note`, console insight). Focus ring is 2px accent, offset 2px.
- **Shadows:** ink-tinted and shallow — sm 0 1px 2px / md 0 3px 10px / lg 0 12px 32px. Only the product window gets `--shadow-window` (0 30px 80px at 28%): it is the one thing on the page that is running. On ink, shadows drop and cards become `--color-ink-surface`.
- **Cards:** white, 16px radius, shadow-sm, 16px padding, kicker → Caprasimo title → 13px body. Certainty is carried by the ground: a real ledger row sits on white with a shadow, an unproven one sits flat on surface.
- **Backgrounds and imagery:** flat color only. No photos, no illustrations, no textures, no gradients (the wordmark PNG is the only gradient in the system). The only imagery is the product window itself.
- **Hover / press:** primary buttons step down the accent ramp (600 → 700 → 800); secondary and table rows tint with 6% / 12% ink; ghost tints accent-100 / 200. Disabled is 45% opacity. Inputs turn their border neutral-500 on hover and accent on focus. `::selection` is a 26% accent tint. No transforms, no shrink.
- **Animation:** none in the source. Decks cut between slides; nothing fades or bounces. If motion is needed, keep it to opacity and keep it short.
- **Transparency and blur:** the dialog backdrop is 55% ink, no blur. Nothing else is translucent.
- **Layout rules:** slides are a flex column — kicker row pinned top, folio (logo + number) pinned bottom, argument between. The wordmark sits top-left at 60px on ink covers and bottom-left at 34px on light slides.

## Iconography

- **Lucide** (https://lucide.dev) at stroke-width 2, inline SVG on `currentColor`, 20px in chrome and 15px inside buttons. The source inlines six glyphs: plus, chevron-right, square-minus, clock, lock, rotate-ccw. No icon font, no PNG icons. `guidelines/icons.html` links Lucide from unpkg; in code, inline the SVG or use `lucide-react`.
- Icons are interface chrome — they never decorate a statement. Slides carry no icons at all.
- **No emoji.** Unicode is used as typography, not iconography: middot (·) separates label parts, arrow (→) shows change, the console status dot is a CSS circle.
- **Logo:** `assets/selfactual-logo.png` (5592×1242, transparent, cyan→blue gradient wordmark) is the only mark supplied. No monochrome or icon-only variant exists; do not draw one.

## Evidence — the signature

| State | Means | Light | Ink |
| --- | --- | --- | --- |
| shipped | Exists and runs today | accent-2-700 | ink-accent-2 |
| measured | There is a number behind it | accent-700 | ink-muted |
| building | In flight, not landed | neutral-600 | ink-dim |
| hypothesis | A claim, honestly labelled | accent-700 | ink-accent |

`measured` and `hypothesis` share a hue on purpose: certainty is carried by the row's ground (white + shadow = real; flat surface = not yet), not by the tag. The ledger row (figure · claim · tag) is the unit of proof; the stack row (label · verb · items, closed by a `keep` row) is the argument shape.

## Components

Built from the source's exact inventory. Namespace: `window.SelfActualDesignSystem_f093ce`.

- `components/evidence/` — **EvidenceTag**, **EvidenceLegend**, **EvidenceRow**, **StackRow**, **Timeline** (dated rows, the current one on ink), **StepList** (numbered, tagged)
- `components/actions/` — **Button** (primary / secondary / ghost, iconOnly, block), **Tag** (accent / accent-2 / neutral / outline)
- `components/forms/` — **Field**, **Input** (multiline), **Radio**, **Segmented**
- `components/surfaces/` — **Card** (focus, ink), **Panel**, **RuleNote**, **Quote**, **Ground** (+ **Hl**), **Comparison** (before beside after), **QuestionPanel** (one decision), **Figure** (numbered frame, tagged caption)
- `components/navigation/` — **Nav**
- `components/data/` — **Table**, **Bars**, **LineChart**, **SmallMultiples** (+ **ChartHead**), **Flow**, **Layers**
- `components/overlay/` — **Dialog**
- `components/product/` — **Console** (+ **ConsoleLoop**)
- `components/slides/` — **Slide**

Intentional additions: `Ground`/`Hl` wrap the source's `.on-ink`/`.on-light`/`.hl` classes so React consumers don't reach for class names; `ConsoleLoop` wraps `.console-loop`. Added in Oct 2026, in the source's idiom: Timeline, StepList, Comparison, QuestionPanel, Figure, the three charts and the two diagrams, plus one class, `.turn` — the ink island with the 3px accent border (the `stack-row-keep` treatment, generalised) which flips to a paper island inside `.on-ink`. Every one of them carries evidence tags; figures are counts out of totals; none of them draws a progress bar or a percentage. Still not added: Toast, Avatar, Tabs, Tooltip.

## Do / Don't

Do: tag every claim; let the two grounds alternate; write headlines as two clauses with the turn in `.hl`; keep geometry square and decoration at zero; let small numbers look small; show a count out of a total, tagged.

Don't: round into pills; use the console palette as decoration; set prose in mono; drop slide text below 24px; gradient or soften the cut between grounds; put a claim on a slide you would not tag out loud; draw a progress bar or print a percentage.

## Index

- `styles.css` — the single entry; `@import`s everything in `tokens/`.
- `tokens/fonts.css` (Google Fonts import), `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` (space, radius, shadow, slide geometry), `tokens/base.css` (element defaults), `tokens/classes.css` (the class layer the components render).
- `assets/selfactual-logo.png` — the wordmark.
- `guidelines/` — 20 specimen cards: Colors (ground, accents, three ramps, ink, console, evidence), Type (heading, body, mono, slide scale), Spacing (scale, slide padding, radii, elevation), Brand (wordmark, two grounds, headline turn, icons).
- `components/<group>/` — the components above, each with `.jsx`, `.d.ts`, `.prompt.md`, and one `*.card.html` demo per group.
- `reference/html-recipes.md` — plain-HTML markup for every component, plus slide-scale overrides.
- `reference/tokens.md` — every CSS variable with its value.
- `reference/blocks.html` — the Oct 2026 additions in plain HTML, on paper and on ink.
- `templates/page.html`, `templates/deck.html` — plain-HTML starters.
- `examples/keep-yourself-deck/` — the v4 deck rebuilt from the React components as a click-through (README inside).
- `_ds_bundle.js` — browser bundle of the React components (`window.SelfActualDesignSystem_f093ce`).
- `adherence.oxlintrc.json` — lint config for production React.
- `SKILL.md` — agent-skill entry point.

## Open questions

- Caprasimo is the deck's display face and is chunkier than the grotesk on selfactual.ai. The source flags this as an open question; swapping `--font-heading` changes it everywhere.
- Fonts are served from Google Fonts because no binaries were supplied. Offline use needs the TTF/WOFF2 files.
- The only product view in the source is the Insights window as it appears on slide 05. No app shell, login, settings or marketing page exists to recreate.
