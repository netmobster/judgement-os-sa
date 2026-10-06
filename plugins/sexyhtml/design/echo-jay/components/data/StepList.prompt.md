StepList — mono number, 600 title, state tag at the right, optional note under the title.

```jsx
<StepList steps={[
  { title: 'Step one', state: 'done', note: 'A note, if the step needs one.' },
  { title: 'Step two', state: 'next' },
  { title: 'Step three', state: 'blocked', note: 'What it waits on.' },
]} />
```

One next at a time. Steps without a state get no tag.