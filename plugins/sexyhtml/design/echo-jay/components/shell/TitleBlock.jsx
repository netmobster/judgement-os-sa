import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function TitleBlock({ title, subtitle, byline, className, style, children }) {
  const by = Array.isArray(byline) ? byline.map((b, i) => <span key={i}>{b}</span>) : byline;
  return <section className={cx('ej-titleblock', className)} style={style}>
    {title && <h1 className="ej-title">{title}</h1>}
    {subtitle && <p className="ej-subtitle">{subtitle}</p>}
    {children}
    {byline && <div className="ej-byline">{by}</div>}
  </section>;
}
export default TitleBlock;