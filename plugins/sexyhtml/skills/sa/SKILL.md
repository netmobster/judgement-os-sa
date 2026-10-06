---
name: sa
description: Make anything selfActual-branded in the selfActual design system, such as pages, reports, 1920×1080 slide decks, mocks, prototypes, one-off assets or production UI. Use whenever a page, artifact, report or deck is about SelfActual, Imprint, Insights, Talia, Atlas, the vault or SUMMIT, or when the user says SA style, "Choose your AI. Keep yourself.", evidence tags (shipped / measured / building / hypothesis) or paper and ink.
argument-hint: "<what the page is>"
---

# /sexyhtml:sa: the selfActual design system

Requested: **$ARGUMENTS**

**Every selfActual artifact looks like this.** The design system came from Claude
Design as a complete package and lives at **`${CLAUDE_PLUGIN_ROOT}/design/selfactual/`**.

## Do this

1. **Read `${CLAUDE_PLUGIN_ROOT}/design/selfactual/SKILL.md` and follow it exactly.** It's the
   design system's own instructions. Its relative paths (`GUIDE.md`, `reference/html-recipes.md`,
   `templates/`, `styles.css`, `tokens/`, `assets/`) are all inside `design/selfactual/`.
2. **Start from a template:** `templates/page.html` for a page or a report, `templates/deck.html`
   for slides. The worked example of a deck is `examples/keep-yourself-deck/`.
3. Follow `${CLAUDE_PLUGIN_ROOT}/reference/house-rules.md` for the check and the ship. Copy
   `styles.css`, `tokens/` and `assets/` beside the page, and publish them through `files`.

## Two gaps the class layer leaves (found on the first build)

1. **Stack-row items never wrap** (`white-space: nowrap`, so each chip stays whole). A sentence
   in a `.stack-row-keep` runs off the page. Add
   `.stack-row-keep .stack-row-items > span { white-space: normal; }`.
2. **Ledger and stack rows have fixed grids** that crush at phone width. Under 600px use
   `.ev-row { grid-template-columns: 72px minmax(0,1fr) }` with the tag moved under the claim
   (`grid-column: 2; justify-self: start`), and stack rows in one column.

Use `>` in any selector on `.stack-row-items span`. The evidence tags inside are spans too.

## The signature, so it's never skipped

**Every claim wears an evidence tag:** `shipped` · `measured` · `building` · `hypothesis`.
Real rows sit on white with a shadow; unproven rows sit flat (`ev-row-open`). A claim you
wouldn't tag out loud doesn't go on the page. Headlines turn: a plain statement, then the turn
in `.hl`.

**Figures follow SA's guide here, not the house no-scores rule:** a result may be a count out of a
total ("7 of 7", "33 of 34 planted defects caught"), always with its evidence tag. No progress bars,
no percentages.
