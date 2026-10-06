---
name: profile
description: "Set up or check the one profile file the Judgement OS judges read: writes a starter if there's none (never overwrites), then helps fill it in, one question at a time. Use when someone says set up my Judgement OS profile, starter profile, my judges, or asks why no judge is ever asked. Not for loading a working profile into this session."
argument-hint: "[check]"
---

# /labs:profile: the profile your judges read

The judges read **one file about you** before they weigh in on a decision, and nothing else about
you. Until that file exists **and is filled in**, no judge is asked: every rule decides alone, and
nothing breaks. The starter carries a first line that keeps the judges quiet; deleting it switches
them on. *(Built 2 Oct 2026, step 4.)*

## 1. Where it stands

`node "${CLAUDE_PLUGIN_ROOT}/scripts/profile-init.js"` writes the starter to the profile path in the
settings, **only if nothing is there**, and prints `{path, state, created}`.

- **`ready`**: a filled-in profile. One line, `Your judges read <path>.`, and stop. **Never rewrite
  someone's profile.** With `check`, run `--check` (step 3) and report any `privateLines`.
- **`starter`**: the starter, not filled in yet (`created: true` if it was just written). Go to step 2.
- **`none` with a `problem`**: the settings name no profile file. Say so, and show the settings in
  use with `node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"`.

## 2. Fill it in, together

`Read` the file first. Then five questions, **one per message**, in plain prose (they want the
person's words, not a pick from a list):

1. **Who are you**, in a line or two: what you do, and who for?
2. **How do you work**: fast or careful, plan first or build to find out, what should be said to you plainly?
3. **What are you on right now**: the projects that matter this month?
4. **How do you like things made**: the look for work, for games, for your own notes; where your
   writing goes and the voice each one gets?
5. **When should a judge push back on you**: the calls you get wrong when you're rushed or tired?

**And the name pages use.** If the settings have no `operator` (`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"`
prints them), ask once: *"What should your pages call you?"* and set `operator` in the settings file
(`file` in that output) with `Edit`. Until it's set, pages read `FOR YOU`.

After each answer, `Edit` it into its section, replacing that section's `<!-- … -->` comment. Keep
their words: tighten, don't rewrite, and add nothing they didn't say. "Skip" leaves the comment.

**Nothing private goes in.** If an answer touches health, therapy, relationships, grief or anything
else personal, leave that part out and say so in one line: the judges must never see it.

## 3. Switch the judges on

1. `node "${CLAUDE_PLUGIN_ROOT}/scripts/profile-init.js" --check` lists any line carrying a word from
   the settings' private list. Fix those with the person before going on.
2. Show the finished profile and ask: *"Switch your judges on? This deletes the starter line, and
   from then on they read this file."*
3. **Only on a yes**, delete the first line (the one saying `judgement-os: starter profile, not
   filled in`) with `Edit`. Run `--check` again: `state` should be `ready` and `privateLines` empty.
4. One line to finish: the posts at the foot of the file are where to go for a better profile.
