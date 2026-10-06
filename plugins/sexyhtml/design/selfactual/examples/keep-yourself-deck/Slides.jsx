const DS = window.SelfActualDesignSystem_f093ce;
const { Slide, Hl, EvidenceTag, EvidenceLegend, EvidenceRow, StackRow, Panel, RuleNote, Console } = DS;
const LOGO = '../../assets/selfactual-logo.png';
const T24 = { fontSize: 24 };
const ET = (s, l) => <EvidenceTag state={s} style={T24}>{l}</EvidenceTag>;

function CoverSlide({ date }) {
  return <Slide ink logo={LOGO} date={'Internal · ' + date} display={<>Choose your AI.<br/><Hl>Keep yourself.</Hl></>} lead="Use whatever models, tools, agents and infrastructure you want. selfActual is the operator layer that stays yours." number="01" data-screen-label="01" foot={<EvidenceLegend style={T24} />} />;
}
function ProblemSlide({ date }) {
  return <Slide kicker="02 · The problem" date={date} number="02" logo={LOGO} data-screen-label="02">
    <div style={{ display: 'flex', alignItems: 'center', gap: 88 }}>
      <div style={{ flex: 1 }}>
        <h1 className="slide-title">Every time your AI changes,<br/><Hl>you start over.</Hl></h1>
        <p className="slide-lead" style={{ marginTop: 36, maxWidth: '40ch' }}>New model, new tool, new agent, new teammate. Each one begins with you re-explaining how you think, how you work and how you fail.</p>
        <p style={{ fontSize: 34, lineHeight: 1.4, margin: '28px 0 0', fontWeight: 700 }}>The switching cost of AI isn't the model. It's you.</p>
      </div>
      <div style={{ flex: '0 0 600px' }}><Panel>
        <div className="card-kicker" style={T24}>Every new window</div>
        <div style={{ margin: '28px 0 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>{[100, 76, 48].map(w => <div key={w} style={{ height: 14, borderRadius: 999, background: 'var(--color-neutral-400)', width: w + '%' }}></div>)}</div>
        <div style={{ fontSize: 29, color: 'var(--color-neutral-700)', fontStyle: 'italic' }}>"So — tell me about yourself."</div>
      </Panel></div>
    </div>
  </Slide>;
}
function StackSlide({ date }) {
  const cols = '220px 300px 1fr', rs = { padding: '13px 26px' };
  const L = (t) => <span style={{ fontSize: 27 }}>{t}</span>, V = (t) => <span style={T24}>{t}</span>;
  return <Slide kicker="03 · Portability was never about models" date={date} number="03" logo={LOGO} data-screen-label="03">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 70 }}>
        <h1 className="slide-title" style={{ flex: '0 0 46%', fontSize: 60 }}>Swap any layer.<br/><Hl>Only one has to stay.</Hl></h1>
        <p className="slide-lead" style={{ flex: 1, fontSize: 27 }}>Not a feature list — demonstrations of the same operation, tagged by what actually swaps today.</p>
      </div>
      <div style={{ fontSize: 25 }}>
        <StackRow columns={cols} style={rs} itemsStyle={{ fontSize: 25 }} label={L('Intelligence')} verb={V('Swap the model')} items={[<>Claude · Claude Code · Copilot {ET('shipped')}</>, <>ChatGPT {ET('measured')}</>, <>Gemini · local {ET('hypothesis')}</>]} />
        <StackRow columns={cols} style={rs} itemsStyle={{ fontSize: 25 }} label={L('Tools')} verb={V('Swap where the work lives')} items={[<>External links on tasks {ET('shipped')}</>, <>Notion · Asana · Linear {ET('hypothesis')}</>]} />
        <StackRow columns={cols} style={rs} itemsStyle={{ fontSize: 25 }} label={L('Infrastructure')} verb={V('Swap where it runs')} items={[<>SA cloud {ET('shipped')}</>, <>SUMMIT account {ET('building')}</>, <>Own machine {ET('hypothesis')}</>]} />
        <StackRow keep columns={cols} style={{ padding: '18px 26px' }} label={L('Operator layer')} verb={V("Don't swap this")}><span style={{ fontSize: 25 }}>State · profile · judgment · ledger. <b>Yours. Constant. selfActual.</b></span></StackRow>
      </div>
    </div>
  </Slide>;
}
function EvidenceSlide({ date }) {
  const rs = { gridTemplateColumns: '190px 1fr 210px', gap: 22, padding: '7px 26px', fontSize: 25 };
  const F = (t) => <span style={{ fontSize: 32 }}>{t}</span>;
  return <Slide kicker="04 · The evidence ledger" date={date} number="04" logo={LOGO} data-screen-label="04">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 70 }}>
        <h1 className="slide-title" style={{ flex: 1, fontSize: 54 }}>Small numbers. All of them true.</h1>
        <p className="slide-lead" style={{ flex: '0 0 44%', fontSize: 28 }}>The bigger the claim on the cover, the smaller the numbers underneath have to be allowed to look.</p>
      </div>
      <div className="deck-ledger">
        <EvidenceRow style={rs} figure={F('3')} state="shipped" tagLabel={<span style={T24}>shipped</span>} claim={<span style={{ fontSize: 25 }}>Live transports on one page — artifact, web, ChatGPT — zero logic rewritten</span>} />
        <EvidenceRow style={rs} figure={F('7 of 7')} state="measured" tagLabel={<span style={T24}>measured · staging</span>} claim={<span style={{ fontSize: 25 }}>Heartbeat end to end on staging; 80 tests, 33 of 34 planted defects caught</span>} />
        <EvidenceRow style={rs} figure={F('206→150')} state="measured" tagLabel={<span style={T24}>measured</span>} claim={<span style={{ fontSize: 25 }}>P0/P1 board in one triage pass — 69 decisions, 69/69 writes, 0 failures</span>} />
        <EvidenceRow style={rs} figure={F('Local')} state="hypothesis" tagLabel={<span style={T24}>hypothesis</span>} claim={<span style={{ fontSize: 25 }}>Whether vault and model on one desk run the same page unchanged. Nobody has done it yet</span>} />
      </div>
    </div>
  </Slide>;
}
function WindowSlide({ date, insight, onAction }) {
  return <Slide kicker="05 · Keep, as in running — not as in backup" date={date} number="05" logo={LOGO} data-screen-label="05">
    <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
      <div style={{ flex: '0 0 44%' }}>
        <h1 className="slide-title" style={{ fontSize: 62 }}>Export is a zip file. <Hl>This is a thing that's on.</Hl></h1>
        <RuleNote style={{ fontSize: 28, marginTop: 34 }}>Heartbeat pushes, gates hold, and every insight ends in a button because the profile said so.</RuleNote>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', fontSize: 24 }} className="deck-console">
        <Console style={{ width: 860 }} status="heartbeat · 3 windows open"
          insight={{ text: insight, actions: [{ label: 'Open the ledger', primary: true, onClick: () => onAction('ledger') }, { label: 'Undo', onClick: () => onAction('undo') }] }}
          sections={[{ title: 'Mirror · what this AI loaded', count: '14 of 35', rows: [
            { key: 'working-rhythm', value: 'Bursts, then long tails. Never schedule the tail.', state: 'core' },
            { key: 'finances', value: 'Gated — opens only on your spoken phrase', state: 'locked', locked: true }] }]} />
      </div>
    </div>
  </Slide>;
}
function CloseSlide({ date }) {
  return <Slide ink logo={LOGO} date={date} display={<>Choose your AI.<br/><Hl>Keep yourself.</Hl></>} number="06" data-screen-label="06" />;
}
Object.assign(window, { CoverSlide, ProblemSlide, StackSlide, EvidenceSlide, WindowSlide, CloseSlide });