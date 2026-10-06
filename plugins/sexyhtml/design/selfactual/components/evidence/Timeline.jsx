import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from './EvidenceTag.jsx';
export function Timeline({ items = [], current, className, style }) {
  const cur = current !== undefined ? current : items.findIndex(it => it.current);
  return <ol className={cx('tl', className)} style={style}>
    {items.map((it, i) => { const open = it.open ?? it.state === 'hypothesis'; return <li key={i} className={cx('tl-row', i === cur && 'turn', open && i !== cur && 'tl-open')}>
      <span className="tl-date">{it.date}</span>
      <div><div className="tl-title">{it.title}</div>{it.line && <div className="tl-line">{it.line}</div>}</div>
      <EvidenceTag state={it.state ?? 'building'}>{it.tagLabel}</EvidenceTag>
    </li>; })}
  </ol>;
}
export default Timeline;