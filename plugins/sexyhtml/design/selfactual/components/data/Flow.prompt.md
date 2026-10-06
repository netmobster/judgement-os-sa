Flow — 6px-radius white nodes joined by → arrows with a verb under each. The operator layer is the turn.

```jsx
<Flow verbs={['dispatches', 'reports', 'decides']} nodes={[
  { sub: 'Source', title: 'Input' },
  { sub: 'Step', title: 'Process', state: 'shipped' },
  { sub: 'Record', title: 'Check', state: 'measured' },
  { sub: 'Result', title: 'Output', body: 'What comes out, in one line', state: 'shipped', turn: true },
]} />
<Flow vertical … />
```

Three or four nodes across; stack vertically beyond that. Nodes carry tags when they claim something.