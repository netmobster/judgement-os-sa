QuestionPanel — a 28px panel holding one decision: kicker, question in Caprasimo, option rows with a one-line meaning and a tag, the recommended one in the 3px accent border, and a rule-note.

```jsx
<QuestionPanel kicker="Decision · 01" question="Which option should we take?" recommended={1}
  options={[
    { name: 'Option one', meaning: 'What it means, in one line.', state: 'hypothesis' },
    { name: 'Option two', meaning: 'What it means, in one line.', state: 'shipped' },
    { name: 'Option three', meaning: 'What it means, in one line.', state: 'building' },
  ]}
  note={<>What we already know that bears on it. <b>The line that decides it.</b></>} />
```

Pass selected + onSelect to make the rows choosable.