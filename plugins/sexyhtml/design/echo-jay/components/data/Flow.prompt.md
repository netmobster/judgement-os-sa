Flow + Node — the diagram vocabulary. Nodes are raised with a steel bracket; the important one is gold (hi); a store or sink is recessed (well). Arrows appear between children.

```jsx
<Flow>
  <Node title="Input" sub="source">What comes in.</Node>
  <Node title="Process" sub="step" hi>What happens.</Node>
  <Node title="Output" sub="result" well>What goes out.</Node>
</Flow>
<Flow vertical>…</Flow>
```

Up to four nodes per row at 500px; stack vertically beyond that.