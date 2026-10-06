Figure: a numbered frame for a chart or a drawing (`.sr-fig`): a 1px edge at 2px radius, a mono head with the number in copper ("Fig. 01") and a title in dust, the body, then a hair rule and a caption in sans 15px that states the point, with the point itself in bone. A StatusTag may sit at the right of the head.

## Markup

```html
<figure class="sr-fig">
  <div class="sr-fig-head"><span class="sr-fig-n">Fig. 01</span><span>Rolls per session</span><span class="sr-tag sr-tag-held">Held</span></div>
  <div class="sr-fig-body">…a chart or drawing…</div>
  <figcaption class="sr-fig-cap"><b>Eighteen rolls over four sessions, eight of them in the last.</b> The one in oxblood lost a roll.</figcaption>
</figure>
```

## Props

- Number: "Fig. 01", "Fig. 02" in reading order.
- Tag: optional, any StatusTag.
- Caption: one sentence that states the point in `<b>`, one more at most.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
