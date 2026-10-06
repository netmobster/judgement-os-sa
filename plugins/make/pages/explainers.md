# Explainers: reviews and recaps as pages, in the house style

Four pages from visual-explainer (vendored, MIT: `../vendor/visual-explainer/VENDOR.md`), restyled.
Each skill names its recipe; this file says what every one of them keeps and what it changes.

| Skill | Recipe | Makes |
|---|---|---|
| `/make:diff-review` | `commands/diff-review.md` | A verdict on a branch, commit, range or the working tree, with the evidence |
| `/make:plan-review` | `commands/plan-review.md` | A plan read against the real code: what's right, stale, risky or missing |
| `/make:project-recap` | `commands/project-recap.md` | The project for someone coming back to it |
| `/make:fact-check` | `commands/fact-check.md` | Every checkable claim on a page, checked and fixed in place |

## Keep, from upstream

1. **The recipe**: read it first. It says what to gather and the typical sections; merge, reorder or
   drop sections to fit the content.
2. **Gather before you draw.** Every claim cites a path, a `file:line`, or command output. Never invent a
   reason, a momentum or a risk.
3. **Show, don't tell** (upstream skill, that section): one claim per figure with a one-sentence caption;
   the first screen is the answer; draw the mechanism, not the name; label edges with verbs; cases as
   small multiples. How to draw them: `references/diagrams.md`.
4. **Words** (that section): the answer first; headings state the takeaway; short sentences; one term
   per concept.
5. **Known traps** (that section): `min-width: 0`, wide things in their own scroll box, reduced motion.

## Change, for the house

1. **Build it through `/sexyhtml`** with the same request. Its rules pick the style (ECHO-JAY by default).
   The selfActual system is for the SA repos: the subject decides.
   The shape is `report`, or a MultiChoice report when the page ends in the user's decisions (a plan
   review's approve, revise or reject is one).
2. **Colours map to the style's tokens.** In ECHO-JAY: removed or before is `--ej-alert`; added or after
   is `--ej-ok`; a risk is gold (one gold thing per block); context is steel. Chips are `ej-tag`s.
3. **Never a score.** No waffle, no "N of 100", no percentages, no progress bars: counts and bars of
   counts only (upstream's waffle charts are out).
4. **Deliver as a private artifact** and give the link. A quick private look can go in the side panel.
5. **A fact-check fixes the page where it lives**: republish an artifact to its own URL, or edit the
   local file, and add the verification strip upstream describes.
