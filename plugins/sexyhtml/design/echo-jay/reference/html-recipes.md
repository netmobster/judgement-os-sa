# HTML recipes

Plain-HTML markup for every ECHO-JAY component. The React components in `components/` render exactly these classes (`tokens/classes.css`), so this is the whole library. Link `styles.css`; the only script you need is the ~20 lines for the theme and A−/A+ controls, already in `templates/artifact.html`.

Grounds switch on `<html data-theme="dark">`. Leave the attribute off to follow the host. Text size switches on `<html data-size="-1|1">`.

---

## Shell — the artifact

```html
<div class="ej-shell">                       <!-- fills the host pane; add ej-shell-framed to preview at 500px on a desk -->
  <header class="ej-header">…</header>
  <section class="ej-titleblock">…</section>
  <article class="ej-content">…</article>
  <footer class="ej-footer"><span>ECHO-JAY // Footer</span><span>END OF FILE</span></footer>
</div>
```

Preview on a desk: wrap in `<div class="ej-desk ej-desk-grid">` and use `ej-shell ej-shell-framed`.

## Header: nameplate row + readout strip

```html
<header class="ej-header">
  <div class="ej-header-row">
    <div class="ej-header-meta">
      <span class="ej-nameplate">FOR NAME</span>
      <span class="ej-label">01 // Label</span>
    </div>
    <div class="ej-controls">
      <button type="button" class="ej-ctl" aria-label="Smaller text">A−</button>
      <button type="button" class="ej-ctl" aria-label="Larger text">A+</button>
      <button type="button" class="ej-ctl">DARK</button>
    </div>
  </div>
  <div class="ej-readout">
    <span><span class="ej-dot"></span>SYS.ECHO</span>
    <span class="ej-readout-sep">//</span>
    <span class="ej-readout-live">14:02:33</span>        <!-- gold + pulse: a value that is live -->
    <span class="ej-readout-sep">//</span>
    <span>Value</span>                                   <!-- optional: the artifact's own values, each after a // -->
    <span class="ej-readout-end">YYYY.MM.DD</span>      <!-- pushed right -->
  </div>
</header>
```

The nameplate is the wordmark: gold block, chamfered right edge, condensed caps. There is no logo. The readout is mono uppercase, separated by `//`; only genuinely live values get `ej-readout-live`.

## Title block

```html
<section class="ej-titleblock">
  <h1 class="ej-title">Title</h1>
  <p class="ej-subtitle">Subtitle: one to three plain sentences.</p>
  <div class="ej-byline"><span>Byline</span><span>YYYY.MM.DD</span></div>
</section>
```

Then everything else goes in `<article class="ej-content">` — a column with 22px gaps. Paragraphs, lists and the blocks below are its direct children.

## Labels, section numbers, figures

```html
<span class="ej-label">01 // Label</span>                       <!-- mono 11px uppercase, faint -->
<div class="ej-label-row"><span class="ej-label">TBL.01 // Table</span><span class="ej-label">2 rows</span></div>
<div class="ej-section-head"><h2 class="ej-h2">Section</h2><span class="ej-label">Label</span></div>
<span class="ej-figure">12</span>                                   <!-- condensed gold number with a glow -->
<p>Running text with a <span class="ej-hl">highlighted phrase</span>.</p>   <!-- gold highlight in running text -->
```

Number sections `01 //`, `02 //`; name figures `FIG.01 //`, tables `TBL.04 //`, panels `PNL.02 //`. Dates in readouts are `YYYY.MM.DD`; in prose they are written normally.

## Panel — raised surface with corner brackets

```html
<div class="ej-panel ej-stack">…</div>                       <!-- ej-stack = 10px column gap -->
<div class="ej-panel">
  <div class="ej-panel-head"><span class="ej-label">PNL.01 // Panel</span><span class="ej-figure">12</span></div>
  …
</div>
<div class="ej-panel ej-panel-plain">…</div>                 <!-- no brackets -->
```

## Receipt — the gold-ground block

```html
<div class="ej-receipt">
  <div>
    <div class="ej-label">Receipt // verified</div>
    <div class="ej-receipt-body">What was done, in one line.</div>
  </div>
  <span class="ej-receipt-stamp">CC · MM.DD</span>
</div>
```

One per artifact at most. It is the proof line: what was done, stamped with who and when.

## Buttons

