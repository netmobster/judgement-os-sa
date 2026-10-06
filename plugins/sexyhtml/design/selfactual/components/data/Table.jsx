import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Table({ columns = [], rows = [], className, style, children }) {
  return <table className={cx('table', className)} style={style}>
    {columns.length > 0 && <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>}
    <tbody>{rows.length > 0 ? rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>) : children}</tbody>
  </table>;
}
export default Table;