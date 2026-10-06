The evidence tag — the label every doubtable claim wears, saying how true it is. Use on any number, promise or feature mention.

```jsx
<EvidenceTag state="shipped" />
<EvidenceTag state="measured">measured · staging</EvidenceTag>
```

States: shipped (cyan), measured (blue), building (grey), hypothesis (blue — shares a hue with measured on purpose). Inside an `.on-ink` container colors rebind automatically. Never use a Tag for certainty; that's what this is for.