Callout — a raised note with a 3px edge. info = steel, warning = alert red, decision = gold. Numbered label, condensed title, one or two sentences, optional action.

```jsx
<Callout label="05 // Note" title="A note that must land">One or two sentences that say what to know.</Callout>
<Callout variant="warning" label="Warning" title="Something went wrong">What happened, as a count.</Callout>
<Callout variant="decision" label="06 // Decision" title="The decision, in one line" action="Open the link" onAction={open}>What it means for the reader, in one sentence.</Callout>
```

The action is secondary by default. Make it primary only when the decision is the block's one gold thing.