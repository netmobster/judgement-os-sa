import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Divider({ gold, inset, className, style }) {
  return <hr className={cx('ej-divider', gold && 'ej-divider-gold', inset && 'ej-divider-inset', className)} style={style} />;
}
export default Divider;