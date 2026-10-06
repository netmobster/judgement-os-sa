import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Quote({ who, where, gold, className, style, children }) {
  return <figure className={cx('ej-quote', gold && 'ej-quote-gold', className)} style={style}>
    <blockquote className="ej-quote-text">{children}</blockquote>
    {(who || where) && <figcaption className="ej-quote-cite">{who && <b>{who}</b>}{who && where && ' · '}{where}</figcaption>}
  </figure>;
}
export default Quote;