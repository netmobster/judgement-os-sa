# The session recap: every close leaves a page

The done list, kept: what was built, fixed and filed (each with why and its commit), the decisions,
the open loops and what's next, as one ECHO-JAY page.
Ask `/make` for a session recap at the end of a session, and keep its link with your notes.

## Make one

1. The JSON: the done list's shape (`chat/done-list.md`) plus `slug`, `summary`, `decisions`,
   `openLoops`. Real commits only (`git log --since=<session start> --format="%h %s"`); work with no
   commit (a CLAUDE.md edit, a saved rule) gets a line without one.
2. `node "<plugin root>/scripts/recap-page.js" --file <json> --out <dir>` writes `recap.html` and copies
   ECHO-JAY's `styles.css` and `tokens/` beside it.
3. Publish `recap.html` with the `Artifact` tool, the stylesheet and tokens through `files`.

The first one: CC-71, 2 Oct 2026, 37 things.
