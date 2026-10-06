StepList — numbered steps as white rows: Caprasimo number in accent · title + note · evidence tag. Hypotheses sit flat.

```jsx
<StepList steps={[
  { title: 'Step one', note: 'A note, if the step needs one.', state: 'shipped' },
  { title: 'Step two', note: 'The count behind it, as N of M.', state: 'measured' },
  { title: 'Step three', state: 'building' },
  { title: 'Step four', note: 'Why it is still a hypothesis.', state: 'hypothesis' },
]} />
```

Every step wears a tag — a step you cannot tag is not a step yet.