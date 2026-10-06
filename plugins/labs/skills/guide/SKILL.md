---
name: guide
description: "Open the LABS guide: four steps for testing the Second Opinion yourself (/labs:try today, a morning you make up, trying to break it, then /day:boot), on a page that keeps your answers. Use when the user says LABS guide, LABS guide done, how do I test the judges, or try the Second Opinion."
---

# /labs:guide: the LABS guide

**The guide is a page that ships with this plugin:** `${CLAUDE_PLUGIN_ROOT}/pages/guide.html`. Four
steps: the user's real morning, judged blind; a morning they make up; trying to break it; then
boot, with the judges in it. Each asks how it went (Works, Works with a catch, or Broken) with a
note. **The user gets their own copy,** published as their private artifact, and the page keeps
their answers.

**Its link is kept in the settings folder,** as `pages/labs-guide.json`.
`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"` prints the settings `file`; the folder that
holds it is the settings folder. The link goes in `pages/` because the guard plugin keeps the JSON
files at the top of that folder for the scripts that own them.

## 1. Open it

**The first time** (no `pages/labs-guide.json` yet):
1. **Publish the page** with the `Artifact` tool: `file_path` set to
   `${CLAUDE_PLUGIN_ROOT}/pages/guide.html`, `icon: "flask"`, and `capabilities: {db: {}, user: {}}`
   so the answers save into the page. It stays private until the user shares it.
   - The tool refuses the path: copy the file into your scratchpad and publish the copy.
   - The tool refuses the capabilities: publish without them. The page still works, and its copy
     button becomes the way back.
2. **Save the link** with the `Write` tool, to `pages/labs-guide.json` in the settings folder:
   `{"url": "<the link>", "key": "<the page's data-key>", "published": "<YYYY-MM-DD>"}`. The
   `data-key` sits on the page's `ej-shell`.

**Every time after:** open the saved `url` with the `Artifact` tool, `action: "open"`. **If the
page's `data-key` no longer matches the saved `key`,** the plugin's guide has changed. Say so in one
line, and on a yes: read the artifact, publish the new file to the same `url` (the capabilities
carry over), and save the new `key`. The link stays the same, and the new steps start clean. A
saved link that no longer opens (the artifact was deleted): publish a fresh copy, as the first time.

**No `Artifact` tool on this surface:** give the page's full path, so the user can open it in a
browser. The picks stay in that browser, and the copy button at the foot brings them back.

Then one line, no more: the step that's probably next. On a first open that's step 1; later, it's
the first step without a pick (§2 reads them).

## 2. When they're done

The page tells the user to say *"LABS guide done"*. **Read the answers then. Never ask them to
paste.**

`ArtifactData`, `list` on the `answers` collection of the saved `url`, and take the document whose
`key` is the page's `data-key`. Its `answers` hold a `pick` and a `note` for each step, by number,
and `extra` for the last box. Its `text` is the same, as plain lines.

**Nothing there:** say so in one line. The page saves as they go only when it was published with
the capabilities.

## 3. Act on them

- **Works:** nothing to do.
- **No judge answered** (steps 1 to 3): check the profile first. `jos-settings.js` prints
  `profileState`, and anything but `ready` means no judge is asked. `/labs:profile` fills it in.
- **A judge that disagreed on step 2's dull morning** shows the bias the test looks for. Say so
  plainly, with what that judge said.
- **Anything that got through in step 3 is a finding.** Say plainly what got through and what it
  means. If something private reached a judge, offer to add its word to the settings'
  `privateTopics.words`, and on a yes, `Edit` the settings file so no judge sees it again.
- **Anything else Broken or a catch:** read the note, and find the cause before you answer. Fix
  what's in the user's own setup now, say what changed, and give the line to type to try that step
  again.
- **A fault in a plugin:** say so plainly, and offer to draft an issue for its homepage (the
  `homepage` in the plugin's `.claude-plugin/plugin.json`). The user files it.
- **Steps with no pick** are untried. End with one line naming them.
