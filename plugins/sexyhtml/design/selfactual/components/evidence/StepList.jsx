import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from './EvidenceTag.jsx';
export function StepList({ steps = [], start = 1, className, style }) {
  return <ol className={cx('steps', className)} style={style} start={start}>
    {steps.map((s, i) => { const open = s.open ?? s.state === 'hypothesis'; return <li key={i} className={cx('step', open && 'step-open')}>
      <span className="step-num">{s.num ?? String(start + i).padStart(2, '0')}</span>
      <div><div className="step-title">{s.title}</div>{s.note && <div className="step-note">{s.note}</div>}</div>
      <EvidenceTag state={s.state ?? 'building'}>{s.tagLabel}</EvidenceTag>
    </li>; })}
  </ol>;
}
export default StepList;