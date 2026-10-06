import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function Figure({ num, label, claim, state, tagLabel, className, style, children }) {
  return <figure className={cx('fig', className)} style={style}>
    {(num || label) && <div className="fig-head">{num && <span className="fig-num">{num}</span>}{label && <span>{label}</span>}</div>}
    <div className="fig-body">{children}</div>
    {(claim || state) && <figcaption className="fig-caption"><span className="fig-claim">{claim}</span>{state && <EvidenceTag state={state}>{tagLabel}</EvidenceTag>}</figcaption>}
  </figure>;
}
export default Figure;