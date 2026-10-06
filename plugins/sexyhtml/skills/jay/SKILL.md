---
name: jay
description: Make an HTML page in ECHO-JAY, the default house style (light, industrial, gold and steel blue, chamfered corners, built for the ~500px Claude sidebar) for drafts and posts, reports, points of view, status boards and architecture notes. Use when the user says my style, my design system, ECHO-JAY, the ECHO look or Jay style, or asks for a page for themselves with no other style named.
argument-hint: "<what the page is>"
---

# /sexyhtml:jay: ECHO-JAY, the default house style

Requested: **$ARGUMENTS**

ECHO-JAY came from Claude Design as a complete package (1 Oct 2026), made for Jay Wright's own
pages. It lives at **`${CLAUDE_PLUGIN_ROOT}/design/echo-jay/`**.

## Do this

1. **Read `${CLAUDE_PLUGIN_ROOT}/design/echo-jay/SKILL.md` and follow it exactly.** It's the
   design system's own instructions. Its relative paths (`README.md`,
   `reference/html-recipes.md`, `templates/artifact.html`, `styles.css`, `tokens/`) are all
   inside `design/echo-jay/`.
2. **Start from `templates/artifact.html`.**
   - Copy it beside the output, with `styles.css` and `tokens/`.
   - Change its stylesheet link from `../styles.css` to `styles.css`.
   - Keep its structure (header, readout, title block, footer) and both of its scripts: theme
     and text size, and the clock.
   - **The nameplate reads `FOR <NAME>`**: who the page is for. By default the operator:
     `node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints `operator`, and with none set it's
     `FOR YOU`. A page made for someone else names them (`FOR SAM`). Write it in sentence case
     (`For Sam`); the CSS sets the capitals.
   - **Replace every piece of slot text**: "01 // Label", "Title", "Byline", "YYYY.MM.DD", the
     footer and every block's. None of it ships as written.
   - **A MultiChoice report** (findings with the user's decisions in them) starts from
     `templates/multichoice-report.html` instead. It has the same header and scripts, plus the
     question panels and the copy-back script. Its comment block lists what each question
     needs, and `data-key` on `.ej-shell` must be new for every page.
   - **A MultiChoice report reports itself.** Publish it with `capabilities: {db: {}, user: {}}`: each
     reader's picks save into the page as they go, at `answers/<their id>`, and Claude reads them with
     `ArtifactData` (`list` on the `answers` collection) when the user says they've answered. The copy
     button stays as the fallback.
3. **Check and ship** by `${CLAUDE_PLUGIN_ROOT}/reference/house-rules.md`. Publish `styles.css`
   and `tokens/` through `files`.

## The house rules sit on top of the package

- **No scores, ever.** No score out of anything, and no progress bars, on any page (the house
  rules). Write counts ("4 to go"), never fractions or percentages. If the user asks for one by
  name, they're overruling the rule for that page. Do it, once.
- **The package prescribes no content.** Claude Design first read a sample post as rules.
  On 1 Oct the sample was stripped out (`ej-progress`, the score figures, the morning-start
  copy and the three sample artifacts all went), so every word on a page is the page's own.
- **selfActual work stays selfActual.** Anything about selfActual uses `/sexyhtml:sa`. The subject
  decides, not the folder (the router's rule).
- **Granular lists beat executive summaries.** Deadpan, not cute.

## Check before shipping (the package's list, short)

- The header has the nameplate, a numbered label, A−/A+ and DARK/LIGHT, and a readout. The
  footer is there.
- One gold thing per block. Gold text uses `--ej-gold-text`.
- No `border-radius`, no second accent colour, no emoji, no logo, nothing under 11px.
- Toggle light and dark once. Text size and theme both persist.
- 500px is the design width. Check phone width too.
