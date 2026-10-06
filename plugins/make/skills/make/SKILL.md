---
name: make
description: The front door for making things. Say what you want made and /make picks where it lands, then hands it to the right maker - a page (through /sexyhtml), a question form or a card in the chat, a deck, a design, a living doc, a file, or a design system. Use when the user says make, build me a page, a deck, slides, a poster, a social post, a header image, ask me in chat, the done list, export this, or asks for anything visual or shareable.
argument-hint: "<what to make: \"a deck of the release plan\", \"ask me in chat\", \"a page of the eval\">"
---

# /make: the front door

**Say what you want made. It lands in the right place, in your look.** *(The tagline, Jay's pick, 2 Oct.)*

One way to ask for anything made. **Pick where it lands (§1), then hand it to the maker for that
surface (§2).** The standard (§3) holds on every surface.

## 1. Where it lands: a marked decision (make.surface)

The rule is code, `surface-pick.js`: a surface the user names wins (a file format, a deck, a design,
a design system, a doc, a page, "in chat"); otherwise the words that point at one are counted; nothing
points anywhere, and it's a page. The judges are asked **only** when two surfaces fit, or the user
says "judge it". **Any failure in this section falls back to the rule's pick.**

1. **The request.** `Write` the user's words, verbatim, to `<scratchpad>/make-request.txt`. "Judge it"
   adds `--anyway` below.
2. **The rule.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/surface-pick.js" --request <that file> [--anyway] > <scratchpad>/make-surface.json`
   gives `default` (the surface), `named`, `consult` and, when consulting, `question`.
3. **Find labs.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/find-plugin.js" labs scripts/record.js` prints its
   folder (`$LABS` below; write the path out). **Not found:** use the rule's pick and log nothing.
4. **Open the call.** `node "$LABS/record.js" open --decision <scratchpad>/make-surface.json --run live --point make.surface --prefix surface`.
5. **Not consulting:** close it (step 8) with `--settled-by named` where the user named the surface,
   otherwise `--settled-by rule`, and go to §2.
6. **Consulting:** in **one message**, two Agent calls in the foreground: `subagent_type: "labs:second-opinion"`,
   `model:` set to `judges.small.model` for one and `judges.big.model` for the other, the prompt the
   `question`, word for word. `Write` each answer to `<scratchpad>/make-answer-<small|big>.txt` and record it:
   `node "$LABS/record.js" verdict --call <id> --run live --model <its model> --role <small|big> --point make.surface --ms <duration> --file <that file>`.
   Then `node "$LABS/record.js" combine --call <id>`. **`show: false`:** the rule's pick stands.
7. **`show: true`:** ask the user in the live picker (`${CLAUDE_PLUGIN_ROOT}/chat/live-picker.md`), one
   question: "Surface: the rule says {default}; the judges say {suggestion} ({confidence}). {why}" with
   `{suggestion}`, `{other}` when there is one, and `{default}`.
8. **Close the call.** `node "$LABS/record.js" close --call <id> --final <the surface used> --settled-by <user|rule|named>`,
   adding `--shown` when step 7 asked. Say nothing about the log.

## 2. Hand it to the maker

| Surface | The maker |
|---|---|
| `page` | Run `/sexyhtml` with the same request. It picks the style and the shape. A session recap has its own maker: `${CLAUDE_PLUGIN_ROOT}/pages/session-recap.md`. So do the explainers: `/make:diff-review`, `/make:plan-review`, `/make:project-recap` and `/make:fact-check` (`pages/explainers.md`). |
| `chat` | The chat kit in `${CLAUDE_PLUGIN_ROOT}/chat/`: `live-picker.md` for questions; `done-list.md` and `before-after.md` for the cards, which `scripts/chat-card.js` draws in ECHO-JAY. Load the visualize guide first (`read_me`, without mentioning it). Visuals in the tool, words in the reply after it. |
| `deck` | `${CLAUDE_PLUGIN_ROOT}/pages/decks.md`: the look is picked the way a page's is, by `/sexyhtml`'s style rule (a named style always wins), then the Slides type on that design system. |
| `design` | The look is picked as for a deck (`${CLAUDE_PLUGIN_ROOT}/pages/decks.md` §1), then the Design type on that design system. |
| `doc` | The `Artifact` tool: `quickstart` with intent `document`, written through the Claude Docs connector. |
| `file` | The office skills: `docx`, `pptx`, `xlsx`, `pdf`. A CSV is written directly. |
| `design-system` | The `Artifact` tool: `quickstart` with intent `other`, then the Design System type. |

**A maker that isn't in this session** (no widget tool, no artifact types, no office skills): say so in
one line and make a page instead.

**The post kit:** a post's Substack header, issue cover and LinkedIn carousel come together from one source,
on one Design canvas: `${CLAUDE_PLUGIN_ROOT}/pages/post-kit.md`.

### Decisions: two surfaces (Jay, 2 Oct)

- **The in-chat form** (`chat/live-picker.md`) for Q&A: questions that stand on their own, answered
  now, in the flow. The answers come back as the user's next message.
- **The sexyhtml MultiChoice page** for larger reports and issues: decisions inside findings that need
  room (tables, sections, evidence), or that get answered later or on a phone. The page keeps the
  answers itself (`answers/<id>--<data-key>`); read them with `ArtifactData` when the user says they've answered.

**Rule of thumb:** if the context needs more than a short reply above the form, it's a page.

## 3. The standard, on every surface

1. **One front door.** This one.
2. **The house look where the surface allows it.** Pages and chat cards in the house styles. In-chat
   forms keep Claude's look: their chrome is locked.
3. **A way back.** Anything that asks the user something returns the answer: the form by itself, a
   page by its copy button.
4. **Never a score.** Counts, not fractions, and no progress bars.
   selfActual pages and decks follow SA's guide for evidence figures ("7 of 7"), always with the tag.
5. **Private stays private.** Personal pages go in the side panel or on a private link, never a shared one.
6. **Shippable.** Open-source parts keep their licences.
