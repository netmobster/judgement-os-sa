import React from 'react';
import { Controls } from './Controls.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Shell({ wordmark = 'FOR NAME', meta, readout, controls = true, footer, framed, desk, className, style, children }) {
  const foot = Array.isArray(footer) ? footer.map((f, i) => <span key={i}>{f}</span>) : footer;
  const shell = <div className={cx('ej-shell', framed && 'ej-shell-framed', className)} style={style}>
    <header className="ej-header">
      <div className="ej-header-row">
        <div className="ej-header-meta"><span className="ej-nameplate">{wordmark}</span>{meta && <span className="ej-label">{meta}</span>}</div>
        {controls === true ? <Controls /> : controls}
      </div>
      {readout}
    </header>
    {children}
    {footer && <footer className="ej-footer">{foot}</footer>}
  </div>;
  return desk ? <div className="ej-desk ej-desk-grid">{shell}</div> : shell;
}
export default Shell;