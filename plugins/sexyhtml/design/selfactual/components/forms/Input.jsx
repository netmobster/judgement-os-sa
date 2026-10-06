import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Input({ multiline, className, ...rest }) {
  const As = multiline ? 'textarea' : 'input';
  return <As className={cx('input', className)} {...rest} />;
}
export default Input;