Controls — the three header buttons: A−, A+ and DARK/LIGHT. They set data-size (−1 / 0 / 1 → 14 / 15 / 16px root) and data-theme on <html> and persist both.

```jsx
<Controls />
<Controls showSize={false} />
```

Shell renders them by default; pass controls={false} or your own node to replace them. Without a data-theme attribute the artifact follows the host's color scheme.