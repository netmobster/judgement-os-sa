import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function SlideFrame({ wordmark = 'FOR NAME', label, title, titleSize, footer, theme, scale, className, style, children, ...rest }) {
  const foot = Array.isArray(footer) ? footer.map((f, i) => <span key={i}>{f}</span>) : footer;
  const slide = <section className={cx('ej-slide', className)} data-theme={theme} style={style} {...rest}>
    <div className="ej-slide-head"><span className="ej-nameplate">{wordmark}</span>{label && <span className="ej-label">{label}</span>}</div>
    {title && <h1 className={cx('ej-slide-title', titleSize === 'sm' && 'ej-slide-title-sm')}>{title}</h1>}
    <div className="ej-slide-body">{children}</div>
    {footer && <footer className="ej-slide-foot">{foot}</footer>}
  </section>;
  if (!scale) return slide;
  return <div className="ej-slide-scaler" style={{ width: 1920 * scale, height: 1080 * scale }}><div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left' }}>{slide}</div></div>;
}
export default SlideFrame;