import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Quote({ className, style, children, ...rest }) {
  return <blockquote className={cx('quote', className)} style={style} {...rest}>{children}</blockquote>;
}
export default Quote;