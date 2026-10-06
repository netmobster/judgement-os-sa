# HTML recipes

Plain-HTML markup for every component. Each React component in `components/` renders exactly these classes (defined in `tokens/classes.css`), so this is the complete library. Link `styles.css` and write the markup; no script needed.

All sizes below are the UI scale (11–22px). On 1920×1080 slides, override to the slide scale (24px floor) — see **Slide-scale overrides** at the end.

---

## Grounds and the turn

```html
<div class="on-ink">…</div>     <!-- ink ground: every token rebinds (surface, text, accents, evidence colors) -->
<div class="on-light">…</div>   <!-- light ground (the default; use to switch back inside ink) -->

<h1>Choose your AI.<br><span class="hl">Keep yourself.</span></h1>   <!-- the two-clause headline; .hl is the turn -->
```

Cards, panels and ledger rows inside `.on-ink` turn `--color-ink-surface` and lose their shadow automatically.

## Evidence (the signature)

```html
<!-- tag: one of shipped · measured · building · hypothesis · open -->
<span class="ev ev-shipped">shipped</span>
<span class="ev ev-measured">measured · staging</span>
<span class="ev ev-building">building</span>
<span class="ev ev-hypothesis">hypothesis</span>

<!-- legend -->
<div class="ev-legend">
  <span class="ev ev-shipped">shipped</span>
  <span class="ev ev-measured">measured</span>
  <span class="ev ev-building">building</span>
  <span class="ev ev-hypothesis">hypothesis</span>
</div>

<!-- ledger row: figure · claim · tag. White + shadow = real. -->
<div class="ev-row">
  <div class="ev-row-figure">7 of 7</div>
  <div class="ev-row-claim">Heartbeat end to end on staging; 80 tests, 33 of 34 planted defects caught</div>
  <span class="ev ev-measured">measured · staging</span>
</div>

<!-- hypothesis row: add ev-row-open — flat surface, no shadow, muted figure -->
<div class="ev-row ev-row-open">
  <div class="ev-row-figure">Local</div>
  <div class="ev-row-claim">Whether vault and model on one desk run the same page unchanged. Nobody has done it yet</div>
  <span class="ev ev-hypothesis">hypothesis</span>
</div>
```

Consecutive `.ev-row`s space themselves (4px). Grid is `96px 1fr 108px`; widen the figure column inline when figures are long (`style="grid-template-columns:140px 1fr 140px"`).

## Stack row (the argument shape)

```html
<div class="stack-row">
  <div class="stack-row-label">Intelligence</div>
  <div class="stack-row-verb">Swap the model</div>
  <div class="stack-row-items">
    <span>Claude · Claude Code · Copilot <span class="ev ev-shipped">shipped</span></span>
    <span>ChatGPT <span class="ev ev-measured">measured</span></span>
    <span>Gemini · local <span class="ev ev-hypothesis">hypothesis</span></span>
  </div>
</div>
<div class="stack-row">
  <div class="stack-row-label">Infrastructure</div>
  <div class="stack-row-verb">Swap where it runs</div>
  <div class="stack-row-items">
    <span>SA cloud <span class="ev ev-shipped">shipped</span></span>
    <span>SUMMIT account <span class="ev ev-building">building</span></span>
  </div>
</div>
<!-- the closing row: ink, 3px accent border -->
<div class="stack-row stack-row-keep">
  <div class="stack-row-label">Operator layer</div>
  <div class="stack-row-verb">Don't swap this</div>
  <div class="stack-row-items"><span>State · profile · judgment · ledger. <b>Yours. Constant. selfActual.</b></span></div>
</div>
```

Grid is `120px 170px 1fr`; each item is its own `<span>` so it wraps as a unit. Stack rows sit on the light ground.

## Buttons and tags

```html
<button class="btn btn-primary">Open the ledger</button>
<button class="btn btn-secondary">Undo</button>
<button class="btn btn-ghost">See the manifest</button>
<a class="btn btn-primary" href="#">Join the alpha</a>              <!-- links may be buttons -->
<button class="btn btn-secondary btn-icon" aria-label="Lock"><svg …></svg></button>   <!-- 34×34, icon only -->
<button class="btn btn-primary btn-block">Speak the phrase</button> <!-- full width -->
<button class="btn btn-primary" disabled>Open the ledger</button>   <!-- 45% opacity -->

<!-- icon inside a button: Lucide, 15px, stroke 2, currentColor -->
<button class="btn btn-secondary"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>Undo</button>

<span class="tag tag-accent">core</span>
<span class="tag tag-accent-2">on</span>
<span class="tag tag-neutral">on demand</span>
<span class="tag tag-outline">alpha</span>
```

