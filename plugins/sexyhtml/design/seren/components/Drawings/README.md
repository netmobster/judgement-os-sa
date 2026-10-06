Drawings: the site's figures as parts (`.sr-draw`), inline SVG in the palette, hairline strokes. **Dots on rules** is a script: three edge rules with copper dots at even intervals, every beat placed in advance. **Three crossing curves** in copper, verdigris and bone at 55% is a world that answers back. **The orbit** is the mark at 188px (`.sr-orbit`), turning once every 72 seconds (`srSpin`), still under reduced motion; `.sr-orbit-sm` is the 22px header size. Put a drawing inside a Figure so it gets its number and its point.

## Markup

```html
<svg class="sr-draw" viewBox="0 0 320 96"><line class="rule" x1="0" y1="24" x2="320" y2="24"/><circle class="dot" cx="32" cy="24" r="3"/>…</svg>
<svg class="sr-draw" viewBox="0 0 320 96"><path class="copper" d="…"/><path class="verdigris" d="…"/><path class="bone" d="…"/></svg>
<svg class="sr-draw sr-orbit" viewBox="0 0 24 24"><circle class="ring" cx="12" cy="12" r="10.5"/><circle class="orbit" cx="12" cy="12" r="6.6"/><circle class="sat" cx="18.6" cy="12" r=".9"/><circle class="core" cx="12" cy="12" r="2.5"/></svg>
```

## Props

- Strokes: `rule` (edge), `copper`, `verdigris`, `bone` (55%); fills: `dot`, `dot-dim`, `core`, `sat`, and `ring` / `orbit` for the mark.
- Size: the SVG fills its container; `sr-orbit` fixes 188px, `sr-orbit-sm` 22px.
- The curves and the dots are the only drawings. Do not add icons.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
