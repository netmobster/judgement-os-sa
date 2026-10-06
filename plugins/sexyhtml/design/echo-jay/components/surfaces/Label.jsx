import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Label({ right, as: As = 'span', className, style, children, ...rest }) {
  if (right !== undefined) return <div className={cx('ej-label-row', className)} style={style}><span className="ej-label">{children}</span><span className="ej-label">{right}</span></div>;
  return <As className={cx('ej-label', className)} style={style} {...rest}>{children}</As>;
}
export function Count({ className, children, ...rest }) { return <span className={cx('ej-figure', className)} {...rest}>{children}</span>; }
export default Label;