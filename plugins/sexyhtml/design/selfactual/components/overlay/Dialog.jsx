import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Dialog({ open = true, title, actions, onClose, inline, className, style, children }) {
  if (!open) return null;
  return <div className="dialog-backdrop" style={inline ? { position: 'absolute' } : undefined} onClick={e => { if (e.target === e.currentTarget && onClose) onClose(); }}>
    <div role="dialog" aria-modal="true" className={cx('dialog', className)} style={style}>
      {title && <div className="dialog-title">{title}</div>}
      <div className="dialog-body">{children}</div>
      {actions && <div className="dialog-actions">{actions}</div>}
    </div>
  </div>;
}
export default Dialog;