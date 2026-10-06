import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Button({ variant = 'primary', size, icon, as: As = 'button', className, children, ...rest }) {
  const props = As === 'button' && rest.type === undefined ? { type: 'button', ...rest } : rest;
  return <As className={cx('ej-btn', 'ej-btn-' + variant, size === 'sm' && 'ej-btn-sm', className)} {...props}>{icon}{children}</As>;
}
export default Button;