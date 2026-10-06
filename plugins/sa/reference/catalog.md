# Judgement OS catalog

*Built for Judgement OS: selfActual Edition 0.1.0. Don't edit by hand.*

```
Judgement OS: selfActual Edition.

Just say what you want; each plugin listens for its own work. Slash commands are shortcuts.
Your settings and state live in ~/.claude/judgement-os/.

labs  v0.8.1
  /labs:guide         Open the LABS guide: four steps for testing the Second Opinion yourself (/labs:try today, a morning you make up, trying to break it, then /day:boot), on a page that keeps your answers.
  /labs:profile       Set up or check the one profile file the Judgement OS judges read: writes a starter if there's none (never overwrites), then helps fill it in, one question at a time.
  /labs:try           Judge the judges, blind.  (typed only)

guard  v0.2.2
  /guard:guard         Explain what the guard plugin blocks or asks about, and why.
  hook          Hard rules as code: deploys, protected branches, destructive commands, state files, secrets and archived sessions.

sexyhtml  v0.15.2
  /sexyhtml:jay           Make an HTML page in ECHO-JAY, the default house style (light, industrial, gold and steel blue, chamfered corners, built for the ~500px Claude sidebar) for drafts and posts, reports, points of view, status boards and architecture notes.
  /sexyhtml:judgement-os  Make an HTML page in the Judgement OS brand (the lamp-lit room, then the paper dossier; Cinzel, Spectral, Space Mono) for Judgement OS itself, meaning its home, field guide and plugin docs.
  /sexyhtml:sa            Make anything selfActual-branded in the selfActual design system, such as pages, reports, 1920×1080 slide decks, mocks, prototypes, one-off assets or production UI.
  /sexyhtml:seren         Make an HTML page in the Seren style (dark ink, bone, copper and verdigris, IBM Plex) for anything Seren or Unstuck Games.
  /sexyhtml:sexyhtml      Make a beautiful, finished HTML page (one-pager, explainer, report, MultiChoice report, picker, landing page or checklist) in one of the house styles.

make  v0.8.1
  /make:diff-review   A visual diff review as a page in the house style - the verdict on a branch, commit, range or the working tree, with the evidence, risks and next steps, every claim citing a file and line.
  /make:fact-check    Check every verifiable claim on a page against the code and git history, mark each verified, corrected, unsupported or unverifiable, fix the errors in place, and add a verification strip.
  /make:guide         The MAKE checker: a page with one step for each make tool, saying what to type and what you should see, with a pick and a note on each that the page keeps.
  /make:make          The front door for making things.
  /make:plan-review   A plan read against the real code, as a page in the house style - each claim marked correct, stale, risky or missing, the gaps, a file-by-file table and a better sequence, ending in approve, revise or reject.
  /make:project-recap A project recap for someone coming back to it, as a page in the house style - what it is, how it fits together, recent activity by theme, the current state, hot spots, the commands and files, and evidence-based next steps.

comms  v0.6.1
  /comms:forcc         FOR CC reminders, the tasks the user wants Claude to raise at every boot.
  /comms:humanify      HUMANIFY — de-tic pass for drafts written with AI in the room.
  /comms:messages      Read, send or mark vault messages and broadcasts (the payload rail).
  /comms:ping          Force a check of the MCP connections, then pull new payload messages from the vault.
  /comms:poll          Read the Slack channels you choose, say what's new since your last post, and draft replies.
  hook          Send gate: every outbound message is blocked until you type "send" yourself; one send per yes.

day  v0.3.1
  /day:boot          A phased start to the day: a short brief, FOR CC reminders and the daily reading, one pick (style and energy, with the judges weighing in when the morning reads two ways), then one phase at a time, each skippable, ending with the day's phrase.
  /day:checkin       A check-in, mid-day or end-of-day: held items, habits still open, then tasks; at the end of the day, what carries to tomorrow and whether the reading and the phrase landed.
  /day:daily         A daily reading and a phrase in a language you're learning.
  /day:flag          Mark this piece of work as one the user should come back to: when it's done, the turn ends with one question, and their phone gets one line.
  /day:guide         Open the Judgement OS field guide: a page with one step for each part, saying what to type and what you should see, with a pick and a note on each that the page keeps.
  /day:habits        Daily habits: set up your rows once, then score them any time of day, and the check-ins bring back whatever is still open.
  hook          Stamps the time on every prompt and says when a check-in is due; opens the field guide in the first sessions after an install.

dice  v0.2.1
  /dice:roll          Roll real dice for D&D and tabletop games, e.g.

sa  v0.3.1
  /sa:board         Show the active task board.
  /sa:close         Session close: git check, session log, task reconcile and profile flags, plus the changelog where one is set up.
  /sa:cue           CUE :: TRY and :: STATUS.
  /sa:gear          Load a gear, loop or mode by name.  (typed only)
  /sa:open          SA session open — server time, next CC session number, active P0/P1 board
  /sa:orient        What Judgement OS and SA can do inside Claude Code.  (typed only)
  /sa:profile       Load your working profile at a chosen depth (small, general, full), or one section by name, from a local copy built from your selfActual vault.
  /sa:sa            Thinking tools from selfActual: Imprint gears, loops and modes.
  /sa:task          Create a task in the vault from freeform text.
  hook          Checks once a month that a selfActual account is connected, and routes a prompt that starts with :: to the CUE menu.

```
