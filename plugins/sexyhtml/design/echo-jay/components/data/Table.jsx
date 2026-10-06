import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
const col = c => typeof c === 'string' ? { label: c } : c;
export function Table({ columns = [], rows = [], wrap = true, className, style, children }) {
  const cols = columns.map(col);
  const cls = (c, i) => cx(c && c.num && 'ej-num', c && c.key && 'ej-key', c && c.muted && 'ej-muted');
  const table = <table className={cx('ej-table', className)} style={style}>
    {cols.length > 0 && <thead><tr>{cols.map((c, i) => <th key={i} className={c.num ? 'ej-num' : undefined}>{c.label}</th>)}</tr></thead>}
    <tbody>{rows.length > 0 ? rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} className={cls(cols[j], j) || undefined}>{cell}</td>)}</tr>) : children}</tbody>
  </table>;
  return wrap ? <div className="ej-table-wrap">{table}</div> : table;
}
export default Table;