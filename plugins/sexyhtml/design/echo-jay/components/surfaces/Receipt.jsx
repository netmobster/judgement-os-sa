import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Receipt({ label = 'Receipt // verified', stamp, className, style, children }) {
  return <div className={cx('ej-receipt', className)} style={style}><div><div className="ej-label">{label}</div><div className="ej-receipt-body">{children}</div></div>{stamp && <span className="ej-receipt-stamp">{stamp}</span>}</div>;
}
export default Receipt;