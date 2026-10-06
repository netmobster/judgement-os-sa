QuestionPanel: one decision at the table (`.sr-question`), on the raised ink of `.row`. An eyebrow names the moment ("Decision · Session 4"), the question is Plex Serif 30px bone, and three or four options sit as rows on hair rules: the option in serif 19px, its meaning in sans dust under it. The recommended option carries the copper left rule and a mono "Recommended" at the right. The note is a dashed edge box (as `.creators-meta`) with a mono label and a sentence or two.

## Markup

```html
<div class="sr-question">
  <div class="eyebrow-bare">Decision &middot; Session 4</div>
  <h3 class="sr-question-q">The collectors ask what the party is carrying. Who answers?</h3>
  <ul class="sr-options">
    <li class="sr-option">
      <span class="sr-option-name">Grumble names the category.</span>
      <p class="sr-option-meaning">He says "livestock" in front of witnesses.</p>
    </li>
    <li class="sr-option is-rec">
      <span class="sr-option-name">Say nothing. Make them name it.</span>
      <span class="sr-option-mark">Recommended</span>
      <p class="sr-option-meaning">…</p>
    </li>
  </ul>
  <div class="sr-note"><span class="sr-note-label">Note</span><p>…</p></div>
</div>
```

## Props

- Recommended: `is-rec` on one option.
- Choosable: make each option a `<button type="button" class="sr-option" aria-pressed="true|false">` (wrap in the `<li>`); the pressed one tints copper at 6%.
- Note: optional; keep it to two sentences.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
