# UI kit — Keep Yourself deck

The one product surface in the source: *selfActual Keep Yourself Deck* (v4, 7 Sept 2026), six slides at 1920×1080, rebuilt from the React components in `components/`.

- `index.html` — click-through (Prev/Next, arrow keys); slide 05 embeds the live Insights console, whose chips update the insight text.
- `Slides.jsx` — one function per slide: CoverSlide, ProblemSlide, StackSlide, EvidenceSlide, WindowSlide, CloseSlide.
- `App.jsx` — the scaler and navigation.

Everything visible comes from `Slide`, `Hl`, `EvidenceTag`, `EvidenceRow`, `StackRow`, `Panel`, `RuleNote`, `Console`, `Button`. Slide-scale overrides (24–32px) are applied inline, as the source deck does, because the base classes are UI-scale.

A plain-HTML (no React) deck starter with the same chrome lives at `templates/deck.html`.