import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Radio({ label, className, children, ...rest }) {
  return <label className={cx('radio', className)}><input type="radio" {...rest} /><span className="dot"></span>{label ?? children}</label>;
}
export default Radio;