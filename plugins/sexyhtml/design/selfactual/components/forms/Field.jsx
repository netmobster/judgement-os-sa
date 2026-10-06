import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Field({ label, id, hint, className, style, children }) {
  return <div className={cx('field', className)} style={style}>{label && <label htmlFor={id}>{label}</label>}{children}{hint && <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>{hint}</div>}</div>;
}
export default Field;