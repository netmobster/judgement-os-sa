import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from './EvidenceTag.jsx';
export function EvidenceRow({ figure, claim, state = 'shipped', tagLabel, open, className, style, children }) {
  const isOpen = open ?? state === 'hypothesis';
  return <div className={cx('ev-row', isOpen && 'ev-row-open', className)} style={style}>
    <div className="ev-row-figure">{figure}</div>
    <div className="ev-row-claim">{claim ?? children}</div>
    <EvidenceTag state={state}>{tagLabel}</EvidenceTag>
  </div>;
}
export default EvidenceRow;