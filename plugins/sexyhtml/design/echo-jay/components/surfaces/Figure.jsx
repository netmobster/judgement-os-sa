import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Figure({ num, label, meta, caption, className, style, children }) {
  const head = (num || label) ? <>{num}{num && label ? ' // ' : null}{label}</> : null;
  return <figure className={cx('ej-fig', className)} style={style}>
    {(head || meta) && <div className="ej-fig-head"><span className="ej-label">{head}</span>{meta && <span className="ej-label">{meta}</span>}</div>}
    <div className="ej-fig-body">{children}</div>
    {caption && <figcaption className="ej-fig-caption">{caption}</figcaption>}
  </figure>;
}
export default Figure;