Button — squared (6px radius), 14px/600 Figtree. Primary is accent on white; on ink it flips to sky on ink.

```jsx
<Button>Open the ledger</Button>
<Button variant="secondary" icon={<UndoIcon />}>Undo</Button>
<Button variant="ghost">See the manifest</Button>
<Button variant="secondary" iconOnly aria-label="Lock" icon={<LockIcon />} />
```

Hover moves one step down the accent ramp, pressed two. Disabled drops to 45% opacity. Never round into a pill.