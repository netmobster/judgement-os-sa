import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Segmented({ options = [], value, defaultValue, onChange, name, className, style }) {
  const [inner, setInner] = React.useState(defaultValue ?? (options[0] && (options[0].value ?? options[0])));
  const cur = value ?? inner;
  const nm = name || React.useId();
  return <div className={cx('seg', className)} style={style}>{options.map(o => { const v = o.value ?? o, l = o.label ?? o; return <label key={v} className="seg-opt"><input type="radio" name={nm} checked={cur === v} onChange={() => { setInner(v); onChange && onChange(v); }} />{l}</label>; })}</div>;
}
export default Segmented;