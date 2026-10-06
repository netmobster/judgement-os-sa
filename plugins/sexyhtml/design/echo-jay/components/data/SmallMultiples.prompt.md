SmallMultiples — two or three small Bars or LineCharts across, same scale, a count at each label.

```jsx
<SmallMultiples hi={1} items={[
  { label: 'One', values: [3, 4, 5, 6, 9] },
  { label: 'Two', values: [1, 2, 2, 3, 4] },
  { label: 'Three', values: [0, 1, 1, 0, 1] },
]} />
<SmallMultiples kind="line" columns={2} items={…} />
```

The shared scale is the point: a tall cell is tall because its count is larger.