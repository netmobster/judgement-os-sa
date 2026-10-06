import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function ChartHead({ figure, label, state, tagLabel }) {
  if (!figure && !label && !state) return null;
  return <div className="chart-head">{figure && <span className="chart-figure">{figure}</span>}{label && <span className="chart-label">{label}</span>}{state && <EvidenceTag state={state}>{tagLabel}</EvidenceTag>}</div>;
}
export function Bars({ values = [], highlight, max, axis, figure, label, state, tagLabel, height, className, style }) {
  const m = max ?? Math.max(1, ...values);
  const hi = highlight === undefined ? values.length - 1 : highlight;
  return <div className={className} style={style}>
    <ChartHead figure={figure} label={label} state={state} tagLabel={tagLabel} />
    <div className="bars" style={height !== undefined ? { height } : undefined}>{values.map((v, i) => <div key={i} className={cx('bar', i === hi && 'bar-hi')} style={{ '--v': Math.max(2, (v / m) * 100) + '%' }} title={String(v)}></div>)}</div>
    {axis && <div className="chart-axis">{axis.map((a, i) => <span key={i}>{a}</span>)}</div>}
  </div>;
}
export default Bars;