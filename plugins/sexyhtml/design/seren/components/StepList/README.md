StepList: numbered steps on hair rules (`.sr-steps`), in the `.what-grid3` grid: a 56px mono number (`01`, counted by CSS, in copper), the step in Plex Serif 19px bone with an optional note in sans dust, and a StatusTag at the right. The number takes the state's colour: verdigris when held, dust when open, oxblood when lost; a lost step's text drops to dust.

## Markup

```html
<ol class="sr-steps">
  <li class="sr-step is-held">
    <span class="sr-step-n"></span>
    <p class="sr-step-text">Roll in the open and print the working.<span class="sr-step-note">54 facts, 6 secrets.</span></p>
    <span class="sr-tag sr-tag-held">Held</span>
  </li>
</ol>
```

## Props

- Step state: `is-held`, `is-open`, `is-lost`; pair it with the matching tag.
- Number: leave `.sr-step-n` empty to count automatically, or write it.
- Note: optional, one line, counts welcome.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
