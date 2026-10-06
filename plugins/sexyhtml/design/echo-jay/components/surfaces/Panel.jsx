import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Panel({ label, meta, figure, plain, list, stack, className, style, children }) {
  const head = (label || meta || figure) && <div className="ej-panel-head"><span className="ej-label">{label}</span>{figure ? <span className="ej-figure">{figure}</span> : (meta && <span className="ej-label">{meta}</span>)}</div>;
  return <div className={cx('ej-panel', plain && 'ej-panel-plain', list && 'ej-panel-list', stack && 'ej-stack', className)} style={style}>{head}{children}</div>;
}
export default Panel;