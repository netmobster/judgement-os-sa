# Decks in your look

A deck is the Slides type, styled by the house design system its subject calls for: **the same rule as
a page** (Jay, 2 Oct: "Yes, decks pick their look like pages"). Your own work comes out in ECHO-JAY,
selfActual work in the selfActual system,
games in Seren, and a style the user names always wins.

## 1. The look: the same marked decision as a page

1. **Pick the style the way `/sexyhtml` §1 does, the style half only** (point `sexyhtml.style`; a deck
   has no shape). Its rule is `style-pick.js`:
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/find-plugin.js" sexyhtml scripts/style-pick.js` prints its folder.
   Write the request, run the rule, open the call, ask the judges only when the rule says so, close the
   call: exactly as that section says. **sexyhtml not found:** the style is `jay`.
2. **The style names the system:**

   | Style | The design system (its title in the listing) |
   |---|---|
   | `jay` | ECHO-JAY |
   | `sa` | selfActual |
   | `seren` | Seren |
   | `judgement-os` | none yet: ask in one line, ECHO-JAY or the deck's own look |

3. **Find it:** `Artifact` `list` with `type: "Design System"`, and take the row with that title.
   Not listed: say so, and build in that style's look from the sexyhtml package instead (no install).

   **The rule decides, not claude.ai's default design system.** The quickstart attaches the account's
   default when one is set; when it differs from the rule's pick, use the rule's.

## 2. The deck

1. `quickstart` with intent `slides`, then publish with the Slides `type_url`, a `title` and
   `auto_open: "after_first_write"`, no files.
2. Follow the type's instructions with the system from §1: read its `project/README.md` and
   `project/tokens.json`, install it (its `designSystems` record and its `tokens.json`, in the same call
   as the slides), and name its faces from Google Fonts (none of the three ships font files).
3. Write the slides in the system's look (§3). Real content only: a figure or a quote the user didn't
   give is a bracketed placeholder, listed in the reply.
4. Give the link. The type asks for no read-back or render; the user checks the deck.

## 3. Each system, on a slide

The slide format is inline styles from a closed subset: hex colours, no `var()`, no `clip-path`, and
24px is the smallest text. Each look, translated:

**ECHO-JAY.**
- Ground `#eef2f6`, surfaces `#ffffff`, text `#0f1720`, muted `#4f6076`, labels `#627186`, lines `#c8d3de`.
- Gold `#c9a227`, with `#1a1300` on it and `#7a5c0e` as text. Steel `#3f6b96`, `#2b5276` as text, its tint `#e1ebf5`.
- The statement slide sits on the dark ground: `#0d1319`, surfaces `#131b24`, text `#e7edf3`, gold `#e2b93b`, steel `#6f9fd0`.
- Barlow Condensed 600 for titles and figures. The nameplate is Barlow Condensed 700, uppercase and spaced.
  Source Sans 3 for everything read; Share Tech Mono for labels, uppercase and spaced.
- Every slide carries the nameplate and a numbered label top-left (`03 // What changed`), and a mono
  footer row at `bottom:64px`.
- The package has the slide scale (`ej-slide` in sexyhtml's `design/echo-jay`, 3 Oct): titles 84px (64px
  when long), body 30px, mono 24px, 96px either side and 56px above. Its blocks show what a stat row, a
  timeline or a callout looks like at that size.
- Corners are square (the format can't cut chamfers). A panel is white with a 1px line and the raised
  shadow; the one panel that matters gets gold corner brackets. One gold thing per slide, and counts,
  never a score.

**selfActual.**
- Its package has the slide scale and a deck template (`design/selfactual/templates/deck.html` in
  sexyhtml): follow them.
- Paper `#fafaf7` argues and ink `#101418` turns, with a hard cut between them.
- Caprasimo heads, Figtree reads, IBM Plex Mono is the machine's voice. 92px above and below, 116px either side.
- Headlines in two clauses, the turn in `#1d4ed8` (sky `#38bdf8` on ink).
- Every claim wears its evidence tag. Figures follow SA's guide: "7 of 7" is fine there.
- The wordmark sits bottom-left at 34px on light slides, top-left at 60px on ink covers.

**Seren.**
- Ink `#100d0b` on every slide: one committed dark look. Raised panels `#141110`.
- Bone `#e8e1d6` for text and `#a39a8f` for body. Copper `#b07a4e` is the one accent (`#c89060` as text),
  verdigris `#7f9b8c` is live or a pass, oxblood `#c26b5d` a fail.
- IBM Plex Serif 300 display, tightly tracked; IBM Plex Sans 300 body; Space Mono labels, uppercase and spaced.
- Hairlines at 16% bone instead of shadows, 2px corners. A record shows its working: the die, the
  modifiers, the total, the DC, the outcome.

*Item 8 of the MAKE build (2 Oct, CC-71). The first deck made this way: The MAKE build, in ECHO-JAY.*
