import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Sequence({ actors = [], messages = [], className, style }) {
  const list = actors.map(a => typeof a === 'string' ? { name: a } : a);
  const idx = a => typeof a === 'number' ? a : list.findIndex(x => x.name === a);
  return <div className={cx('ej-seq', className)} style={{ '--n': list.length, ...style }}>
    {list.map((a, i) => <div key={'a' + i} className="ej-seq-actor" style={{ gridColumn: i + 1 }}><div className={cx('ej-node', a.hi && 'ej-node-hi', a.well && 'ej-node-well')}><div className="ej-node-title">{a.name}</div>{a.sub && <div className="ej-node-sub">{a.sub}</div>}</div></div>)}
    {messages.map((msg, i) => { const f = idx(msg.from), t = idx(msg.to), a = Math.min(f, t), b = Math.max(f, t);
      return <div key={'m' + i} className={cx('ej-seq-msg', t < f && 'ej-seq-msg-back', msg.hi && 'ej-seq-msg-hi', msg.reply && 'ej-seq-msg-dashed')} style={{ gridColumn: (a + 1) + ' / ' + (b + 2), gridRow: i + 2, '--k': b - a + 1 }}>
        <span className="ej-seq-label">{msg.label}</span><div className="ej-seq-arrow"></div>
      </div>; })}
  </div>;
}
export default Sequence;