Primary is accent on white; on ink it flips to sky text on ink. Hover steps one ramp step down, pressed two. Never round into a pill.

## Cards, panels, statements

```html
<div class="card">
  <div class="card-kicker">The property</div>
  <div class="card-title">Continuity</div>
  <p class="card-body">What has to stay true. The invariant the whole generation is measured against.</p>
  <div class="card-meta">Updated · 7 Sept 2026</div>   <!-- optional -->
</div>
<div class="card card-focus">…</div>   <!-- 3px accent border, no shadow: the one to look at -->
<div class="card card-ink">…</div>     <!-- ink card on a light ground -->

<div class="panel">…</div>             <!-- 28px radius, surface tint, 24px padding -->
<div class="panel elev-md">…</div>     <!-- elev-sm | elev-md | elev-lg -->

<div class="rule-note">Everyone else offers the first row of this and calls it memory. <b>The operator layer is all four, running, in whatever window you open.</b></div>

<blockquote class="quote">"We hold your data and couldn't read it if we wanted to."</blockquote>
```

Card anatomy is fixed: kicker (11px uppercase) → title (Caprasimo 22px) → body (13px neutral-700). Cards are white with `--shadow-sm`; panels are flat surface.

## Forms

```html
<div class="field">
  <label for="phrase">Spoken phrase</label>
  <input id="phrase" class="input" placeholder="Say the line and stop.">
  <div class="text-muted" style="font-size:12px;margin-top:4px">Opens the gated sections for this window only.</div>   <!-- optional hint -->
</div>

<textarea class="input" rows="4"></textarea>

<label class="radio"><input type="radio" name="scope" checked><span class="dot"></span>This window</label>
<label class="radio"><input type="radio" name="scope"><span class="dot"></span>Every window</label>

<div class="seg">
  <label class="seg-opt"><input type="radio" name="view" checked>Ledger</label>
  <label class="seg-opt"><input type="radio" name="view">Mirror</label>
  <label class="seg-opt"><input type="radio" name="view">Manifest</label>
</div>
```

Inputs: 36px min height, 6px radius, hairline border → neutral-500 on hover → accent on focus. The segmented control is a radio group; the checked option fills accent.

## Navigation

```html
<nav class="nav">
  <span class="nav-brand"><img src="assets/selfactual-logo.png" alt="selfActual" style="height:22px;width:auto"></span>
  <a href="#" aria-current="page">Ledger</a>
  <a href="#">Mirror</a>
  <a href="#">Manifest</a>
  <button class="btn btn-primary">Join the alpha</button>
</nav>
```

`.nav-brand` pushes everything after it right (`margin-right:auto`). Use `<button>` for the action, not `<a>` — `.nav a` restyles anchors.

## Table

```html
<table class="table">
  <thead><tr><th>Key</th><th>Loaded</th><th>State</th></tr></thead>
  <tbody>
    <tr><td class="mono">working-rhythm</td><td>Bursts, then long tails. Never schedule the tail.</td><td><span class="ev ev-shipped">shipped</span></td></tr>
    <tr><td class="mono">finances</td><td>Gated — opens only on your spoken phrase</td><td><span class="tag tag-neutral">locked</span></td></tr>
  </tbody>
</table>
```

## Dialog

```html
<div class="dialog-backdrop">   <!-- fixed, 55% ink, no blur; add style="position:absolute" to scope it to a container -->
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dialog-title">Speak the phrase</div>
    <div class="dialog-body">Finances opens for this window only and closes when the window does.</div>
    <div class="dialog-actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Speak the phrase</button>
    </div>
  </div>
</div>
```

## Console — the product window

Only for a real screen (the Insights window). Never decorative.

```html
<div class="console">
  <div class="console-head">
    <div class="console-brand">selfactual <em>insights</em></div>
    <div class="console-status"><span class="console-dot"></span>heartbeat · 3 windows open</div>
  </div>
  <div class="console-insight">
    <div class="console-label">Insight</div>
    <div class="console-text">You moved <b>SA-212</b> to Monday in ChatGPT two minutes ago. Claude and the web already show it.</div>
    <div class="console-actions">
      <button type="button" class="console-chip console-chip-primary">Open the ledger</button>
      <button type="button" class="console-chip">Undo</button>
    </div>
  </div>
  <div class="console-section">Mirror · what this AI loaded<span>14 of 35</span></div>
  <div class="console-row"><span class="console-key">working-rhythm</span><span class="console-val">Bursts, then long tails. Never schedule the tail.</span><span class="console-state">core</span></div>
  <div class="console-row"><span class="console-key">failure-modes</span><span class="console-val">Says yes to adjacent problems. Flag scope drift.</span><span class="console-state">on demand</span></div>
  <div class="console-row console-row-locked"><span class="console-key">finances</span><span class="console-val">Gated — opens only on your spoken phrase</span><span class="console-state">locked</span></div>
</div>

<div class="console-loop">ask → dispatch → work → report → room → decide → dispatch again · nobody is the courier</div>
```

