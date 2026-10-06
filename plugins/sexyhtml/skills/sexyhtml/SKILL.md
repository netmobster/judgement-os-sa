---
name: sexyhtml
description: Make a beautiful, finished HTML page (one-pager, explainer, report, MultiChoice report, picker, landing page or checklist) in one of the house styles. Use when the user says sexy html, "show me sexy html of…", a MultiChoice report, make this pretty, or make a page. It picks the style (ECHO-JAY by default, Seren for gaming, and a work style where this install has one) and the shape (a MultiChoice report when the page carries the user's decisions), with the Judgement OS weighing in when either is unclear; a named style goes straight to that style's skill.
argument-hint: "[style] <what the page is> [judge it]"
---

# /sexyhtml: the router

Requested: **$ARGUMENTS**

Pick a style and a shape (§1), then **run that style's skill** with the same request and the shape.
If the Skill tool can't reach it in this session, read `${CLAUDE_PLUGIN_ROOT}/skills/<style>/SKILL.md`
and follow it exactly.

| Style | Command | For |
|---|---|---|
| `jay` | `/sexyhtml:jay` | The default: **ECHO-JAY**, light industrial, gold and steel blue, the ~500px sidebar |
| `sa` | `/sexyhtml:sa` | selfActual work: the selfActual design system (paper and ink, evidence tags, Caprasimo/Figtree) |
| `seren` | `/sexyhtml:seren` | Gaming, geek and tabletop: ink, bone, copper, verdigris, Plex |
| `judgement-os` | `/sexyhtml:judgement-os` | Judgement OS's own pages: the lamp-lit room, then the paper dossier |

## The rule

**ECHO-JAY (`jay`) is the default. Seren for gaming and geek pages.**

- **Work → `sa`.** Anything about selfActual or its products (Imprint, Insights, Talia, Atlas,
  the vault, SUMMIT) or a selfActual customer. **The subject decides, not the folder.**
- **Gaming, geek or tabletop → `seren`.** D&D and tabletop, games, anything nerdy.
- **Everything else → `jay` (ECHO-JAY).** The user's own pages, notes, drafts and posts,
  status boards.
- **`judgement-os` only by name**, or when updating a page already in that brand.
- **A named style always wins.**

## 1. Two marked decisions in the Judgement OS: style and shape

Both rules are code: `style-pick.js` and `shape-pick.js`. The Second Opinion is asked **only**
when a rule can't tell (style: the request reads two ways at once; shape: two shapes fit), or
when the user says "judge it". **Everything is logged**, so the log can say whether the judges
ever earn their keep here. **Any failure in this section falls back to the rules' picks**: the
judgement layer never stops a page.

1. **The request.** Write the user's words, verbatim, to `<scratchpad>/sexyhtml-request.txt` with
   the `Write` tool. If they asked to "judge it", add `--anyway` to both rules. Then count what the
   page will carry: the **open decisions** for the user, and the **steps** for them to do.
2. **The rules.**
   - `node "${CLAUDE_PLUGIN_ROOT}/scripts/style-pick.js" --request <that file> [--anyway] > <scratchpad>/sexyhtml-decision.json`
   - `node "${CLAUDE_PLUGIN_ROOT}/scripts/shape-pick.js" --request <that file> --decisions <n> --steps <n> [--anyway] > <scratchpad>/sexyhtml-shape.json`

   Each gives `default` (the rule's pick), `named`, `consult` and, when consulting, `question`.
   A page with two or more of the user's decisions in it is a `multichoice-report`.
3. **The Judgement OS** lives in the labs plugin. Find it with
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/find-plugin.js" labs scripts/record.js`, which prints the
   folder (`$LABS` below; write the path out, since shell variables don't carry over).
   - **Not found** (labs isn't installed): use both rules' picks and skip to §2. Don't log.
4. **Open both calls.**
   - `node "$LABS/record.js" open --decision <style file> --run live --point sexyhtml.style --prefix style`
   - `node "$LABS/record.js" open --decision <shape file> --run live --point sexyhtml.shape --prefix shape`

   Each prints its call id, `consult` and, when consulting, the two `judges`.
5. **Neither consults:** the rules' picks it is. Close both calls (step 8) with
   `--settled-by named` where the user named it, otherwise `--settled-by rule`. Go to §2.
6. **Either consults: two judges per consulting decision, one wait.** In **one message**, make
   two Agent calls per consulting decision, all in the foreground: `subagent_type: "labs:second-opinion"`,
   `model:` set to `judges.small.model` for one and `judges.big.model` for the other, with the prompt
   set to that decision's `question`, word for word. (Style and shape both consulting is four
   calls, still one wait.) Record each answer, never through the shell: `Write` it to
   `<scratchpad>/sexyhtml-answer-<style|shape>-<small|big>.txt` and run
   `node "$LABS/record.js" verdict --call <id> --run live --model <that judge's model> --role <small|big> --point <sexyhtml.style|sexyhtml.shape> --ms <duration> --file <that file>`.
   Then, per consulting call, `node "$LABS/record.js" combine --call <id>`: it prints `show` and,
   when it's true, the leading judge's `verdict`, `confidence`, `why` and `suggestion`, plus
   `other` (the second judge's different suggestion, when there is one). **`show: false`:** that
   rule's pick stands, with `--settled-by rule`. An invalid or late answer counts as no answer.
7. **The user settles any real disagreement.** Only a call `combine` shows reaches them (by
   default, both judges disagree, each at medium or high confidence), in **one** `AskUserQuestion`
   (two questions if both decisions need them):
   - **challenge:** "{Style|Shape}: the rule says {default}; the judges say {suggestion}
     ({confidence}). {why}". Options: `{suggestion}` · `{other}` (only when there is one) · `{default}`.
   - **clarify:** the question is `why`. Options: `{default}` · `{suggestion}`, or, with no
     suggestion, `jay` for style and `report` for shape.
   - **redirect:** "{why}". Options: `Make the page anyway ({default})` · `{suggestion}`.
   - `show: false`: nothing is shown. The rule's pick stands.
8. **Close both calls.** `node "$LABS/record.js" close --call <id> --final <what was used, or the redirect taken> --settled-by <user|rule|named>`,
   adding `--shown` for any call step 7 asked about. Say nothing about the log.

## 2. Build it

Run the chosen style's skill with the same request **and the chosen shape**. In ECHO-JAY, a
`multichoice-report` starts from `design/echo-jay/templates/multichoice-report.html`, and every
other shape from `templates/artifact.html`. In the other styles, build the shape's blocks in that
system. Every style follows `${CLAUDE_PLUGIN_ROOT}/reference/house-rules.md`.
