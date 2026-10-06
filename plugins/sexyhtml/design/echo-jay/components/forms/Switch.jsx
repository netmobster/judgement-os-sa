import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Switch({ label, className, style, children, ...rest }) {
  const sw = <label className={cx('ej-switch', !label && className)} style={!label ? style : undefined}><input type="checkbox" {...rest} /><span className="ej-switch-state"></span><span className="ej-switch-track"></span></label>;
  if (!label && !children) return sw;
  return <div className={cx('ej-switch-row', className)} style={style}><span>{label ?? children}</span>{sw}</div>;
}
export function SwitchList({ label, className, style, children }) {
  return <div className={cx('ej-panel', 'ej-panel-list', className)} style={style}>{label && <span className="ej-label">{label}</span>}<div className="ej-switch-list">{children}</div></div>;
}
export default Switch;