import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Bars, ChartHead } from './Bars.jsx';
import { LineChart } from './LineChart.jsx';
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function SmallMultiples({ items = [], kind = 'bars', columns, max, className, style }) {
  const m = max ?? Math.max(1, ...items.flatMap(it => it.values || []));
  const n = columns ?? Math.min(3, Math.max(2, items.length));
  const Chart = kind === 'line' ? LineChart : Bars;
  return <div className={cx('multiples', className)} style={{ '--n': n, ...style }}>
    {items.map((it, i) => <div key={i} className="multiple">
      <div className="chart-head"><span className="multiple-label">{it.label}</span>{it.figure && <span className="chart-figure">{it.figure}</span>}{it.state && <EvidenceTag state={it.state}>{it.tagLabel}</EvidenceTag>}</div>
      <Chart values={it.values || []} max={m} highlight={it.highlight} axis={it.axis} />
    </div>)}
  </div>;
}
export default SmallMultiples;