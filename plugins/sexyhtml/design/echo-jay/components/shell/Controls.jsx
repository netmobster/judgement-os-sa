import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
const root = () => document.documentElement;
const prefersDark = () => typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
export function Controls({ showTheme = true, showSize = true, className, style }) {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    try { const t = localStorage.getItem('ej-theme'); if (t) root().setAttribute('data-theme', t); const s = localStorage.getItem('ej-size'); if (s) root().setAttribute('data-size', s); } catch (e) {}
    force();
  }, []);
  const attr = root().getAttribute('data-theme');
  const isDark = attr ? attr === 'dark' : prefersDark();
  const size = Number(root().getAttribute('data-size') || 0);
  const setTheme = () => { const next = isDark ? 'light' : 'dark'; root().setAttribute('data-theme', next); try { localStorage.setItem('ej-theme', next); } catch (e) {} force(); };
  const bump = d => { const n = Math.max(-1, Math.min(1, size + d)); root().setAttribute('data-size', String(n)); try { localStorage.setItem('ej-size', String(n)); } catch (e) {} force(); };
  return <div className={cx('ej-controls', className)} style={style}>
    {showSize && <button type="button" className="ej-ctl" aria-label="Smaller text" disabled={size <= -1} onClick={() => bump(-1)}>A−</button>}
    {showSize && <button type="button" className="ej-ctl" aria-label="Larger text" disabled={size >= 1} onClick={() => bump(1)}>A+</button>}
    {showTheme && <button type="button" className="ej-ctl" onClick={setTheme}>{isDark ? 'LIGHT' : 'DARK'}</button>}
  </div>;
}
export default Controls;