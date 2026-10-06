import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Tag({ tone = 'accent', className, children, ...rest }) {
  return <span className={cx('tag', 'tag-' + tone, className)} {...rest}>{children}</span>;
}
export default Tag;