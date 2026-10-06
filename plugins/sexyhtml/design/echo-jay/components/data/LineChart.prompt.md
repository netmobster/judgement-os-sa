LineChart — one steel line, square points, the last (or chosen) point gold. Up to ~12 points at 500px.

```jsx
<LineChart values={[2, 3, 2, 6, 4, 7, 9]} axisY showValues axis={['Mon', 'Sun']} />
<LineChart values={[…]} highlight={3} target={7} />
```

Counts on the axis and above the points; never a percentage.