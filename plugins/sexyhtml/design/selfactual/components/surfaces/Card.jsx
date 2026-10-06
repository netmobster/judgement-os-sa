import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Card({ kicker, title, meta, focus, ink, className, style, children, ...rest }) {
  return <div className={cx('card', focus && 'card-focus', ink && 'card-ink', className)} style={style} {...rest}>
    {kicker && <div className="card-kicker">{kicker}</div>}
    {title && <div className="card-title">{title}</div>}
    {typeof children === 'string' ? <p className="card-body">{children}</p> : children}
    {meta && <div className="card-meta">{meta}</div>}
  </div>;
}
export default Card;