# The post kit: one post, three assets, in your look

From one post's source, three assets on one Design canvas: **a Substack header, an issue cover for the
newsletter, and a LinkedIn carousel** (MAKE item 9, 3 Oct). The look is picked the way a deck's is
(`decks.md` §1): a post of your own comes out in ECHO-JAY.

## 1. The source

Read it from the post: its draft, its task, or the user's words. Write nothing the post doesn't say.

| Field | What | Missing |
|---|---|---|
| title | The post's title | Ask in one line |
| sub | One line under it | Leave it out |
| publication, site | The newsletter's name and address | From the profile or settings, else ask |
| issue | Its number | A bracketed blank, `No. [__]`, listed in the reply |
| points | Four points, each a label, a headline and two sentences | From the draft; no draft, a first pass marked as draft |

## 2. The canvas

1. `quickstart` with intent `design`, then publish with the Design `type_url`, the title
   `Post kit: <post title>` and `auto_open: "after_first_write"`.
2. Install the design system from §1 as the type says (its `designSystems` record and its `tokens.json`).
3. Eight fixed-size artboards, each self-contained (the system's colours as hex, its faces from Google Fonts):

   | Artboard | Size | What |
   |---|---|---|
   | `Main.dc.html` | 1200×630 | **The Substack header**, also the social preview: title, sub, and one drawing of the subject |
   | `Cover.dc.html` | 1080×1080 | **The issue cover**: the publication, the issue number, the title, on the dark ground |
   | `Carousel-1` to `-6` | 1080×1350 | **The carousel**: a cover slide, the four points one per slide, and a last slide that sends readers to the post |

   Lay them out in two rows: header and cover above, the six slides below, each row with a title note.
4. Publish as the type says, give the link, and list what is draft or blank.

## 3. ECHO-JAY on a social asset

Every asset carries the nameplate (`ECHO-JAY`, gold, chamfered: `clip-path` works on a canvas) and a numbered
label with the publication and issue. The ground has the faint 24px grid, there's a readout strip with the
gold dot, one gold thing per block, and gold corner brackets on the panel that matters. Titles are Barlow Condensed
600, large and set close, with Source Sans 3 below them. Labels are Share Tech Mono, uppercase and spaced.

The cover and the carousel's last slide sit on the dark ground with a hazard-stripe divider. Carousel slides
1 to 5 carry the publication line and "Swipe →" at the foot. Counts, never a score.

*For the general edition: the router names this page only in public builds.*