Keys, states, status and chips are mono; the insight text and values are Figtree. `console-row-locked` turns key and state alert-red.

## Timeline

```html
<ol class="tl">
  <li class="tl-row"><span class="tl-date">Mon YYYY</span><div><div class="tl-title">Step one, shipped</div><div class="tl-line">What shipped, in one line.</div></div><span class="ev ev-shipped">shipped</span></li>
  <li class="tl-row turn"><span class="tl-date">Now</span><div><div class="tl-title">The step in flight</div><div class="tl-line">What it will change.</div></div><span class="ev ev-building">building</span></li>
  <li class="tl-row tl-open"><span class="tl-date">Later</span><div><div class="tl-title">A later step</div><div class="tl-line">A claim, honestly labelled.</div></div><span class="ev ev-hypothesis">hypothesis</span></li>
</ol>
```

Dated rows on paper; the current row is `turn` (ink, 3px accent border); a hypothesis row is `tl-open` (flat surface). Inside `.on-ink` the turn flips to paper — the cut stays hard.

## Step list

```html
<ol class="steps">
  <li class="step"><span class="step-num"></span><div><div class="step-title">Step one</div><div class="step-note">A note, if the step needs one.</div></div><span class="ev ev-shipped">shipped</span></li>
  <li class="step"><span class="step-num"></span><div><div class="step-title">Step two</div><div class="step-note">The count behind it, as N of M.</div></div><span class="ev ev-measured">measured</span></li>
  <li class="step step-open"><span class="step-num"></span><div><div class="step-title">Step three</div><div class="step-note">Why it is still a hypothesis.</div></div><span class="ev ev-hypothesis">hypothesis</span></li>
</ol>
```

Leave `step-num` empty to number automatically (01, 02 …) or write the number. The number is set like a ledger figure. Each step wears its tag; hypotheses sit flat (`step-open`).

## Comparison

```html
<div class="compare">                                   <!-- compare-stack to stack -->
  <div class="card"><div class="card-kicker">Before</div><div class="card-title">The old way</div><p class="card-body">What it was, and the count that mattered.</p><div class="card-meta"><span class="ev ev-measured">measured · N of M</span></div></div>
  <div class="card turn"><div class="card-kicker">After</div><div class="card-title">The new way</div><p class="card-body">What changed, and the count that decided it.</p><div class="card-meta"><span class="ev ev-shipped">shipped</span></div></div>
</div>
```

Two cards with the fixed card anatomy. The after card is the turn. Both carry a tag in `card-meta`.

## Question panel

```html
<div class="panel qp">
  <div class="card-kicker">Decision · 01</div>
  <div class="qp-title">Which option should we take?</div>
  <div class="qp-options">
    <div class="qp-option qp-option-open"><div class="qp-option-name">Option one</div><div class="qp-option-meaning">What it means, in one line.</div><div class="qp-option-tags"><span class="ev ev-hypothesis">hypothesis</span></div></div>
    <div class="qp-option qp-option-rec"><div class="qp-option-name">Option two</div><div class="qp-option-meaning">What it means, in one line.</div><div class="qp-option-tags"><span class="qp-rec">Recommended</span><span class="ev ev-shipped">shipped</span></div></div>
    <div class="qp-option"><div class="qp-option-name">Option three</div><div class="qp-option-meaning">What it means, in one line.</div><div class="qp-option-tags"><span class="ev ev-building">building</span></div></div>
  </div>
  <div class="rule-note qp-note">What we already know that bears on it. <b>The line that decides it.</b></div>
</div>
```

Three or four options, each a row with a one-line meaning and its tag. `qp-option-rec` is the 3px accent border. For a choosable list make each option `<button type="button" class="qp-option" aria-pressed="true|false">`. The note is the existing `rule-note`.

## Figure

