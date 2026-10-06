import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Input({ multiline, options, className, ...rest }) {
  if (options) return <select className={cx('ej-input', className)} {...rest}>{options.map(o => { const v = o.value ?? o, l = o.label ?? o; return <option key={v} value={v}>{l}</option>; })}</select>;
  const As = multiline ? 'textarea' : 'input';
  return <As className={cx('ej-input', className)} {...rest} />;
}
export default Input;