```html
<button type="button" class="ej-btn ej-btn-primary">Copy text</button>        <!-- gold, chamfered corner -->
<button type="button" class="ej-btn ej-btn-secondary">Open link</button>
<button type="button" class="ej-btn ej-btn-ghost">See more</button>
<button type="button" class="ej-btn ej-btn-primary ej-btn-sm">Run</button>
<a class="ej-btn ej-btn-secondary" href="#">Open link</a>
<div class="ej-btn-row">…buttons…</div>
```

Labels are verbs with objects, sentence case in the source (CSS uppercases). One primary per block.

## Tags

```html
<span class="ej-tag">draft</span>
<span class="ej-tag ej-tag-gold">live</span>
<span class="ej-tag ej-tag-steel">v3</span>
<span class="ej-tag ej-tag-ok">passing</span>
<span class="ej-tag ej-tag-alert">blocked</span>
<div class="ej-tag-row">…</div>
```

## Forms

```html
<div class="ej-field">
  <label class="ej-label" for="field">02 // Input</label>
  <input id="field" class="ej-input" placeholder="Placeholder">
  <div class="ej-field-hint">Hint: one short line.</div>
</div>

<div class="ej-inline"><input class="ej-input" placeholder="Placeholder"><button type="button" class="ej-btn ej-btn-primary">Run</button></div>

<textarea class="ej-input" rows="4"></textarea>

<select class="ej-input"><option>Option one</option><option>Option two</option><option>Option three</option></select>

<!-- switch: input, state text (ON/OFF comes from CSS), track -->
<label class="ej-switch"><input type="checkbox" checked><span class="ej-switch-state"></span><span class="ej-switch-track"></span></label>

<!-- switch list inside a panel -->
<div class="ej-panel ej-panel-list">
  <span class="ej-label">03 // Settings</span>
  <div class="ej-switch-list">
    <div class="ej-switch-row"><span>Setting one</span><label class="ej-switch"><input type="checkbox" checked><span class="ej-switch-state"></span><span class="ej-switch-track"></span></label></div>
    <div class="ej-switch-row"><span>Setting two</span><label class="ej-switch"><input type="checkbox"><span class="ej-switch-state"></span><span class="ej-switch-track"></span></label></div>
  </div>
</div>
```

Inputs are recessed (inset shadow), square, and glow gold on focus.

## Table

```html
<div class="ej-table-wrap">
  <table class="ej-table">
    <thead><tr><th>Key</th><th>Value</th><th>Note</th><th class="ej-num">Count</th></tr></thead>
    <tbody>
      <tr><td class="ej-key">Row one</td><td class="ej-muted">Value</td><td>Note</td><td class="ej-num">3</td></tr>
      <tr><td class="ej-key">Row two</td><td class="ej-muted">Value</td><td>Note</td><td class="ej-num">1</td></tr>
    </tbody>
  </table>
</div>
```

`ej-key` = mono gold identifier column. `ej-num` = right-aligned mono numbers. `ej-muted` = secondary column.

## Bars — a small chart

```html
<div class="ej-panel">
  <div class="ej-panel-head"><span class="ej-label">FIG.01 // Series</span><span class="ej-figure">12</span></div>
  <div class="ej-bars">
    <div class="ej-bars-target" style="--v:28%"></div>           <!-- optional dashed gold target line (from the top) -->
    <div class="ej-bar" style="--v:20%"></div>
    <div class="ej-bar" style="--v:60%"></div>
    <div class="ej-bar ej-bar-hi" style="--v:100%"></div>          <!-- the bar that matters: gold + glow -->
  </div>
  <div class="ej-bars-axis"><span>MM.DD</span><span>MM.DD</span></div>
</div>
```

Steel bars, one gold. Up to ~30 bars in a 500px column. For a y axis, wrap in `<div class="ej-chart">` with `<div class="ej-chart-y"><span>10</span><span>0</span></div>` before the well, counts in mono. Values are counts; a bar never shows a percentage. For anything richer, draw an inline SVG using the same tokens.

## Key / value

```html
<dl class="ej-kv">
  <dt>Key</dt><dd>Value</dd>
  <dt>Updated</dt><dd class="ej-mono">YYYY.MM.DD · HH:MM</dd>
</dl>
```

## Flow — architecture and process diagrams

```html
<div class="ej-flow">
  <div class="ej-node"><div class="ej-node-title">Input</div><div class="ej-node-sub">source</div>What comes in.</div>
  <span class="ej-arrow">→</span>
  <div class="ej-node ej-node-hi"><div class="ej-node-title">Process</div><div class="ej-node-sub">step</div>What happens.</div>
  <span class="ej-arrow">→</span>
  <div class="ej-node ej-node-well"><div class="ej-node-title">Output</div><div class="ej-node-sub">result</div>What goes out.</div>
</div>

<div class="ej-flow ej-flow-vertical">…same nodes, arrows are ↓…</div>
```

