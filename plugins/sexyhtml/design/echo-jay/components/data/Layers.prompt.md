Layers — bands of nodes top to bottom, a mono label per band, a verb on each arrow between bands.

```jsx
<Layers layers={[
  { label: 'Surface', items: [{ title: 'Page', sub: 'what people see' }, 'Terminal'] },
  { label: 'Logic', via: 'renders', hi: true, items: ['Service', 'Rules'] },
  { label: 'Store', via: 'reads · writes', items: [{ title: 'Database', sub: 'records', well: true }] },
]} />
```

Three or four bands at 500px. One hi band at most.