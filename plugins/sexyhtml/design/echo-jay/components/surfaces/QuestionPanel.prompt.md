QuestionPanel — one decision. Question in condensed type, options as hairlined rows with a one-line meaning, the recommended one with a gold square, a recessed note.

```jsx
<QuestionPanel label="Q.01 // Decision" question="Which option should we take?" recommended={1}
  options={[
    { name: 'Option one', meaning: 'What it means, in one line.' },
    { name: 'Option two', meaning: "What it means, in one line." },
    { name: 'Option three', meaning: 'What it means, in one line.' },
  ]}
  note="What we already know that bears on it." />
```

Pass selected + onSelect to make the rows choosable (steel fill on the chosen row).