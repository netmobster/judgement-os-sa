SlideFrame: a 1920×1080 slide on ink (`.sr-slide`). The orbit mark and the wordmark top left (mono 24px at 0.24em), a label top right in copper-hi, the title in Plex Serif 300 at 104px (`sr-slide-title-sm` for 76px) with the turn in italic copper-hi (`<em class="text">`), a body at 30px sans in dust-hi, and a mono footer on a hair rule. Literal px throughout; nothing on a slide is under 24px, and every block above is rescaled inside `.sr-slide` to keep that floor. `.sr-slide-cols` splits the body 5/6.

## Markup

```html
<section class="sr-slide">
  <div class="sr-slide-head">
    <div class="sr-slide-mark"><svg class="sr-draw sr-orbit-sm" viewBox="0 0 24 24">…</svg><span>Seren&nbsp;AI</span></div>
    <span class="sr-slide-label">The playtest &middot; 02</span>
  </div>
  <h1 class="sr-slide-title">The world knows<br><em class="text">what happened.</em></h1>
  <div class="sr-slide-body"><div class="sr-slide-cols"><p>…</p><div class="sr-chart">…</div></div></div>
  <footer class="sr-slide-foot"><span>Seren &middot; the playtest</span><span>02 / 09</span></footer>
</section>
```

## Props

- Title size: default 104px, `sr-slide-title-sm` 76px for long titles.
- Body: prose, or `sr-slide-cols` with a block on the right.
- To preview, wrap in a fixed box and `transform: scale()` from the top left; to print, one slide per 1920×1080 page.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
