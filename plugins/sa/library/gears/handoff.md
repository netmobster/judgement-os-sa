---
gear: handoff
version: "3.1"
tier: free
category: Session
title: HANDOFF
summary: Writes the cold-start brief for the next session. Forward-facing, written for an instance that has never seen this one — build state, next action, nuance, boot sequence. Overwrites each time; a snapshot, not an archive.
trigger: '"handoff" / "good night + handoff" / "imprint to imprint"'
auto: "false"
updated: 2026-08-09
canonical: "true"
---

# HANDOFF

*Trigger: "handoff" / "good night + handoff" / "imprint to imprint"*
*Behavioral signal: Explicit invocation only — operator is closing and wants continuity delivered to the next session*
*Auto-shift: No*
*Confirm before load: No*
*Exit: Transfer package complete — next Imprint instance can boot from it → return to DEFAULT*

---

## What it is

The gap between sessions. One Imprint ends mid-stream, another arrives to continue — and instead of reconstructing what happened, it already knows. Handoff writes the cold-start brief that makes that possible: forward-facing, written for someone who has never seen this session.

Good for: multi-session projects, handing off mid-stream work, explicit "good night + handoff" closes.

---

## What it looks like working

- Writes for the future Imprint, not the operator — the audience is a fresh instance with no context
- Specific over vague: names the actual files, decisions, open questions, and boot sequence
- Captures nuance: what doesn't show up in a file list but would matter on arrival
- Writes what it wishes it had known at the start
- Overwrites the previous handoff — snapshot, not archive
- Returns to DEFAULT on completion

---

## How to run

1. **Orient** — who's arriving, what kind of project, what the work state is
2. **Session summary** — one paragraph: what this session was actually about
3. **Build state** — what exists, where it lives, what's complete vs. in-flight
4. **Next action** — the specific immediate next step, not a category
5. **Nuance** — what doesn't appear in a file list but would matter on arrival
6. **Boot sequence** — in order: what to load, what to check, what to ask first
7. **Write to vault** → `master/imprint/handoffs/current` → return to DEFAULT

---

## Output format

```
# IMPRINT HANDOFF — [date]

OPERATOR: [who this is for]
SESSION SUMMARY: [what this session was about — one paragraph]

CURRENT BUILD STATE: [what exists, where it lives, what's complete vs. in-flight]
WHAT'S NEXT: [the immediate next action — specific]

NUANCE + CONTEXT: [the stuff that doesn't show up in a file list]
LOAD FIRST: [what the incoming Imprint should read or pull before anything else]

PARKED: [what's intentionally deferred and why]
BOOT SEQUENCE FOR NEXT IMPRINT: [in order — what to load, what to check, what to ask]
```

---

## When to use

- "Handoff" / "good night + handoff" / "imprint to imprint"
- Any session that ends mid-stream with intent to continue
- Before a planned break of more than a day
- When passing a project to a different operator's Imprint instance

## When not to use

- Standard close: if the session is complete, use Good Night or Sign-Off instead. Handoff is for continuations, not conclusions.
- Short break: a few hours doesn't need a Handoff — session history plus a brief recap at the start of the next session is enough.

**Failure mode:** Handoff that summarizes the past instead of briefing the future. The question is "what does the next Imprint need?" — not "what happened?"

---

## Negative parameters

NOT a session summary for the operator. Written for the incoming Imprint.
NOT an archive. Overwrites each time — `get_session_history` holds the record.
NOT vague. "We were working on something" is a failed Handoff. Name it specifically.

---

## Vault write

Output written to vault at `master/imprint/handoffs/current`. Overwrites each session.

---

## Amendment shopping list

None. Zero operator-specific wiring.

*Load via gear amendment: `create_gear_amendment` on slug `handoff`.*

## Changelog

- **3.1** — Gear OS rebuild wire pass: frontmatter added (title, category, summary, trigger). Exit updated: Operator → DEFAULT.
- **3.0** — Previous canonical version.
