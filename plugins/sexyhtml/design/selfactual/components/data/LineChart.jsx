import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { ChartHead } from './Bars.jsx';
export function LineChart({ values = [], highlight, max, min = 0, axis, figure, label, state, tagLabel, height, className, style }) {
  const m = max ?? Math.max(1, ...values), span = (m - min) || 1, n = values.length;
  const hi = highlight === undefined ? n - 1 : highlight;
  const pts = values.map((v, i) => ({ x: n > 1 ? (i / (n - 1)) * 100 : 50, y: 100 - ((v - min) / span) * 100 }));
  return <div className={className} style={style}>
    <ChartHead figure={figure} label={label} state={state} tagLabel={tagLabel} />
    <div className="line" style={height !== undefined ? { height } : undefined}><div className="line-plot">
      <svg className="line-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline className="line-path" vectorEffect="non-scaling-stroke" points={pts.map(p => p.x.toFixed(2) + ',' + p.y.toFixed(2)).join(' ')} /></svg>
      {pts.map((p, i) => <span key={i} className={cx('line-pt', i === hi && 'line-pt-hi')} style={{ '--x': p.x + '%', '--y': p.y + '%' }} title={String(values[i])}></span>)}
    </div></div>
    {axis && <div className="chart-axis">{axis.map((a, i) => <span key={i}>{a}</span>)}</div>}
  </div>;
}
export default LineChart;