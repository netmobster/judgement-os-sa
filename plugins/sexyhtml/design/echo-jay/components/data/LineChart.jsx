import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function LineChart({ values = [], highlight, target, axis, max, min = 0, axisY, showValues, height, className, style }) {
  const m = max ?? Math.max(1, ...values), span = (m - min) || 1, n = values.length;
  const hi = highlight === undefined ? n - 1 : highlight;
  const pts = values.map((v, i) => ({ x: n > 1 ? (i / (n - 1)) * 100 : 50, y: 100 - ((v - min) / span) * 100 }));
  const well = <div className={cx('ej-line', showValues && 'ej-line-values')} style={height !== undefined ? { height } : undefined}>
    <div className="ej-line-plot">
      {target !== undefined && <div className="ej-line-target" style={{ '--v': (100 - ((target - min) / span) * 100) + '%' }}></div>}
      <svg className="ej-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline className="ej-line-path" vectorEffect="non-scaling-stroke" points={pts.map(p => p.x.toFixed(2) + ',' + p.y.toFixed(2)).join(' ')} /></svg>
      {pts.map((p, i) => <React.Fragment key={i}>
        <span className={cx('ej-line-pt', i === hi && 'ej-line-pt-hi')} style={{ '--x': p.x + '%', '--y': p.y + '%' }} title={String(values[i])}></span>
        {showValues && <span className={cx('ej-line-val', i === hi && 'ej-line-val-hi')} style={{ '--x': p.x + '%', '--y': p.y + '%' }}>{values[i]}</span>}
      </React.Fragment>)}
    </div>
  </div>;
  const ax = axis && <div className="ej-bars-axis">{axis.map((a, i) => <span key={i}>{a}</span>)}</div>;
  if (!axisY) return <div className={className} style={style}>{well}{ax}</div>;
  return <div className={cx('ej-chart', className)} style={style}><div className="ej-chart-y"><span>{m}</span><span>{min}</span></div>{well}{ax}</div>;
}
export default LineChart;