import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Readout({ items = [], end, className, style }) {
  return <div className={cx('ej-readout', className)} style={style}>
    {items.map((it, i) => { const o = typeof it === 'string' ? { text: it } : it; return <React.Fragment key={i}>{i > 0 && <span className="ej-readout-sep">//</span>}<span className={o.live ? 'ej-readout-live' : undefined}>{o.dot && <span className="ej-dot"></span>}{o.text}</span></React.Fragment>; })}
    {end && <span className="ej-readout-end">{end}</span>}
  </div>;
}
export default Readout;