```html
<figure class="fig">
  <div class="fig-head"><span class="fig-num">Fig. 01</span><span>Series · context</span></div>
  <div class="fig-body">…a chart or a diagram…</div>
  <figcaption class="fig-caption"><span class="fig-claim"><b>33 of 34</b>: one sentence that states the figure's point.</span><span class="ev ev-measured">measured · context</span></figcaption>
</figure>
```

Number figures in reading order. The caption is the claim, stated once, with its tag at the right.

## Charts

```html
<!-- head: figure (a count out of a total) · label · tag -->
<div class="chart-head"><span class="chart-figure">33 of 34</span><span class="chart-label">what was counted</span><span class="ev ev-measured">measured · context</span></div>
<div class="bars"><div class="bar" style="--v:82%"></div><div class="bar" style="--v:91%"></div><div class="bar bar-hi" style="--v:97%"></div></div>
<div class="chart-axis"><span>Run 01</span><span>Run 10</span></div>

<!-- line: x = i / (n − 1) × 100, y = 100 − value / max × 100 -->
<div class="line"><div class="line-plot">
  <svg class="line-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline class="line-path" vector-effect="non-scaling-stroke" points="0,57 50,14 100,0"/></svg>
  <span class="line-pt" style="--x:0%;--y:57%"></span><span class="line-pt" style="--x:50%;--y:14%"></span><span class="line-pt line-pt-hi" style="--x:100%;--y:0%"></span>
</div></div>

<!-- small multiples: one shared max, each cell tagged -->
<div class="multiples" style="--n:3">
  <div class="multiple"><div class="chart-head"><span class="multiple-label">One</span><span class="chart-figure">14 of 35</span><span class="ev ev-measured">measured</span></div><div class="bars">…</div></div>
  <div class="multiple">…</div>
</div>
```

Bars are accent-200 with one accent-600; the line is accent-600 with round points. Flat color, one baseline, no grid. Every chart states its figure as a count out of a total and tags it; a chart never shows a percentage or a progress bar. On ink the accents turn sky.

## Flow

```html
<div class="flow">                                      <!-- flow-vertical to stack -->
  <div class="flow-node"><div class="flow-node-sub">Source</div><div class="flow-node-title">Input</div></div>
  <div class="flow-arrow"><span class="flow-arrow-glyph">→</span>dispatches</div>
  <div class="flow-node"><div class="flow-node-sub">Step</div><div class="flow-node-title">Process</div><span class="ev ev-shipped">shipped</span></div>
  <div class="flow-arrow"><span class="flow-arrow-glyph">→</span>reports</div>
  <div class="flow-node turn"><div class="flow-node-sub">Result</div><div class="flow-node-title">Output</div>What comes out, in one line<span class="ev ev-shipped">shipped</span></div>
</div>
```

Nodes are 6px-radius white boxes (120px minimum; the row wraps when it must); arrows are the → glyph with a verb under it. The operator layer is the turn. Below ~600px use `flow-vertical` with ↓.

## Layers

```html
<div class="layers">
  <div class="layer"><div class="layer-label">Layer one<span class="layer-verb">What swaps</span></div><div class="layer-items"><span class="layer-item">Item one <span class="ev ev-shipped">shipped</span></span><span class="layer-item">Item two <span class="ev ev-measured">measured</span></span><span class="layer-item">Item three <span class="ev ev-hypothesis">hypothesis</span></span></div></div>
  <div class="layer-via"><span class="layer-via-glyph">↓</span>swaps freely</div>
  <div class="layer"><div class="layer-label">Layer two<span class="layer-verb">What swaps</span></div><div class="layer-items">…</div></div>
  <div class="layer-via"><span class="layer-via-glyph">↓</span>all of them run on</div>
  <div class="layer turn"><div class="layer-label">The constant<span class="layer-verb">What stays</span></div><div class="layer-items"><span class="layer-item">What it holds</span><span class="layer-item">The line that stays</span></div></div>
</div>
```

The stack-row argument as a diagram: bands of boxes top to bottom, a verb on each arrow between bands, the operator layer as the turn at the bottom.

## Slide — 1920×1080

