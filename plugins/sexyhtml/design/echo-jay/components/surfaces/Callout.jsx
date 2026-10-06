import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Callout({ variant = 'info', label, title, action, onAction, actionVariant = 'secondary', className, style, children }) {
  return <div className={cx('ej-callout', variant !== 'info' && 'ej-callout-' + variant, className)} style={style}>
    {label && <span className="ej-label">{label}</span>}
    {title && <div className="ej-callout-title">{title}</div>}
    {children && <div className="ej-callout-body">{children}</div>}
    {action && <div className="ej-callout-actions">{typeof action === 'string' ? <button type="button" className={cx('ej-btn', 'ej-btn-' + actionVariant, 'ej-btn-sm')} onClick={onAction}>{action}</button> : action}</div>}
  </div>;
}
export default Callout;