Layers — the swap stack as bands: label + verb at left (like StackRow), tagged items as 6px chips, a verb on each ↓ between bands, the operator layer as the turn at the bottom.

```jsx
<Layers layers={[
  { label: 'Layer one', verb: 'What swaps', items: [{ name: 'Item one', state: 'shipped' }, { name: 'Item two', state: 'measured' }, { name: 'Item three', state: 'hypothesis' }] },
  { label: 'Layer two', verb: 'What swaps', via: 'swaps freely', items: [{ name: 'Item one', state: 'shipped' }, { name: 'Item two', state: 'building' }] },
  { label: 'Layer three', verb: 'What swaps', via: 'swaps freely', items: [{ name: 'Item one', state: 'shipped' }, { name: 'Item two', state: 'measured' }] },
  { label: 'The constant', verb: 'What stays', via: 'all of them run on', keep: true, items: ['What it holds', 'The line that stays'] },
]} />
```