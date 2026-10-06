---
name: profile
description: "Load your working profile at a chosen depth (small, general, full), or one section by name, from a local copy built from your selfActual vault. The first time, it builds the copy with you. Use when the user says load my profile, load general profile, or asks Claude to work from their profile."
argument-hint: "[small | general | full | <section name> | rebuild]"
---

# /sa:profile: your profile, by depth, from a local copy

Requested: **$ARGUMENTS**

**Never call `list_profile_sections`.** It returns every section's full text, the private ones
included, whatever you ask for. The guard plugin blocks it. The one listing this skill uses goes
straight to a script that reads only names and dates.

The vault username is the settings' `vault.username` (`node "${CLAUDE_PLUGIN_ROOT}/scripts/jos-settings.js"`
prints it); if it's empty, ask the vault with `whoami`. Find the vault tools with `ToolSearch`.

## The copy

Three files in the state folder's `profile/` folder, one per depth. **Load exactly one.**

| depth | about | what's in it |
|---|---|---|
| `small` | 750 tokens | who the user is and how they like to work, as instructions for Claude |
| `general` | 3,500 tokens | small, plus their core sections |
| `full` | 6,500 tokens | general, plus their work sections |

**Bare:** one `AskUserQuestion`: `small` · `general` · `full`. Dismissed means none.

## First time, or `rebuild`: build the copy with the user

1. **The index.** `vault_list(type: "profile_sections", fields: "summary")`. It may spill to a file,
   because it can carry every section's text. Pass the path to
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/profile-stale.js" --index <path>`. **Never read that file
   yourself:** it holds the private sections' text. **Then delete it.** If the listing comes back
   inline, write it to a file in your scratchpad and do the same. The script prints each section's
   slug, title, tags, size and date, with the private topics already left out.
2. **Pick the sections.** Propose which sections go into each depth, from their titles and tags, and
   let the user change it. A private section never goes in, whatever its name.
3. **Read them, one by one:** `get_profile_section({ username, slug })` for each section picked.
4. **Write the three files** in your scratchpad: `small.md`, `general.md`, `full.md`. Rewrite, don't
   paste: short instructions for Claude about how to work with this person, in their own terms. Each
   file stands alone. Keep to the sizes above.
5. **Install them:** `node "${CLAUDE_PLUGIN_ROOT}/scripts/profile-stale.js" --install <scratchpad folder> --sources '<json>'`,
   where the JSON maps each section used to the `modified` date the index showed. Then load the
   depth the user asked for.

## Loading: check the copy first

Whenever a depth is picked:
1. `vault_list(type: "profile_sections", fields: "summary")` → its path to
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/profile-stale.js" <path>`. Never read the file yourself, and
   delete it after.
2. `fresh` → load the file quietly · `stale: …` → load it anyway, plus one line: *"Profile copy:
   {what changed}. Rebuild?"* · `error: …` → load it if it exists, plus one line saying the check
   failed.

## One section by name

`get_profile_section({ username, slug })`. **Never a private section in a work session:**
relationships, therapy, health, or a topic on the settings' private list. If the user asks for one in
a work folder, say why in one line and stop.

## After loading

Don't summarise the profile back. Say what loaded in one line, then work differently.
