SmallMultiples — two or three small white cards, same scale, each with label · figure · tag and a mini chart.

```jsx
<SmallMultiples max={35} items={[
  { label: 'One', figure: '14 of 35', state: 'measured', values: [10, 12, 13, 14, 14] },
  { label: 'Two', figure: '12 of 35', state: 'measured', values: [8, 9, 11, 12, 12] },
  { label: 'Three', figure: '0 of 35', state: 'hypothesis', values: [0, 0, 0, 0, 0] },
]} />
```

The shared max is the total; a tall cell is tall because its count is larger.