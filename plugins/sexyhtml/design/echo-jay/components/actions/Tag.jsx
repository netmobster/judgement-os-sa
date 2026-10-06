import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Tag({ tone = 'neutral', className, children, ...rest }) {
  return <span className={cx('ej-tag', tone !== 'neutral' && 'ej-tag-' + tone, className)} {...rest}>{children}</span>;
}
export default Tag;