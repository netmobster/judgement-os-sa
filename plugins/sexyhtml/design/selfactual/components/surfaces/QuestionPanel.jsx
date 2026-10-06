import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { EvidenceTag } from '../evidence/EvidenceTag.jsx';
export function QuestionPanel({ kicker, question, options = [], recommended, selected, onSelect, note, className, style, children }) {
  const interactive = typeof onSelect === 'function';
  const rec = recommended !== undefined ? recommended : options.findIndex(o => o.recommended);
  return <div className={cx('panel', 'qp', className)} style={style}>
    {kicker && <div className="card-kicker">{kicker}</div>}
    {question && <div className="qp-title">{question}</div>}
    <div className="qp-options">
      {options.map((o, i) => { const open = o.open ?? o.state === 'hypothesis'; const isRec = i === rec; const sel = selected === i;
        const cls = cx('qp-option', isRec && 'qp-option-rec', open && 'qp-option-open', !interactive && sel && 'qp-option-selected');
        const inner = <><div className="qp-option-name">{o.name}</div>{o.meaning && <div className="qp-option-meaning">{o.meaning}</div>}<div className="qp-option-tags">{isRec && <span className="qp-rec">{o.recLabel ?? 'Recommended'}</span>}{o.state && <EvidenceTag state={o.state}>{o.tagLabel}</EvidenceTag>}</div></>;
        return interactive ? <button key={i} type="button" className={cls} aria-pressed={sel} onClick={() => onSelect(i, o)}>{inner}</button> : <div key={i} className={cls}>{inner}</div>; })}
    </div>
    {(note || children) && <div className="rule-note qp-note">{note ?? children}</div>}
  </div>;
}
export default QuestionPanel;