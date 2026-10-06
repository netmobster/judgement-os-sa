# House rules: every style follows these

Each style skill (`sa`, `seren`, `judgement-os`, `jay`) sets the *look*. This file sets the *rules*.
A style overrides the look, never these.

## Build

- **The artifact contract applies** (the `artifact-design` guidance): phone width, 16px
  gutters, Google Fonts as the only font host, no `alert`/`confirm`/`print`, a `<title>` that
  names the page in 2–4 words. **Themes:** design both light and dark through tokens,
  **except** a style that is one deliberate visual world. SA (paper and ink) and Judgement OS
  (room and dossier) are; they set every colour explicitly and skip the dark-mode blocks,
  which the contract allows for a committed single look.
- **Read the style's own files before writing a line of CSS.** Its tokens are the palette.
  Don't invent a second one.
- **Real content only.** No lorem ipsum, and no placeholder numbers posing as real.
- **Never render a score out of anything.** "4 to go" yes; "62%" and progress bars no. It
  applies to every page. Test counts read as "31 tests,
  all passing", not "31 of 31".
  **One exception: selfActual pages follow SA's guide** for evidence figures, so a result may be a
  count out of a total ("7 of 7"), always with its evidence tag (decided 2 Oct: SA's guide wins on SA pages).
  Progress bars and percentages stay out there too.
- **Interactive pages carry their own exit.** Pickers and checklists end in a **copy button**
  that produces plain text the user can paste back to Claude, with a select-all fallback.
- **A MultiChoice report** is findings with the user's decisions in them: the
  report first, then one question per decision (picks, the recommended one marked, and a text
  box), then the copy button. In ECHO-JAY, start from
  `design/echo-jay/templates/multichoice-report.html`. There's no SA or Seren template yet:
  build the same blocks in that system.
- **A MultiChoice report reports itself** where the account allows it: published with
  `capabilities: {db: {}, user: {}}`, its answers save into the page (`answers/<reader id>--<data-key>`, one document per page key,
  so a page republished with a new `data-key` starts clean) and Claude reads them back with `ArtifactData`. One write per pause, never on load. The copy button stays.
- **Charts:** load `dataviz`. **Diagrams:** `artifact-diagramming`.

## Check once

- Serve it locally and look **once** at desktop and phone width (375px). Look for console
  errors, sideways scroll (`scrollWidth > clientWidth`) and fonts that didn't load
  (`document.fonts.check`).
- An artifact page has no `<!DOCTYPE>`/`<html>`/`<head>`/`<body>`. For a local look, wrap it in
  a doctype once, or it renders in quirks mode.
- If the look finds something, fix it in **one pass** and ship. No loops.

## Ship

- **A page the user keeps or shares** → publish with the `Artifact` tool and give them the link.
  Supporting files (a stylesheet, tokens, a logo) go up through `files`, staged under the
  scratchpad with `root` set to that folder. Files outside the working directory or the
  scratchpad are refused.
- **A one-off working page** (a picker, a test) → write the file, look once, send it with
  `SendUserFile`.
