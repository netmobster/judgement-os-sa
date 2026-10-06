import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Field({ label, id, hint, className, style, children }) {
  return <div className={cx('ej-field', className)} style={style}>{label && <label className="ej-label" htmlFor={id}>{label}</label>}{children}{hint && <div className="ej-field-hint">{hint}</div>}</div>;
}
export default Field;