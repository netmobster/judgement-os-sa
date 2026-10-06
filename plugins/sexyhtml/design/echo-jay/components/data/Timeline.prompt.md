Timeline — date, square marker, condensed title, one line. Vertical in the sidebar; horizontal on slides.

```jsx
<Timeline items={[
  { date: 'MM.DD', title: 'Step one done', line: 'What happened, in one line.', state: 'done' },
  { date: 'MM.DD', title: 'The next step', line: 'What it will change.', state: 'next' },
  { date: 'MM.DD', title: 'A later step', line: 'Not started yet.', state: 'open' },
]} />
<Timeline horizontal items={…} />
```

One next per timeline — it is the gold square. Dates in mono; wider dates via dateWidth.