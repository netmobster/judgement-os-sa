# The done list: what we did, as a card

**At the end of every big task** (Jay, 2 Oct), the granular list of what got done, as an ECHO-JAY
card in the chat. The itemised list is the reward for the work: never roll it up into themes.

- **Grouped by kind:** built, fixed, filed. Each line: what, why in a few words, and the commit (linked,
  shown at seven characters). A line's session shows only when it differs from the card's (below).
- **Past 15 items** the list goes compact: one line per item, and every item keeps its why and its commit.
  Nothing is ever cut to a bare name (the first checker run: 34 of 49 lost both).
- **Sessions:** a line names its session only when it differs from the card's. For a day across several
  sessions, leave the card's `session` out and give each item its own; the strip lists them.
- An optional **Next** group at the end.

## Make one

1. Write the list as JSON, real commits only (`git log --oneline`); a line without a commit is fine:
   `{ title, session, date, repo, groups: [{ kind, items: [{ text, why, commit }] }], next: [text] }`.
2. `node "<plugin root>/scripts/chat-card.js" done --file <that json>` prints the widget code.
3. `show_widget` with it, as is. Then a line or two in the reply, never the list again.
