import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function RuleNote({ className, style, children, ...rest }) {
  return <div className={cx('rule-note', className)} style={style} {...rest}>{children}</div>;
}
export default RuleNote;