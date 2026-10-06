StatRow — two to four counts in a hairlined strip. Condensed 30px figure over an 11px mono label.

```jsx
<StatRow stats={[{ value: '12', label: 'Label', sub: 'Detail' }, { value: '0', label: 'Label', hi: true }, { value: '2', label: 'Label' }]} />
```

Counts only: 14, 0, +2. Never a percentage, a score or a progress bar. One hi at most — the component enforces it.