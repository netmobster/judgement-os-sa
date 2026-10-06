Switch — 34×18 chamfered track, white knob, mono ON/OFF beside it. Gold when on.

```jsx
<SwitchList label="03 // Settings">
  <Switch label="Setting one" defaultChecked />
  <Switch label="Setting two" />
</SwitchList>
<Switch checked={on} onChange={e => setOn(e.target.checked)} />
```