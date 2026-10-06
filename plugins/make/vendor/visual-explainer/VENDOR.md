# Vendored: visual-explainer

- **Source:** https://github.com/nicobailon/visual-explainer
- **Pinned:** `5846f5aef34a23c8fea389d2f23ce56224cbf840` (2 Oct 2026, "fix: keep sources visible and hide the
  narrow nav scrollbar (#106)"), skill version 0.12.0
- **Licence:** MIT, Copyright (c) 2025 Nico Bailon. The full text is `LICENSE` beside this file and travels
  with every copy.
- **Vendored:** 2 Oct 2026 (CC-71), MAKE item 6. Jay's rule: open source first, restyle after.

## What came across, unchanged

| File | Use |
|---|---|
| `commands/diff-review.md` | The diff review recipe: what to gather, the typical sections, the colours |
| `commands/plan-review.md` | The plan review recipe |
| `commands/project-recap.md` | The project recap recipe |
| `commands/fact-check.md` | The fact-check recipe |
| `references/diagrams.md` | How to hand-draw the SVG figures: grid, shapes, edge language, before/after, small multiples |
| `SKILL.upstream.md` | The upstream skill, kept for its rules: show don't tell, words, known traps, before delivery |

## What we change (in `../../pages/explainers.md`, never in these files)

- **The look** is the house style through `/sexyhtml`, not upstream's registers and fonts.
- **Delivery** is a private artifact link, not a file in `~/.agent/diagrams/`.
- **Never a score:** no waffle, no "N of 100", no percentages. Counts only.
- **Left out:** quick mode, the Pi and MCP paths, slides and PPTX (the Slides type and the `pptx` skill do
  those here), animation and video, generated images.

To update: re-clone at a newer commit, read the diff, copy the same files, and change the pin above.
