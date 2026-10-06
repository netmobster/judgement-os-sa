import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function StatRow({ stats = [], hi, className, style }) {
  const list = stats.slice(0, 4);
  const hiIndex = hi !== undefined ? hi : list.findIndex(s => s.hi);
  return <div className={cx('ej-stats', className)} style={{ '--n': Math.max(2, list.length), ...style }}>
    {list.map((s, i) => <div key={i} className={cx('ej-stat', i === hiIndex && 'ej-stat-hi')}>
      <span className="ej-stat-figure">{s.value}</span>
      <span className="ej-label">{s.label}</span>
      {s.sub && <span className="ej-stat-sub">{s.sub}</span>}
    </div>)}
  </div>;
}
export default StatRow;