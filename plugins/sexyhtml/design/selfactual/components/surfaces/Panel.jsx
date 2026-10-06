import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Panel({ elevation, className, style, children, ...rest }) {
  return <div className={cx('panel', elevation && 'elev-' + elevation, className)} style={style} {...rest}>{children}</div>;
}
export default Panel;