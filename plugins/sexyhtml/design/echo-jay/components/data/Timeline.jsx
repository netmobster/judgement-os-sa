import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Timeline({ items = [], horizontal, dateWidth, className, style }) {
  const dw = dateWidth === undefined ? null : { '--ej-tl-date-w': typeof dateWidth === 'number' ? dateWidth + 'px' : dateWidth };
  return <ol className={cx('ej-timeline', horizontal && 'ej-timeline-h', className)} style={{ ...dw, ...style }}>
    {items.map((it, i) => <li key={i} className={cx('ej-tl-item', it.state && 'ej-tl-' + it.state)}>
      <span className="ej-tl-date">{it.date}</span>
      <span className="ej-tl-mark" aria-hidden="true"></span>
      <div className="ej-tl-body">{it.title && <div className="ej-tl-title">{it.title}</div>}{it.line && <div className="ej-tl-line">{it.line}</div>}</div>
    </li>)}
  </ol>;
}
export default Timeline;