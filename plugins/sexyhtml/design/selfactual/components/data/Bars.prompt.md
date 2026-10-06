Bars — flat accent-200 bars with one accent-600, a hairline baseline, uppercase axis labels. The head is figure · label · tag.

```jsx
<Bars figure="33 of 34" label="what was counted" state="measured" tagLabel="measured · context" values={[28, 30, 29, 31, 33, 32, 33, 33, 34, 33]} max={34} axis={['Run 01', 'Run 10']} />
```

Counts out of totals. No percentages; no progress bars. Inside a Figure that carries the tag, omit figure/state here.