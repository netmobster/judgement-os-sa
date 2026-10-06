import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Button({ variant = 'primary', icon, iconOnly, block, as: As = 'button', className, children, ...rest }) {
  return <As className={cx('btn', 'btn-' + variant, iconOnly && 'btn-icon', block && 'btn-block', className)} {...rest}>{icon}{!iconOnly && children}</As>;
}
export default Button;