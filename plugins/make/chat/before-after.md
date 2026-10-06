# Before and after: a change, as a card

Show a change marked up in the chat: **the changed lines and two either side** (Jay, 2 Oct). Best
before a change lands, so "repeat the plan back" is something to look at, not to imagine: a
CLAUDE.md edit, a settings change, a commit.

## Make one

1. A unified diff: `git diff -U2`, or `git show -U2 --format= <commit> -- <files>`; for files
   outside a repo, `git diff --no-index -U2 <old> <new>`.
2. `node "<plugin root>/scripts/chat-card.js" diff --file <patch> --title "<what changed>" --commit <hash> --repo <url> --session CC-n`
   prints the widget code, with the commit linked in the strip (seven characters; a `git@` remote links
   as https). Context past two lines either side is trimmed whatever `-U` says. A new file shows a
   five-line preview and its count; a deleted, binary, renamed or empty file is one line; no file shows
   more than 40 lines, and the card stops at 120. Every file says what it left out, and the end names
   the files the 120-line limit cut. The date is your day, not UTC's.
3. `show_widget` with it, as is.