Nodes are raised with a steel bracket; `ej-node-hi` turns the bracket and border gold; `ej-node-well` is recessed (a store, a sink). Three or four nodes per row at 500px; stack vertically beyond that.

## Code

```html
<div class="ej-label-row"><span class="ej-label">file.md</span><span class="ej-label">3 lines</span></div>
<pre class="ej-code">key: value
key_two: value
key_three: value</pre>
```

## Divider

```html
<hr class="ej-divider">                        <!-- steel hazard stripes, 5px -->
<hr class="ej-divider ej-divider-gold">        <!-- gold: a hard section break -->
<hr class="ej-divider ej-divider-inset">       <!-- inset to the content gutter -->
```

## Callout

```html
<div class="ej-callout">                                    <!-- info: steel edge -->
  <span class="ej-label">05 // Note</span>
  <div class="ej-callout-title">A note that must land</div>
  <div class="ej-callout-body">One or two sentences that say what to know.</div>
</div>
<div class="ej-callout ej-callout-warning">…</div>            <!-- alert edge -->
<div class="ej-callout ej-callout-decision">                  <!-- gold edge -->
  <span class="ej-label">06 // Decision</span>
  <div class="ej-callout-title">The decision, in one line</div>
  <div class="ej-callout-body">What it means for the reader, in one sentence.</div>
  <div class="ej-callout-actions"><button type="button" class="ej-btn ej-btn-secondary ej-btn-sm">Open the link</button></div>
</div>
```

A numbered label, a title, one or two sentences, an optional action. The action stays secondary unless the decision itself is the block's one gold thing.

## Stat row

```html
<div class="ej-stats" style="--n:3">
  <div class="ej-stat"><span class="ej-stat-figure">14</span><span class="ej-label">Label</span><span class="ej-stat-sub">Detail</span></div>
  <div class="ej-stat ej-stat-hi"><span class="ej-stat-figure">0</span><span class="ej-label">Label</span></div>
  <div class="ej-stat"><span class="ej-stat-figure">2</span><span class="ej-label">Label</span></div>
</div>
```

Two to four counts (`--n`), each a condensed figure over a mono label, hairlines between. `ej-stat-hi` on one cell at most. Counts only — never a percentage, a score or a progress bar.

## Timeline

```html
<ol class="ej-timeline">                                     <!-- add ej-timeline-h to run across (slides) -->
  <li class="ej-tl-item ej-tl-done"><span class="ej-tl-date">MM.DD</span><span class="ej-tl-mark"></span><div class="ej-tl-body"><div class="ej-tl-title">Step one done</div><div class="ej-tl-line">What happened, in one line.</div></div></li>
  <li class="ej-tl-item ej-tl-next"><span class="ej-tl-date">MM.DD</span><span class="ej-tl-mark"></span><div class="ej-tl-body"><div class="ej-tl-title">The next step</div><div class="ej-tl-line">What it will change.</div></div></li>
  <li class="ej-tl-item ej-tl-open"><span class="ej-tl-date">MM.DD</span><span class="ej-tl-mark"></span><div class="ej-tl-body"><div class="ej-tl-title">A later step</div><div class="ej-tl-line">Not started yet.</div></div></li>
</ol>
```

States: `ej-tl-done` (steel square), `ej-tl-next` (gold square, one per timeline), `ej-tl-open` (hollow square, dashed line). Wider dates: `style="--ej-tl-date-w:84px"`.

## Step list

```html
<ol class="ej-steps">
  <li class="ej-step ej-step-done"><span class="ej-step-num">01</span><div class="ej-step-title">Step one</div><span class="ej-tag ej-tag-steel">done</span><div class="ej-step-note">A note, if the step needs one.</div></li>
  <li class="ej-step ej-step-next"><span class="ej-step-num">02</span><div class="ej-step-title">Step two</div><span class="ej-tag ej-tag-gold">next</span></li>
  <li class="ej-step ej-step-blocked"><span class="ej-step-num">03</span><div class="ej-step-title">Step three</div><span class="ej-tag ej-tag-alert">blocked</span><div class="ej-step-note">What it waits on.</div></li>
</ol>
```

Leave `ej-step-num` empty to number automatically. States map to tags: done → steel, next → gold, blocked → alert.

## Comparison

