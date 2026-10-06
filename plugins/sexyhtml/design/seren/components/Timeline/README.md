Timeline: sessions and days down the page, each with what changed in the world (`.sr-tl`). Rows on hair rules in the `.how-grid3-2` grid: a 120px mono column for the when (`Session 4` in bone, `Day 31` in dust), then the change in Plex Serif 17px bone, with an optional count line in sans dust under it. The live session has the pulsing verdigris dot; a session that lost something is oxblood; a session not yet played is open, in dust italic.

## Markup

```html
<ol class="sr-tl">
  <li class="sr-tl-row is-live">
    <div class="sr-tl-when"><b>Session 4</b><span>Day 31</span></div>
    <p class="sr-tl-what">The party reached the mill before the collectors did.<span class="sr-tl-note">Running · 2 facts so far</span></p>
  </li>
</ol>
```

## Props

- Row state: none (held), `is-live`, `is-lost`, `is-open`.
- When: `<b>` the session, `<span>` the day; either may be omitted.
- What: one sentence or two in `.sr-tl-what`; `.sr-tl-note` carries counts ("3 facts written · 2 rolls").

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
