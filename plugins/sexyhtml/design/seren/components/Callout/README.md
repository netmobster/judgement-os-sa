Callout: a 2px copper rule at the left (as `.pt-said`), a short label in Space Mono copper-hi, and one or two sentences in Plex Sans 15px dust-hi (`.sr-callout`). The failure variant (`.sr-callout-fail`) turns the rule and the label oxblood, as `.pt-broke` does. No box, no background: a rule and the words.

## Markup

```html
<div class="sr-callout">
  <span class="sr-callout-label">The rule at the table</span>
  <p>A roll is read aloud once and written down once. <b>If it is not in the ledger, it did not happen.</b></p>
</div>
<div class="sr-callout sr-callout-fail">…</div>
```

## Props

- Variant: none (copper) or `sr-callout-fail` (oxblood).
- Label: a few words, sentence case.
- Body: one `<p>`, two sentences at most; `<b>` sets the sentence that matters in bone.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
