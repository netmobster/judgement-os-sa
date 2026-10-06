import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Bars({ values = [], highlight, target, axis, max, axisY, height, className, style }) {
  const m = max ?? Math.max(1, ...values);
  const hi = highlight === undefined ? values.length - 1 : highlight;
  const well = <div className="ej-bars" style={height !== undefined ? { height } : undefined}>
    {target !== undefined && <div className="ej-bars-target" style={{ '--v': (100 - (target / m) * 100) + '%' }}></div>}
    {values.map((v, i) => <div key={i} className={cx('ej-bar', i === hi && 'ej-bar-hi')} style={{ '--v': Math.max(2, (v / m) * 100) + '%' }} title={String(v)}></div>)}
  </div>;
  const ax = axis && <div className="ej-bars-axis">{axis.map((a, i) => <span key={i}>{a}</span>)}</div>;
  if (!axisY) return <div className={className} style={style}>{well}{ax}</div>;
  return <div className={cx('ej-chart', className)} style={style}><div className="ej-chart-y"><span>{m}</span><span>0</span></div>{well}{ax}</div>;
}
export default Bars;