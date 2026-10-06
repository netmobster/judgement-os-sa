import React from 'react';
import { Bars } from './Bars.jsx';
import { LineChart } from './LineChart.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');
export function SmallMultiples({ items = [], kind = 'bars', columns, max, hi, className, style }) {
  const m = max ?? Math.max(1, ...items.flatMap(it => it.values || []));
  const n = columns ?? Math.min(3, Math.max(2, items.length));
  const hiIndex = hi !== undefined ? hi : items.findIndex(it => it.hi);
  const Chart = kind === 'line' ? LineChart : Bars;
  return <div className={cx('ej-multiples', className)} style={{ '--n': n, ...style }}>
    {items.map((it, i) => { const vals = it.values || []; const count = it.count ?? vals[vals.length - 1];
      return <div key={i} className={cx('ej-multiple', i === hiIndex && 'ej-multiple-hi')}>
        <div className="ej-label-row"><span className="ej-label">{it.label}</span><span className="ej-multiple-count">{count}</span></div>
        <Chart values={vals} max={m} highlight={i === hiIndex ? undefined : -1} axis={it.axis} />
      </div>; })}
  </div>;
}
export default SmallMultiples;