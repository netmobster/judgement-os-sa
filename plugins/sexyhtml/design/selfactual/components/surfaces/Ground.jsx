import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Ground({ ink, className, style, children, ...rest }) {
  return <div className={cx(ink ? 'on-ink' : 'on-light', className)} style={style} {...rest}>{children}</div>;
}
export function Hl({ children, ...rest }) { return <span className="hl" {...rest}>{children}</span>; }
export default Ground;