import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Console({ brand = 'selfactual', product = 'insights', status, insight, sections = [], className, style, children }) {
  return <div className={cx('console', className)} style={style}>
    <div className="console-head"><div className="console-brand">{brand} <em>{product}</em></div>{status && <div className="console-status"><span className="console-dot"></span>{status}</div>}</div>
    {insight && <div className="console-insight">
      <div className="console-label">{insight.label ?? 'Insight'}</div>
      <div className="console-text">{insight.text}</div>
      {insight.actions && <div className="console-actions">{insight.actions.map((a, i) => <button key={i} type="button" className={cx('console-chip', a.primary && 'console-chip-primary')} onClick={a.onClick}>{a.label}</button>)}</div>}
    </div>}
    {sections.map((s, i) => <React.Fragment key={i}>
      <div className="console-section">{s.title}{s.count && <span>{s.count}</span>}</div>
      {(s.rows || []).map((r, j) => <div key={j} className={cx('console-row', r.locked && 'console-row-locked')}><span className="console-key">{r.key}</span><span className="console-val">{r.value}</span><span className="console-state">{r.state}</span></div>)}
    </React.Fragment>)}
    {children}
  </div>;
}
export function ConsoleLoop({ children = 'ask → dispatch → work → report → room → decide → dispatch again · nobody is the courier', ...rest }) { return <div className="console-loop" {...rest}>{children}</div>; }
export default Console;