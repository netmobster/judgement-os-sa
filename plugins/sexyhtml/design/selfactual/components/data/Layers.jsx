import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function Layers({ layers = [], className, style }) {
  return <div className={cx('layers', className)} style={style}>
    {layers.map((l, i) => <React.Fragment key={i}>
      {l.via && <div className="layer-via"><span className="layer-via-glyph" aria-hidden="true">↓</span>{l.via}</div>}
      <div className={cx('layer', l.keep && 'turn')}>
        <div className="layer-label">{l.label}{l.verb && <span className="layer-verb">{l.verb}</span>}</div>
        <div className="layer-items">{(l.items || []).map((it, j) => { const o = typeof it === 'string' ? { name: it } : it; return <span key={j} className="layer-item">{o.name}{o.state && <EvidenceTag state={o.state}>{o.tagLabel}</EvidenceTag>}</span>; })}</div>
      </div>
    </React.Fragment>)}
  </div>;
}
export default Layers;