import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Code({ label, meta, className, style, children }) {
  return <div className={className} style={style}>{(label || meta) && <div className="ej-label-row"><span className="ej-label">{label}</span><span className="ej-label">{meta}</span></div>}<pre className="ej-code">{children}</pre></div>;
}
export default Code;