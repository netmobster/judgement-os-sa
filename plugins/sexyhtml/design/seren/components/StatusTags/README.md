StatusTags: four states on a 1px edge, Space Mono 10px at 0.16em, uppercase (`.sr-tag`). **Live** is verdigris with the pulsing dot (`srPulse`, 3.4s); **held** is verdigris; **open** is dust on the plain edge; **lost** is oxblood. Nothing else gets a colour.

## Markup

```html
<span class="sr-tag sr-tag-live">Live</span>
<span class="sr-tag sr-tag-held">Held</span>
<span class="sr-tag sr-tag-open">Open</span>
<span class="sr-tag sr-tag-lost">Lost</span>
<div class="sr-tags">…several…</div>
```

## Props

- State, one of: `sr-tag-live` · `sr-tag-held` · `sr-tag-open` · `sr-tag-lost`.
- Text: the state, in sentence case; CSS sets the capitals. Counts are allowed ("2 lost").
- Used by StepList, Figure and the charts; under reduced motion the live dot holds still.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