```html
<!-- light argument slide: kicker top, folio bottom -->
<section class="slide" style="width:1920px;height:1080px">
  <div class="slide-head">
    <span class="slide-kicker">02 · The problem</span>
    <span class="slide-date">7 Sept 2026</span>
  </div>
  <div>
    <h1 class="slide-title">Every time your AI changes,<br><span class="hl">you start over.</span></h1>
    <p class="slide-lead" style="margin-top:36px;max-width:46ch">New model, new tool, new agent, new teammate. Each one begins with you re-explaining how you think.</p>
  </div>
  <div class="slide-foot">
    <img class="slide-logo" src="assets/selfactual-logo.png" alt="">
    <span class="slide-number">02</span>
  </div>
</section>

<!-- ink cover / close: wordmark at 60px replaces the kicker, display type, ruled folio -->
<section class="slide slide-ink" style="width:1920px;height:1080px">
  <div class="slide-head">
    <img src="assets/selfactual-logo.png" alt="" style="height:60px;width:auto">
    <span class="slide-date">Internal · 7 Sept 2026</span>
  </div>
  <div>
    <h1 class="slide-display">Choose your AI.<br><span class="hl">Keep yourself.</span></h1>
    <p class="slide-lead" style="margin-top:36px;max-width:46ch">Use whatever models, tools, agents and infrastructure you want. selfActual is the operator layer that stays yours.</p>
  </div>
  <div class="slide-foot" style="border-top:1px solid var(--color-ink-line);padding-top:26px">
    <div class="ev-legend" style="font-size:24px">…four tags…</div>   <!-- or an empty <span></span> -->
    <span class="slide-number">01</span>
  </div>
</section>
```

Two-column argument: wrap the middle in `<div style="display:flex;align-items:center;gap:70px">` with the headline block at `flex:0 0 44%` (or `flex:1`) and the evidence / panel / console on the right. Headline sizes drop to 54–62px when a slide carries a ledger or a window (`style="font-size:62px"` on `.slide-title`).

## Slide-scale overrides

The component classes are UI-scale. On slides, every piece of text must be ≥ 24px, so restate sizes. Put this in a `<style>` block of the deck (or inline per element, as the source deck does):

```css
.slide .ev { font-size: 24px; }
.slide .ev-legend { font-size: 24px; gap: 8px 40px; }
.slide .ev-row { grid-template-columns: 190px 1fr 210px; gap: 22px; padding: 7px 26px; }
.slide .ev-row-figure { font-size: 32px; }
.slide .ev-row-claim { font-size: 25px; }
.slide .stack-row { grid-template-columns: 220px 300px 1fr; padding: 13px 26px; }
.slide .stack-row-label { font-size: 27px; }
.slide .stack-row-verb { font-size: 24px; }
.slide .stack-row-items { font-size: 25px; }
.slide .stack-row-keep { padding: 18px 26px; }
.slide .card-kicker { font-size: 24px; }
.slide .rule-note { font-size: 28px; }
/* the additions */
.slide .tl-row, .slide .step, .slide .layer, .slide .qp-option { padding: 13px 26px; }
.slide .tl-date, .slide .fig-head, .slide .chart-axis, .slide .qp-rec, .slide .flow-arrow, .slide .layer-via, .slide .flow-node-sub, .slide .multiple-label { font-size: 24px; }
.slide .tl-title, .slide .step-title, .slide .qp-option-name, .slide .flow-node-title, .slide .layer-label { font-size: 30px; }
.slide .tl-line, .slide .step-note, .slide .qp-option-meaning, .slide .fig-caption, .slide .chart-label, .slide .flow-node, .slide .layer-item { font-size: 25px; }
.slide .step-num, .slide .chart-figure { font-size: 40px; }
.slide .qp-title { font-size: 44px; }
.slide .bars, .slide .line { height: 240px; }
/* the console on slide 05 */
.deck-console .console-head { padding: 22px 30px 20px; }
.deck-console .console-brand, .deck-console .console-status, .deck-console .console-label, .deck-console .console-chip,
.deck-console .console-section, .deck-console .console-section span, .deck-console .console-key, .deck-console .console-state { font-size: 24px; }
.deck-console .console-text { font-size: 26px; }
.deck-console .console-val { font-size: 25px; }
.deck-console .console-dot { width: 12px; height: 12px; }
.deck-console .console-insight { margin: 22px 30px 18px; padding: 14px 20px; }
.deck-console .console-section { padding: 16px 30px 10px; gap: 24px; }
.deck-console .console-row { padding: 10px 30px; }
.deck-console .console-row:last-child { padding-bottom: 20px; }
```

`templates/deck.html` already includes these and a scale-to-fit stage with keyboard navigation and one-slide-per-page print.

## Icons

Lucide (https://lucide.dev), inline SVG on `currentColor`, stroke-width 2. 20px in chrome, 15px inside buttons. The source uses six glyphs: plus, chevron-right, square-minus, clock, lock, rotate-ccw. Icons never decorate a statement and never appear on slides.
