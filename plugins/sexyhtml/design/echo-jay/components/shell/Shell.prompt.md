Shell — the whole artifact: gold nameplate, meta label, Controls, an optional Readout strip, then your TitleBlock and content, then a footer.

```jsx
<Shell meta="01 // Label" readout={<Readout items={[{ text: 'SYS.ECHO', dot: true }, { text: '14:02:33', live: true }]} />} footer={['ECHO-JAY // Footer', 'END OF FILE']}>
  <TitleBlock title="Title" subtitle="Subtitle: one to three plain sentences." byline={['Byline', 'YYYY.MM.DD']} />
  <article className="ej-content">…</article>
</Shell>
```

framed + desk render the 500px preview on the gridded desk. Fills the pane otherwise.