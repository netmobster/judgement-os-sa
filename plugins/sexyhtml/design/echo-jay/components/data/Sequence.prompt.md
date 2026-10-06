Sequence — actors as nodes with dashed lifelines, messages as steel arrows with a mono verb, one gold message at most.

```jsx
<Sequence actors={['Client', 'Service', { name: 'Store', sub: 'data', well: true }]} messages={[
  { from: 'Client', to: 'Service', label: 'sends request' },
  { from: 'Service', to: 'Store', label: 'reads record' },
  { from: 'Store', to: 'Service', label: 'returns record', reply: true },
  { from: 'Service', to: 'Client', label: 'renders result', hi: true },
]} />
```

Messages run between different actors only; a self-message has no width.