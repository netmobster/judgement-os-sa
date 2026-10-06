import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Flow({ vertical, className, style, children }) {
  const kids = React.Children.toArray(children);
  return <div className={cx('ej-flow', vertical && 'ej-flow-vertical', className)} style={style}>
    {kids.map((k, i) => <React.Fragment key={i}>{i > 0 && <span className="ej-arrow" aria-hidden="true">{vertical ? '↓' : '→'}</span>}{k}</React.Fragment>)}
  </div>;
}
export function Node({ title, sub, hi, well, className, style, children }) {
  return <div className={cx('ej-node', hi && 'ej-node-hi', well && 'ej-node-well', className)} style={style}>{title && <div className="ej-node-title">{title}</div>}{sub && <div className="ej-node-sub">{sub}</div>}{children}</div>;
}
export default Flow;