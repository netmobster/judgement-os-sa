import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function EvidenceTag({ state = 'shipped', children, className, style, ...rest }) {
  return <span className={cx('ev', 'ev-' + state, className)} style={style} {...rest}>{children ?? (state === 'measured' && rest.note ? 'measured · ' + rest.note : state)}</span>;
}
export default EvidenceTag;