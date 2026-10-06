import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Comparison({ sides = [], chosen, chosenLabel = 'chosen', stack, className, style }) {
  return <div className={cx('ej-compare', stack && 'ej-compare-stack', className)} style={style}>
    {sides.slice(0, 2).map((s, i) => { const isChosen = chosen === i || (chosen === undefined && s.chosen); return <div key={i} className={cx('ej-compare-side', isChosen && 'ej-compare-chosen')}>
      <div className="ej-label-row"><span className="ej-label">{s.label}</span>{isChosen && <span className="ej-label">{chosenLabel}</span>}</div>
      {s.title && <div className="ej-compare-title">{s.title}</div>}
      {s.body && <div className="ej-compare-body">{s.body}</div>}
    </div>; })}
  </div>;
}
export default Comparison;