```html
<div class="ej-compare">                                     <!-- add ej-compare-stack to stack -->
  <div class="ej-compare-side">
    <div class="ej-label-row"><span class="ej-label">A // Before</span></div>
    <div class="ej-compare-title">The old way</div>
    <div class="ej-compare-body">What it was, and the count that mattered.</div>
  </div>
  <div class="ej-compare-side ej-compare-chosen">
    <div class="ej-label-row"><span class="ej-label">B // After</span><span class="ej-label">chosen</span></div>
    <div class="ej-compare-title">The new way</div>
    <div class="ej-compare-body">What changed, and the count that decided it.</div>
  </div>
</div>
```

The chosen side wears the gold brackets and gold labels; the other stays plain.

## Question panel

```html
<div class="ej-question">
  <span class="ej-label">Q.01 // Decision</span>
  <div class="ej-question-title">Which option should we take?</div>
  <ul class="ej-options">
    <li><div class="ej-option"><span class="ej-option-mark"></span><span class="ej-option-name">Option one</span><span class="ej-option-meaning">What it means, in one line.</span></div></li>
    <li><div class="ej-option ej-option-rec"><span class="ej-option-mark"></span><span class="ej-option-name">Option two</span><span class="ej-label">recommended</span><span class="ej-option-meaning">What it means, in one line.</span></div></li>
    <li><div class="ej-option"><span class="ej-option-mark"></span><span class="ej-option-name">Option three</span><span class="ej-option-meaning">What it means, in one line.</span></div></li>
  </ul>
  <div class="ej-note"><span class="ej-label">Note</span>What we already know that bears on it.</div>
</div>
```

Three or four options. `ej-option-rec` marks the recommended one (gold square + gold label). For a choosable list make each option a `<button type="button" class="ej-option" aria-pressed="true|false">`.

## Quote

```html
<figure class="ej-quote">                                    <!-- ej-quote-gold when the quote is the point -->
  <blockquote class="ej-quote-text">A line someone said, in their words.</blockquote>
  <figcaption class="ej-quote-cite"><b>Name</b> · Source, MM.DD</figcaption>
</figure>
```

Quotation marks come from CSS. The cite is who, then where.

## Figure — the numbered frame

```html
<figure class="ej-fig">
  <div class="ej-fig-head"><span class="ej-label">FIG.01 // Series</span><span class="ej-label">Detail</span></div>
  <div class="ej-fig-body">…any chart or diagram…</div>
  <figcaption class="ej-fig-caption"><b>One sentence that states the figure's point.</b> A second, if it needs one.</figcaption>
</figure>
```

Steel brackets (structure), so the one gold thing inside the chart stays the only gold. The caption is one sentence that states the point; bold the finding.

## Line chart

```html
<div class="ej-chart">
  <div class="ej-chart-y"><span>9</span><span>0</span></div>
  <div class="ej-line ej-line-values">                        <!-- drop ej-line-values when not printing counts -->
    <div class="ej-line-plot">
      <svg class="ej-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline class="ej-line-path" vector-effect="non-scaling-stroke" points="0,77.8 50,33.3 100,0"/></svg>
      <span class="ej-line-pt" style="--x:0%;--y:77.8%"></span><span class="ej-line-val" style="--x:0%;--y:77.8%">2</span>
      <span class="ej-line-pt" style="--x:50%;--y:33.3%"></span><span class="ej-line-val" style="--x:50%;--y:33.3%">6</span>
      <span class="ej-line-pt ej-line-pt-hi" style="--x:100%;--y:0%"></span><span class="ej-line-val ej-line-val-hi" style="--x:100%;--y:0%">9</span>
    </div>
  </div>
  <div class="ej-bars-axis"><span>Mon</span><span>Sun</span></div>
</div>
```

x = index / (n − 1) × 100, y = 100 − value / max × 100. Square points, one gold. Optional `<div class="ej-line-target" style="--v:40%">` inside the plot for a dashed target.

## Small multiples

```html
<div class="ej-multiples" style="--n:3">
  <div class="ej-multiple"><div class="ej-label-row"><span class="ej-label">One</span><span class="ej-multiple-count">9</span></div><div class="ej-bars">…</div></div>
  <div class="ej-multiple ej-multiple-hi"><div class="ej-label-row"><span class="ej-label">Two</span><span class="ej-multiple-count">4</span></div><div class="ej-bars">…one ej-bar-hi…</div></div>
  <div class="ej-multiple"><div class="ej-label-row"><span class="ej-label">Three</span><span class="ej-multiple-count">1</span></div><div class="ej-bars">…</div></div>
</div>
```

Same scale in every cell (compute `--v` against one shared max). Only the `ej-multiple-hi` cell carries a gold bar or point.

