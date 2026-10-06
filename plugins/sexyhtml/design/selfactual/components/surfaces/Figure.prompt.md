Figure — white frame, 16px radius: "Fig. 01 · label" head, the chart, then a hairline and the caption with its tag.

```jsx
<Figure num="Fig. 01" label="Series · context" claim={<><b>33 of 34</b>: one sentence that states the figure's point.</>} state="measured" tagLabel="measured · context">
  <Bars values={[28, 30, 29, 31, 33, 32, 33, 33, 34, 33]} max={34} axis={['Run 01', 'Run 10']} />
</Figure>
```

When the figure carries the tag, leave the chart's own head off.