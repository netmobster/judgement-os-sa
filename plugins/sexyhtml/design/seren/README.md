Seren is the house style for gaming, geek and tabletop pages, taken from the SEREN AI website: a solo tabletop game in which an AI runs the world as the Dungeon Master. The mood is a lamp-lit map table: an ink ground, bone text, one copper accent, and verdigris for anything live. Quiet, literate, a little arcane. It is one committed dark look; there is no light theme.

## Content fundamentals

- **Voice:** declarative and plain. Second person to the player ("You bring one character. It brings everyone else."), third person for the system ("SEREN doesn't execute a campaign. It runs one."). Wry, never cute. No exclamation marks, no emoji.
- **Headlines in two beats:** a statement, then its turn, often across a line break, the turn in italic copper-hi on the hero: "The world knows / *what happened.*", "You built the world. / Now let it live.", "AI can generate anything." then "That's not the hard part."
- **Eyebrows** name the section in a few words, written in sentence case and set in capitals by CSS: "The difference", "The rest of the party", "Off script", "What you are looking at".
- **A record, not a pitch.** Show what happened, with the numbers, failures first when there are failures: "Two rolls were narrated to the player and never written down." Counts are plain figures with a label under each ("18 ledger entries", "2 rolls it lost"). Counts only: no percentages, no scores, no progress bars.
- **Tabletop terms, exactly.** A roll prints its working and its outcome: "d20 8 +1 wis +2 prof = 11 vs DC 13 · Failed".
- **Quotes say who.** A spoken line cites its speaker under it in mono ("Grumble, companion, run by the DM"). The player's own turns are shown verbatim.
- **The files keep the numbers honest.** File names, keys and raw ledger lines are set in mono: `ledger.jsonl`, `"t": "cast"`.

## Visual foundations

- **Ground:** `ink` under everything; `ink-raised` for panels and card rows, `ink-deep` for alternating bands. Bands are divided by a `hair` rule.
- **Text:** `bone` for primary text and headings, `dust` for long body copy and labels, `dust-hi` for chips and table cells.
- **Colour has meaning.** `copper` is the one accent: rules, focus rings, `::selection` (copper on ink) and the border on the thing that matters. `copper-hi` is copper as text: eyebrows and links. `verdigris` means live, or "it held": the pulsing dot, a pass, the player's own turn. `oxblood` means it failed or was lost. Nothing else gets a colour.
- **Type:** IBM Plex Sans at weight 300, line height 1.6 to 1.7, for everything read. IBM Plex Serif at 300 for display: large, tightly tracked (−0.026 to −0.032em) and set close (0.94 to 1.06). Space Mono, uppercase and letter-spaced (0.16 to 0.24em), for labels, eyebrows, the wordmark and anything a machine wrote.
- **Lines, not shadows:** `hair` (9% bone) between bands and rows, `edge` (16%) around chips, buttons, rolls and tables, `edge-soft` (22%) for a stronger frame. There are no shadows.
- **Geometry:** `radius` (2px) on everything boxed; the only circles are the live dot and the orbit mark. The page `gutter` is 44px (24px under 900px wide); sections are bands with `band` (112px) above and below.
- **Links** are bold copper-hi, underlined in copper at 55%, turning bone on hover. Things that are buttons are not underlined.
- **Motion** is slow and rare: the live dot pulses (`srPulse`, 3.4s) and the orbit turns once every 72 to 88 seconds. Under reduced motion, everything holds still.

## Iconography

- **No icon set and no emoji.** The site draws a handful of inline SVG figures and nothing else.
- **The mark is an orbit:** a copper core, a dashed copper orbit with one satellite, inside a faint bone ring (`assets/Logos/`). In the header it sits at 22px beside the wordmark, "Seren AI" in Space Mono at 0.24em; on the hero it is 188px and turns slowly. It is drawn for the ink ground: its outer ring is bone at 16 to 22%.
- **Figures** are hairline drawings in the same palette: a row of dots on rules for a script, three crossing curves (copper, verdigris, bone) for a world that answers back.

## Components

Each component is a static rendition of a pattern in seren.css, which `components/bundle.css` carries whole. They are classes, not a React library: copy the markup.

- **Type:** Eyebrow · Labels · Wordmark
- **Actions:** NavButtons · Subnav · Chips · HowCards
- **Record**, the playtest page's vocabulary: Numbers · Roll · Said · PlayerTurn · Dice · Ledger · Failure
- **Data:** RecordTable · FileTable
- **Status:** LiveDot · StatusTags
- **Blocks**, added 3 Oct 2026 and prefixed `sr-`: Callout · Timeline · StepList · Comparison · QuestionPanel · Figure · Charts · Drawings · SlideFrame. The same rules: hairlines not shadows, 2px corners, copper the one accent, verdigris live or held, oxblood failed or lost, counts only. All of them render together in `reference/blocks.html`.

## Not synced

- **Fonts** are hosted by Google Fonts, as on the site (`components/bundle.css` imports the site's own link); there are no font files.
- **Named here, literals in seren.css:** `ink-raised`, `ink-deep`, `band` and `radius`. The blocks added on 3 Oct 2026 read the variables, and keep the slide at literal px (1920×1080, 24px floor) as the site keeps its own.
- **Not carried as tokens:** the site's other bone and copper tints (fills and rules between 3% and 55%), which stay as written in `components/bundle.css`, and its `clamp()` sizes, which the type styles record at their largest.
- **No light theme and no shadows,** by design.

## This folder

The Seren package for `/sexyhtml:seren`: the design system first published on 2 Oct 2026 (built from the SEREN AI website), with the ten blocks Claude Design added on 3 Oct, exported 4 Oct. It is the source for the Seren Design System artifact (`scripts/design-systems/seren.js`). The player's own turn is `.pt-player` here (the site names that class after its first player).

- `tokens.json`: every colour, type style, spacing step and radius, each with its usage note.
- `styles.css`: the whole look in one stylesheet: the tokens as CSS variables, then the class layer.
- `components/<Name>/`: 27 components, each a `preview.html` (open it in a browser) and a `README.md` (what it is for, its markup, its props as modifier classes).
- `components/bundle.css`: the class layer the READMEs name; it imports `styles.css`.
- `reference/blocks.html`: the ten blocks added on 3 Oct 2026, in plain HTML on one page.
- `assets/`: the two marks, `seren-mark.svg` and `seren-orbit.svg`.
