Timeline — a roadmap of dated rows, each a white ledger-style row (16px radius, shadow-sm) with date · title + line · tag. The current row is the turn: ink with a 3px accent border. A hypothesis row sits flat on surface.

```jsx
<Timeline items={[
  { date: 'Mon YYYY', title: 'Step one, shipped', line: 'What shipped, in one line.', state: 'shipped' },
  { date: 'Mon YYYY', title: 'Step two, measured', line: 'The count behind it, as N of M.', state: 'measured', tagLabel: 'measured · context' },
  { date: 'Now', title: 'The step in flight', line: 'What it will change.', state: 'building', current: true },
  { date: 'Later', title: 'A later step', line: 'A claim, honestly labelled.', state: 'hypothesis' },
]} />
```

One current row. Inside <Ground ink> the current row flips to paper; everything else turns ink-surface.