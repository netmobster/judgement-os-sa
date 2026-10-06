---
name: daily
description: "A daily reading and a phrase in a language you're learning. Set either one up once; then /day:boot shows the reading first and the phrase last. Use when the user says set up a daily reading, learn a language, a phrase a day, or wants to change their reading plan or language."
argument-hint: "[reading | phrase | show]"
---

# /day:daily: a daily reading and a language phrase

Two small things a day, shown and never scored. `/day:boot` shows the reading at its first step and
the phrase at its last, and the end-of-day check-in asks once whether they landed.

**The files are the script's.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/daily.js"` is the only writer;
`daily.js check` says which ones are set up. When the session has a name, pass `--by <name>` on
every write.

## Setting one up

Ask which they want: the reading, the phrase, or both. Then set up each one.

### The reading

1. Ask what they'd like to read a little of each day: a book of scripture, the Stoics, poems, essays,
   a field they're learning. Ask how long the plan should run (30 days is a good start) and how long
   each reading should take.
2. Write the plan to a file in your scratchpad, in this shape:

   ```
   # Reading: <the plan's name>

   ### <a part, if the plan has parts>
   #### 1. [ ] <title>
   <the text, or where to find it>
   <one line to think about>

   #### 2. [ ] <title>
   ```
3. **Copyright.** Put a text in full only when it's in the public domain: old translations, classics
   past their term. For anything else, give the reference and a link, plus a short line of your own.
   Never the text itself.
4. Install it: `daily.js setup reading <file>`. Then show day 1: `daily.js show reading`.

### The phrase

1. Ask which language, and how much they know already.
2. Write sets of everyday phrases, the most useful first, to a file in this shape:

   ```
   # Phrases: <language>

   ### <a set: greetings, food, directions>
   1. [ ] <phrase> — <meaning> *(<how to say it>)* · <a note on the pattern>
   2. [ ] <phrase> — <meaning> *(<how to say it>)*
   ```
   Add the note when there's a real pattern: a sound rule, or a grammar rule that reaches past the
   one word. Leave it off rather than pad.
3. Install it: `daily.js setup phrase <file>`. Then show day 1: `daily.js show phrase`.

**A new plan later:** write the new file and add `--replace`.

## How they move

- **The reading rolls daily.** It moves on by itself the first time it's shown on a new day. "Done"
  only records that it landed.
- **The phrase holds until acknowledged.** A phrase that didn't land comes back. Any acknowledgement
  counts, at any point in the day: "done", "got it", a question about the phrase. Run
  `daily.js done phrase`. Silence leaves it where it is. Nothing stacks up, and there's no catching
  up to do.
- If the user asks about a word in the phrase, answer it. That's part of the lesson.

## Showing them

`daily.js show reading` and `daily.js show phrase` print the entry ready to render. Render it exactly
as printed. Add nothing to the reading, not even a light aside. The phrase may carry its pattern note.
