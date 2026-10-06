Console — the product's own window: slate-teal, hairlines, mono, --shadow-window. Use only for a real product surface, never decoration.

```jsx
<Console status="heartbeat · 3 windows open"
  insight={{ text: <>You moved <b>SA-212</b> to Monday in ChatGPT.</>, actions: [{ label: 'Open the ledger', primary: true }, { label: 'Undo' }] }}
  sections={[{ title: 'Mirror · what this AI loaded', count: '14 of 35', rows: [{ key: 'working-rhythm', value: 'Bursts, then long tails.', state: 'core' }, { key: 'finances', value: 'Gated — opens only on your spoken phrase', state: 'locked', locked: true }] }]} />
<ConsoleLoop />
```