## Sequence

```html
<div class="ej-seq" style="--n:3">
  <div class="ej-seq-actor" style="grid-column:1"><div class="ej-node"><div class="ej-node-title">Client</div><div class="ej-node-sub">asks</div></div></div>
  <div class="ej-seq-actor" style="grid-column:2"><div class="ej-node"><div class="ej-node-title">Service</div><div class="ej-node-sub">does the work</div></div></div>
  <div class="ej-seq-actor" style="grid-column:3"><div class="ej-node ej-node-well"><div class="ej-node-title">Store</div><div class="ej-node-sub">data</div></div></div>
  <div class="ej-seq-msg" style="grid-column:1 / 3;grid-row:2;--k:2"><span class="ej-seq-label">sends request</span><div class="ej-seq-arrow"></div></div>
  <div class="ej-seq-msg" style="grid-column:2 / 4;grid-row:3;--k:2"><span class="ej-seq-label">reads record</span><div class="ej-seq-arrow"></div></div>
  <div class="ej-seq-msg ej-seq-msg-back ej-seq-msg-dashed" style="grid-column:2 / 4;grid-row:4;--k:2"><span class="ej-seq-label">returns record</span><div class="ej-seq-arrow"></div></div>
  <div class="ej-seq-msg ej-seq-msg-back ej-seq-msg-hi" style="grid-column:1 / 3;grid-row:5;--k:2"><span class="ej-seq-label">renders result</span><div class="ej-seq-arrow"></div></div>
</div>
```

A message from actor a to actor b (0-based, a < b) spans `grid-column: a+1 / b+2` with `--k: b−a+1`. `ej-seq-msg-back` points left, `ej-seq-msg-dashed` is a reply, `ej-seq-msg-hi` is the one gold message. Labels are verbs.

## Layers

```html
<div class="ej-layers">
  <div class="ej-layer"><span class="ej-label">Surface</span><div class="ej-layer-items"><div class="ej-node"><div class="ej-node-title">Page</div><div class="ej-node-sub">what people see</div></div><div class="ej-node"><div class="ej-node-title">Command line</div></div></div></div>
  <div class="ej-layer-via"><span class="ej-arrow">↓</span>renders</div>
  <div class="ej-layer ej-layer-hi"><span class="ej-label">Logic</span><div class="ej-layer-items"><div class="ej-node"><div class="ej-node-title">Service</div></div><div class="ej-node"><div class="ej-node-title">Rules</div></div></div></div>
  <div class="ej-layer-via"><span class="ej-arrow">↓</span>reads · writes</div>
  <div class="ej-layer"><span class="ej-label">Store</span><div class="ej-layer-items"><div class="ej-node ej-node-well"><div class="ej-node-title">Database</div></div></div></div>
</div>
```

Bands of boxes with a mono label; `ej-layer-via` is the verb on the arrow between bands; `ej-layer-hi` is the one gold band. Label width: `style="--ej-layer-label-w:110px"`.

## Slide — 1920×1080

```html
<section class="ej-slide" data-theme="light">                 <!-- data-theme="dark" for an ink slide -->
  <div class="ej-slide-head"><span class="ej-nameplate">FOR NAME</span><span class="ej-label">02 // Section</span></div>
  <h1 class="ej-slide-title">A plain statement,<br><span class="ej-hl">then its turn.</span></h1>
  <div class="ej-slide-body">
    <div class="ej-slide-cols">
      <p>One or two plain sentences that carry the argument.</p>
      <div class="ej-stats" style="--n:3">…</div>
    </div>
  </div>
  <footer class="ej-slide-foot"><span>ECHO-JAY // Deck</span><span>02</span></footer>
</section>
```

Literal px inside: 84px title (`ej-slide-title-sm` = 64px), 30px body, 24px mono. Every block class is rescaled inside `.ej-slide` so nothing drops below 24px. `ej-slide-cols` is the 44/56 split. To preview, wrap in a fixed-size box and `transform: scale()` from the top-left.


## Motion

`ej-dot` blinks (2s), `ej-readout-live` and `ej-pulse` breathe a gold glow (3s). That is the whole motion vocabulary; both stop under `prefers-reduced-motion`. Nothing slides, bounces or fades in.

## Icons

Inline Lucide SVGs (https://lucide.dev), stroke-width 2, `currentColor`, 14px inside buttons and 16px in rows. No icon fonts, no emoji. Unicode is typography, not iconography: `//` separates readout parts, `·` separates label parts, `→` and `↓` are flow arrows.
