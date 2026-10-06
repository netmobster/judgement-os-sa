import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Nav({ brand = 'selfActual', logo, links = [], action, className, style }) {
  return <nav className={cx('nav', className)} style={style}>
    <span className="nav-brand">{logo ? <img src={logo} alt={brand} style={{ height: 22, width: 'auto' }} /> : brand}</span>
    {links.map((l, i) => <a key={i} href={l.href || '#'} aria-current={l.current ? 'page' : undefined} onClick={l.onClick}>{l.label}</a>)}
    {action}
  </nav>;
}
export default Nav;