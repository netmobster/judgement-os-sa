Comparison — two cards side by side. The before card is paper; the after card is the turn (ink, 3px accent border). Both carry a tag.

```jsx
<Comparison
  before={{ kicker: 'Before', title: 'The old way', body: 'What it was, and the count that mattered.', state: 'measured', tagLabel: 'measured · N of M' }}
  after={{ kicker: 'After', title: 'The new way', body: 'What changed, and the count that decided it.', state: 'shipped' }} />
```

Use stack for long bodies. State the count that decided it in the body or the tag.