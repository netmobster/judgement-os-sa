import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Layers({ layers = [], labelWidth, className, style }) {
  const lw = labelWidth === undefined ? null : { '--ej-layer-label-w': typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth };
  return <div className={cx('ej-layers', className)} style={{ ...lw, ...style }}>
    {layers.map((l, i) => <React.Fragment key={i}>
      {l.via && <div className="ej-layer-via"><span className="ej-arrow" aria-hidden="true">↓</span>{l.via}</div>}
      <div className={cx('ej-layer', l.hi && 'ej-layer-hi')}>
        <span className="ej-label">{l.label}</span>
        <div className="ej-layer-items">{(l.items || []).map((it, j) => { const o = typeof it === 'string' ? { title: it } : it; return <div key={j} className={cx('ej-node', o.hi && 'ej-node-hi', o.well && 'ej-node-well')}><div className="ej-node-title">{o.title}</div>{o.sub && <div className="ej-node-sub">{o.sub}</div>}</div>; })}</div>
      </div>
    </React.Fragment>)}
  </div>;
}
export default Layers;