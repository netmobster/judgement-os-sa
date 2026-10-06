Comparison: two columns, the script beside the world (`.sr-compare`). Each side is a 1px-edge card (`.sr-compare-side`, as `.how-card-3`) with a mono head on a rule, a Plex Serif 26px title and short sans paragraphs. The chosen side (`is-chosen`) takes a copper edge, a copper-hi head and bone text; the other stays on dust. `sr-compare-arrowed` puts the copper → between them. Under 900px the columns stack and the arrow turns down.

## Markup

```html
<div class="sr-compare sr-compare-arrowed">
  <div class="sr-compare-side">
    <div class="sr-compare-head">The script</div>
    <h3 class="sr-compare-title">Scenes written in advance, played in order.</h3>
    <div class="sr-compare-body"><p>…</p><p>…</p></div>
  </div>
  <div class="sr-compare-arrow" aria-hidden="true">&rarr;</div>
  <div class="sr-compare-side is-chosen">…</div>
</div>
```

## Props

- Chosen side: `is-chosen` on one side only.
- Arrow: `sr-compare-arrowed` on the container plus the `.sr-compare-arrow` element; omit both for two plain columns.
- Body: one to three short paragraphs; a `<ul>` also sits well.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
