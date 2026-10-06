const { Button } = window.SelfActualDesignSystem_f093ce;
function App() {
  const date = '7 Sept 2026';
  const [i, setI] = React.useState(() => Number(localStorage.getItem('sa-deck-slide') || 0));
  const [insight, setInsight] = React.useState(<>You moved <b>SA-212</b> to Monday in ChatGPT two minutes ago. Claude and the web already show it.</>);
  const onAction = (a) => setInsight(a === 'ledger' ? <>Ledger opened. <b>69/69</b> writes, 0 failures.</> : <>Move undone. <b>SA-212</b> is back on Friday in every window.</>);
  const slides = [<CoverSlide date={date} />, <ProblemSlide date={date} />, <StackSlide date={date} />, <EvidenceSlide date={date} />, <WindowSlide date={date} insight={insight} onAction={onAction} />, <CloseSlide date={date} />];
  const n = slides.length;
  const go = (d) => setI(x => Math.max(0, Math.min(n - 1, x + d)));
  React.useEffect(() => { localStorage.setItem('sa-deck-slide', i); }, [i]);
  React.useEffect(() => { const k = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') go(1); if (e.key === 'ArrowLeft') go(-1); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const ref = React.useRef(); const [s, setS] = React.useState(0.5);
  React.useEffect(() => { const f = () => { const r = ref.current.getBoundingClientRect(); setS(Math.min(r.width / 1920, r.height / 1080)); }; f(); addEventListener('resize', f); return () => removeEventListener('resize', f); }, []);
  return <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto' }}>
    <div ref={ref} style={{ display: 'grid', placeItems: 'center', overflow: 'hidden', padding: 16 }}>
      <div style={{ width: 1920 * s, height: 1080 * s, position: 'relative' }}><div style={{ transform: 'scale(' + s + ')', transformOrigin: 'top left', position: 'absolute', inset: 0 }}>{slides[i]}</div></div>
    </div>
    <div className="on-ink" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '8px 16px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-ink-dim)' }}>
      <Button variant="secondary" onClick={() => go(-1)} disabled={i === 0}>Prev</Button>
      <span className="deck-counter">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
      <Button onClick={() => go(1)} disabled={i === n - 1}>Next</Button>
    </div>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);