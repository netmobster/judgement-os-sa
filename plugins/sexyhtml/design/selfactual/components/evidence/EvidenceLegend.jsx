import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from './EvidenceTag.jsx';
export function EvidenceLegend({ states = ['shipped','measured','building','hypothesis'], className, style }) {
  return <div className={cx('ev-legend', className)} style={style}>{states.map(s => <EvidenceTag key={s} state={s} />)}</div>;
}
export default EvidenceLegend;