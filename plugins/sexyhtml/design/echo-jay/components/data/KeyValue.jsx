import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function KeyValue({ items = [], className, style }) {
  return <dl className={cx('ej-kv', className)} style={style}>{items.map(([k, v], i) => <React.Fragment key={i}><dt>{k}</dt><dd>{v}</dd></React.Fragment>)}</dl>;
}
export default KeyValue;