import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
const TONE = { done: 'steel', next: 'gold', blocked: 'alert' };
export function StepList({ steps = [], start = 1, className, style }) {
  return <ol className={cx('ej-steps', className)} style={style} start={start}>
    {steps.map((s, i) => <li key={i} className={cx('ej-step', s.state && 'ej-step-' + s.state)}>
      <span className="ej-step-num">{s.num ?? String(start + i).padStart(2, '0')}</span>
      <div className="ej-step-title">{s.title}</div>
      {s.state && <span className={cx('ej-tag', 'ej-tag-' + TONE[s.state])}>{s.tag ?? s.state}</span>}
      {s.note && <div className="ej-step-note">{s.note}</div>}
    </li>)}
  </ol>;
}
export default StepList;