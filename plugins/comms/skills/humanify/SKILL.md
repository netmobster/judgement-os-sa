---
name: humanify
description: HUMANIFY — de-tic pass for drafts written with AI in the room. Four registers, four passes, rations not bans. The register is picked from where the draft is going.
argument-hint: [creative-humour|creative-serious|bloggy|professional] (then paste or point at the draft)
---

# /humanify: a de-tic pass


Run when the user says "humanify this", "run humanify" or types `/humanify`.

## What this is

A de-tic pass for drafts written with AI in the room. It removes the patterns that make
prose read as machine-made. **It does not remove the disclosure, and it is not a
detection-evasion tool**: it assumes the writer discloses AI involvement. The goal is a reader
who already knows and doesn't wince.

## What this is not

- Not EDITOR. EDITOR cuts for length, clarity and landing. HUMANIFY removes tics.
- Not VOICE CHECK. VOICE CHECK shifts register for a new audience. HUMANIFY keeps the
  register and strips artifacts.
- Not FORMAT. FORMAT reshapes for a container.
- Not a rewriter. **If more than 30% of the text changes, stop and say so** — that's a
  rebuild, and it means the draft had a substance problem, not a tic problem.

---

## Step 1 — Establish register: a marked decision (`humanify.register`)

Do not proceed without it. Each register has different rations and different exemptions.
Applying the wrong profile is worse than running nothing, because it sands off the voice.

The register comes from a rule. The Second Opinion (the Judgement OS, in the labs plugin) is
asked **only** when the rule can't tell, everything is logged, and **any failure in this step
falls back to the rule's pick**, or to asking the user when the rule has none.

1. **Two files.** With the `Write` tool, write the user's instruction (their words, **not the draft**)
   to `<scratchpad>/humanify-request.txt`, and the draft to `<scratchpad>/humanify-draft.txt`.
   If they said "judge it", add `--anyway` in the next step.
2. **The rule.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/register-pick.js" --request <request file> --draft <draft file> [--anyway] > <scratchpad>/humanify-decision.json`
   gives `default` (a register, `skip` or `ask`), `named`, `consult` and, when consulting,
   `question`. The question carries counts about the draft, never the draft. A request that
   touches the silo never consults.
3. **Find the Judgement OS.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/find-plugin.js" labs scripts/record.js`
   prints the folder (`$LABS` below; write the path out). **Not found:** skip the log and go
   to step 6 with the rule's pick.
4. **Open the call.** `node "$LABS/record.js" open --decision <decision file> --run live --point humanify.register --prefix register`.
   It prints the call id, `consult` and, when consulting, the two `judges`.
5. **`consult: true`: two judges, one wait.** In **one message**, two Agent calls in the
   foreground, both `subagent_type: "labs:second-opinion"`, one with `model:` set to
   `judges.small.model` and one with `judges.big.model`, each with the prompt set to the
   decision's `question`, word for word. Record each answer, never through the shell: `Write` it
   to `<scratchpad>/humanify-answer-<small|big>.txt` and run
   `node "$LABS/record.js" verdict --call <id> --run live --model <that judge's model> --role <small|big> --point humanify.register --ms <duration> --file <that file>`.
   Then `node "$LABS/record.js" combine --call <id>` prints `show` and, when it's true, the
   leading judge's `verdict`, `confidence`, `why` and `suggestion`, plus any `other` (the second
   judge's different suggestion). `show: false` means the rule's pick stands.
6. **Settle it.**
   - **`combine` shows it** (by default, both judges disagree, each at medium or high
     confidence): one `AskUserQuestion`: "Register: the rule says {default}; the judges say
     {suggestion} ({confidence}). {why}". Options: `{suggestion}` · `{other}` (only when there is
     one) · `{default}`. For a redirect: `Run humanify anyway ({default})` · `Stop here`.
   - **A register, with nothing to show the user:** say it in one line, e.g. `Register: bloggy
     (Substack). Say if not.`, and run. Pass 1 makes no edits, so a wrong pick shows in the
     audit table before anything changes.
   - **`skip`:** say it reads as flat register (Slack, an email reply, code or legal text),
     where hard rule 5 says not to run, and stop, unless the user names a register.
   - **`ask`:** ask as before: one `AskUserQuestion`, *"Which register?"* → `creative-humour`
     · `creative-serious` · `bloggy` · `professional`, each described from the profiles below.
7. **Close the call.** `node "$LABS/record.js" close --call <id> --final <register used, or skip> --settled-by <user|rule|named>`,
   adding `--shown` if step 6 asked them. If they override the one-line register later in the
   run, close it again with their register and `--settled-by user`: the last close counts. Say
   nothing about the log.

## Register profiles

**Your registers are yours.** The four names are the same for everyone; what your voice does in
each one isn't. **Read `~/.claude/judgement-os/registers.md` first** if it exists: what your
voice does in each register, and the tells that are really yours (they extend the exemptions
below). If it doesn't exist, use these four, and offer once, after the run, to start that file
from them.

### CREATIVE-HUMOUR
- First person, deadpan or playful. The jokes carry the structure.
- Repetition that escalates. Specifics over generalities: real names, real places.
- A long run, then a short landing.

### CREATIVE-SERIOUS
- Sensory before exposition. Fragments as beats, short paragraphs.
- Concrete, real anchors. The emotional beat is shown, never explained.
- Present tense, active voice.

