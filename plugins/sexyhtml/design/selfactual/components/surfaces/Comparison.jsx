import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function Comparison({ before = {}, after = {}, stack, className, style }) {
  const side = (s, turn) => <div className={cx('card', turn && 'turn')}>
    {s.kicker && <div className="card-kicker">{s.kicker}</div>}
    {s.title && <div className="card-title">{s.title}</div>}
    {typeof s.body === 'string' ? <p className="card-body">{s.body}</p> : s.body}
    {(s.state || s.meta) && <div className="card-meta">{s.meta}{s.state && <EvidenceTag state={s.state}>{s.tagLabel}</EvidenceTag>}</div>}
  </div>;
  return <div className={cx('compare', stack && 'compare-stack', className)} style={style}>{side(before, false)}{side(after, true)}</div>;
}
export default Comparison;