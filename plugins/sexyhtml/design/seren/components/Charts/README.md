Charts: bars in copper and a line, as counts (`.sr-chart`). The head is a Numbers figure (mono 34px bold, tabular) with a mono label and a StatusTag. Bars (`.sr-bars`) stand on one edge rule with no grid: copper at 50% with the one that matters in full copper (`is-hi`) and a session that lost something in oxblood (`is-lost`); each prints its count above it from `data-n`. The line (`.sr-line`) is a 1.25px copper polyline with 7px square points, counts above the points, the last one filled. Axis labels are mono, uppercase, dust. Values are counts; a chart never shows a percentage or a progress bar.

## Markup

```html
<div class="sr-chart">
  <div class="sr-chart-head"><span class="sr-chart-count">18</span><span class="sr-chart-label">ledger entries</span><span class="sr-tag sr-tag-held">Held</span></div>
  <div class="sr-bars">
    <div class="sr-bar" data-n="3" style="--v:38%"></div>
    <div class="sr-bar is-lost" data-n="5" style="--v:62%"></div>
    <div class="sr-bar is-hi" data-n="8" style="--v:100%"></div>
  </div>
  <div class="sr-axis"><span>Session 1</span><span>Session 4</span></div>
</div>

<div class="sr-line"><div class="sr-line-plot">
  <svg class="sr-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline class="sr-line-path" vector-effect="non-scaling-stroke" points="0,83.3 50,38.9 100,0"/></svg>
  <span class="sr-line-pt" data-n="9" style="--x:0%;--y:83.3%"></span>
  <span class="sr-line-pt is-hi" data-n="54" style="--x:100%;--y:0%"></span>
</div></div>
```

## Props

- Bar: `--v` is the height as a share of the tallest bar; `data-n` is the count; `is-hi` one bar, `is-lost` any bar that lost.
- Line: x = i / (n − 1) × 100, y = 100 − count / max × 100, for both the polyline points and each `.sr-line-pt`.
- Head: count · label · tag, in that order. Up to about 12 bars or points in a 60ch column.

*The preview is a static rendition of the class layer (`components/bundle.css`, which is seren.css): markup in Seren's classes, not a React component. The text is placeholder.*
