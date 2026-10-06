SlideFrame — the 1920×1080 slide. Nameplate and numbered label top, 84px condensed title, body, mono footer on a hairline.

```jsx
<SlideFrame label="02 // Section" title={<>A plain statement, <span className="ej-hl">then its turn.</span></>} footer={['ECHO-JAY // Deck', '02']}>
  <div className="ej-slide-cols">
    <p>One or two plain sentences that carry the argument.</p>
    <StatRow stats={[{ value: '14', label: 'Label' }, { value: '0', label: 'Label', hi: true }, { value: '2', label: 'Label' }]} />
  </div>
</SlideFrame>
<SlideFrame theme="dark" scale={0.5} … />
```

Every block (StatRow, Timeline horizontal, Callout, Figure, Sequence…) rescales inside the slide to a 24px floor. The highlighted word in the title is the slide's gold.