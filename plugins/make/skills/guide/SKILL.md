---
name: guide
description: "The MAKE checker: a page with one step for each make tool, saying what to type and what you should see, with a pick and a note on each that the page keeps. Use when the user says make guide, check the make tools, test the make tools, the checker, checker done, or /make:guide."
---

# /make:guide: the MAKE checker

**The checker is a page that ships with this plugin:** `${CLAUDE_PLUGIN_ROOT}/pages/checker.html`.
One step for each make tool: what to type, what the user should see, then how it went (Works, Works
with a catch, or Broken) with a note. **The user gets their own copy,** published as their private
artifact, and the page keeps their answers.

**Its link is kept in the settings folder,** as `pages/make-checker.json`.
`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints the settings `file`; the folder that
holds it is the settings folder. The link goes in `pages/` because the guard plugin keeps the JSON
files at the top of that folder for the scripts that own them.

## 1. Open it

**The first time** (no `pages/make-checker.json` yet):
1. **Publish the page** with the `Artifact` tool: `file_path` set to
   `${CLAUDE_PLUGIN_ROOT}/pages/checker.html`, `icon: "checklist"`, and
   `capabilities: {db: {}, user: {}}` so the answers save into the page. It stays private until the
   user shares it.
   - The tool refuses the path: copy the file into your scratchpad and publish the copy.
   - The tool refuses the capabilities: publish without them. The page still works, and its copy
     button becomes the way back.
2. **Save the link** with the `Write` tool, to `pages/make-checker.json` in the settings folder:
   `{"url": "<the link>", "key": "<the page's data-key>", "published": "<YYYY-MM-DD>"}`. The
   `data-key` sits on the page's `ej-shell`.

**Every time after:** open the saved `url` with the `Artifact` tool, `action: "open"`. **If the
page's `data-key` no longer matches the saved `key`,** a newer plugin brought new steps. Say so in
one line, and on a yes: read the artifact, publish the new file to the same `url` (the capabilities
carry over), and save the new `key`. The link stays the same, and the new steps start clean. A
saved link that no longer opens (the artifact was deleted): publish a fresh copy, as the first time.

**No `Artifact` tool on this surface:** give the page's full path, so the user can open it in a
browser. The picks stay in that browser, and the copy button at the foot brings them back.

Then one line, no more: the step that's probably next. On a first open that's step 1; later, it's
the first step without a pick (§2 reads them).

## 2. When they're done

The page tells the user to say *"checker done"*. **Read the answers then. Never ask them to paste.**

`ArtifactData`, `list` on the `answers` collection of the saved `url`, and take the document whose
`key` is the page's `data-key`. Its `answers` hold a `pick` and a `note` for each step, by number,
and `extra` for the last box. Its `text` is the same, as plain lines.

**Nothing there:** say so in one line. The page saves as they go only when it was published with
the capabilities.

## 3. Act on them

- **Works:** nothing to do.
- **Broken, or Works with a catch:** read the note, and find the cause before you answer. The usual
  ones: make or sexyhtml not installed or enabled, or a chat opened before they were (plugins load
  when a chat starts).
- **A missing maker is the designed fallback,** so name the missing piece. Decks, designs and docs
  need artifact types on the account, a doc also needs the docs connector, a file needs the office
  skills, and a form needs the widget tool. Without one, `/make` says so and makes a page; a form
  falls back to a picker.
- **Fix what's in the user's own setup now,** and say what changed. Then give the line to type to
  try that step again.
- **A fault in a plugin:** say so plainly, and offer to draft an issue for its homepage (the
  `homepage` in the plugin's `.claude-plugin/plugin.json`). The user files it.
- **Steps with no pick** are untried. End with one line naming them.
