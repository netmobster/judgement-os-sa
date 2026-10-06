import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function StackRow({ label, verb, items, keep, columns, itemsStyle, className, style, children }) {
  const s = columns ? { gridTemplateColumns: columns, ...style } : style;
  return <div className={cx('stack-row', keep && 'stack-row-keep', className)} style={s}>
    <div className="stack-row-label">{label}</div>
    <div className="stack-row-verb">{verb}</div>
    <div className="stack-row-items" style={itemsStyle}>{items ? items.map((it, i) => <span key={i}>{it}</span>) : children}</div>
  </div>;
}
export default StackRow;