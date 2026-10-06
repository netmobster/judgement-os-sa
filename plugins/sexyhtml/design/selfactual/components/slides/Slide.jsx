import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Slide({ ink, kicker, date, number, logo, showLogo = true, title, display, lead, foot, className, style, children, ...rest }) {
  return <section className={cx('slide', ink && 'slide-ink', className)} style={{ width: 1920, height: 1080, ...style }} {...rest}>
    <div className="slide-head">{kicker ? <span className="slide-kicker">{kicker}</span> : (logo && <img src={logo} alt="" style={{ height: 60, width: 'auto' }} />)}{date && <span className="slide-date">{date}</span>}</div>
    <div>{display && <h1 className="slide-display">{display}</h1>}{title && <h1 className="slide-title">{title}</h1>}{lead && <p className="slide-lead" style={{ marginTop: 36, maxWidth: '46ch' }}>{lead}</p>}{children}</div>
    <div className="slide-foot" style={ink ? { borderTop: '1px solid var(--color-ink-line)', paddingTop: 26 } : undefined}>{foot ?? (showLogo && logo && kicker ? <img className="slide-logo" src={logo} alt="" /> : <span></span>)}{number && <span className="slide-number">{number}</span>}</div>
  </section>;
}
export default Slide;