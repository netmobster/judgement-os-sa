import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function QuestionPanel({ label, question, options = [], recommended, selected, onSelect, note, noteLabel = 'Note', className, style, children }) {
  const interactive = typeof onSelect === 'function';
  return <div className={cx('ej-question', className)} style={style}>
    {label && <span className="ej-label">{label}</span>}
    {question && <div className="ej-question-title">{question}</div>}
    <ul className="ej-options">
      {options.map((o, i) => { const rec = recommended === i || (recommended === undefined && o.recommended); const sel = selected === i;
        const cls = cx('ej-option', rec && 'ej-option-rec', !interactive && sel && 'ej-option-selected');
        const inner = <><span className="ej-option-mark" aria-hidden="true"></span><span className="ej-option-name">{o.name}</span>{rec && <span className="ej-label">{o.tag ?? 'recommended'}</span>}{o.meaning && <span className="ej-option-meaning">{o.meaning}</span>}</>;
        return <li key={i}>{interactive ? <button type="button" className={cls} aria-pressed={sel} onClick={() => onSelect(i, o)}>{inner}</button> : <div className={cls}>{inner}</div>}</li>; })}
    </ul>
    {(note || children) && <div className="ej-note"><span className="ej-label">{noteLabel}</span>{note ?? children}</div>}
  </div>;
}
export default QuestionPanel;