import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function Flow({ nodes = [], verbs = [], vertical, className, style }) {
  return <div className={cx('flow', vertical && 'flow-vertical', className)} style={style}>
    {nodes.map((n, i) => <React.Fragment key={i}>
      {i > 0 && <div className="flow-arrow"><span className="flow-arrow-glyph" aria-hidden="true">{vertical ? '↓' : '→'}</span>{verbs[i - 1] && <span>{verbs[i - 1]}</span>}</div>}
      <div className={cx('flow-node', n.turn && 'turn')}>{n.sub && <div className="flow-node-sub">{n.sub}</div>}{n.title && <div className="flow-node-title">{n.title}</div>}{n.body}{n.state && <EvidenceTag state={n.state}>{n.tagLabel}</EvidenceTag>}</div>
    </React.Fragment>)}
  </div>;
}
export default Flow;