### BLOGGY
- Second person, direct address. Short declarative landings.
- Real dates and events from the writer's own life.
- Ends on a lift the specifics have earned, never on an abstraction.

### PROFESSIONAL
- Lists, unapologetically. Frameworks defined once and reused.
- Plain claims, owned. A direct question to the reader at the close.

---

## Exemptions — do not strip these

Several standard AI tells are a real writer's actual voice. Removing them is the failure mode
this command exists to avoid. **Check the exemption before flagging.**

| Pattern | Exempt in | Test that separates the voice from the tic |
|---|---|---|
| Anaphora | humour, serious, bloggy | The voice's **escalates or lands**. Flat repetition of a frame is the tic. "Random / Very random / Obscenely random" is a voice. "They assume X. They assume Y. They assume Z." is not. |
| Tricolon | humour | The third item **escalates the joke**. If the third item is a synonym of the second, it's the tic. |
| Invented concept labels | professional | The writer **defines it and uses it 3+ times**. A capitalised coinage used once is the tic. |
| Counting up front | professional | Genuine listicle convention. Keep. |
| Listicles and bullets | professional | Real structural habit. Keep. |
| Fragments | all except professional | Heavy and deliberate. Keep. |
| "Not A. Not B. Just C." | bloggy, humour — **1 per piece** | The real version names **real** excluded things and pays off in the actual subject. Zero in professional. |
| Profanity | humour, professional | In-voice. Not a tic. |
| **Negative parallelism** | **all four** | **Direction of specificity.** The voice resolves *more concrete*: "A FOOD CART — not a food cart. This food cart has a name." The tic resolves *more abstract*: "not a tooling problem, a trust problem." If the replacement half is vaguer than the negated half, it's the tic. |

### On negative parallelism specifically

It's the most-cited AI tell in the research, and also one of the oldest constructions there
is — classical antithesis, about two thousand years older than LLMs. Plenty of real voices
use it in every register.

**Do not ration it by count. Ration it by direction.** A piece can carry six and read as
pure voice, or carry one and read as machine — the difference is whether each one lands on
something more specific than what it denied.

---

## The four passes

Run in order. Each produces its own output. **Do not collapse them** — the categories fail
differently and a single rewrite turns them to mush.

### Pass 1 — AUDIT
Score the draft and report density per 1,000 words. Flag only what breaches the ration for
the declared register. **No edits.** Output a table: signal, count, ration, verdict.


### Pass 2 — STRUCTURE
Fix the document-level tells. Kill preamble, dissolve hidden listicles, break symmetrical
sections, cut signposted and never-ending conclusions, force a position where the draft is
hedging into coverage. This changes the outline, so it runs before any line editing.

### Pass 3 — LINE
Word choice, sentence shape, mechanical artifacts. Apply rations, not bans. Rebuild
burstiness last, since structural edits already changed sentence lengths.

### Pass 4 — INTERVIEW
The pass that does the real work. Ask the writer for what the model cannot invent:

- What actually happened here?
- Who said it, and what were their exact words?
- What did it cost — time, money, a relationship?
- What broke that you didn't expect?
- What's the digression you cut because it felt off-topic?

**Do not write the answers.** Ask, wait, then place what they give you. (Plain prose
questions, not a picker — these want their words, not a choice.)

---

## Rations, per 1,000 words

| Signal | Humour | Serious | Bloggy | Professional |
|---|---|---|---|---|
| Em dashes | 3 | 3 | 2 | 3 |
| Marker vocabulary | 1 | 1 | 2 | 2 |
| Tricolons | exempt | 1 | 1 | 1 |
| Negative parallelism | exempt | exempt | exempt | exempt |
| Magic adverbs | 1 | 1 | 1 | 1 |
| Hedges per claim | 1 | 1 | 1 | 1 |
| Filler transitions | 0 | 0 | 0 | 0 |
| Signposted conclusions | 0 | 0 | 0 | 0 |
| Self-answering questions | 0 | 0 | 0 | 1 |
| Sentences under 8 words | 2 floor | 2 floor | 1 floor | 1 floor |
| Sentences over 25 words | 1 floor | 1 floor | 1 floor | 1 floor |
| Firsthand specifics | 3 floor | 3 floor | 3 floor | 3 floor |
| Genuine digressions | 1 floor | 1 floor | 1 floor | 0 |

Em dashes: many writers use them rarely but not never. Three is a ceiling, not a target — if
the draft has one, leave it alone.

---

## Hard rules

1. **Never touch the disclosure.** Not the line, not the placement, not the wording.
2. **Never invent a specific.** If Pass 4 gets no answer, the sentence stays bland. A
   fabricated anecdote is a worse failure than a boring one.
3. **Never strip to zero.** Scrubbed prose has its own signature and it is more conspicuous
   than the original. Rations are ceilings, not targets.
4. **Never insert errors.** Correctness is not the tell; uniformity is. Allow contractions
   and fragments; do not manufacture typos.
5. **Do not run on code, legal text, or anything where flat register is correct.**
6. **Report what changed.** End with a count of edits by signal, so the writer can see whether the
   pass was surgical or a rewrite in disguise.

## Exit — report in this order

1. Register used.
2. Signals breached, before and after.
3. Percentage of text changed.
4. Anything Pass 4 asked for and did not get — the gaps that are still bland.

The report is the turn's final text (display rule — nothing after it).
