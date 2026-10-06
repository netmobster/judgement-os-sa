#!/usr/bin/env node
// recap-page.js: the session recap page, made by code so every close looks the same (2 Oct 2026).
// Every close leaves a page: the done list (built, fixed, filed, each with why, commit and
// session), the decisions, the open loops and what's next, in ECHO-JAY. It takes the done
// list's JSON (chat-card.js) plus { slug, summary, decisions, openLoops }.
//
//   node recap-page.js --file <json> --out <dir>    writes <dir>/recap.html with styles.css and tokens/
//   node recap-page.js --test
//
// Publish <dir>/recap.html with the Artifact tool, styles.css and tokens/* through `files`.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
// The operator's day, the web address of a git@ remote and the seven-character hash: the chat card's.
const { localDay, webRepo, short } = require('./chat-card');

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const KINDS = [['built', 'Built'], ['fixed', 'Fixed'], ['filed', 'Filed']];

function commit(it, repo) {
  if (!it.commit) return '';
  const url = it.url || (repo ? `${webRepo(repo)}/commit/${it.commit}` : null);
  return url && /^https:\/\//.test(url) ? `<a href="${esc(url)}">${esc(short(it.commit))}</a>` : esc(short(it.commit));
}

function page(d) {
  const date = String(d.date || localDay());
  const groups = KINDS.map(([k, name]) => ({ name, items: (d.groups || []).filter(g => g.kind === k).flatMap(g => g.items || []) })).filter(g => g.items.length);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  let n = 1;
  const num = () => String(n++).padStart(2, '0');
  const what = num();  // "What we did" is numbered first, before its tables take theirs
  const list = (title, items) => !items || !items.length ? '' :
    `<div class="ej-section-head"><h2 class="ej-h2">${title}</h2><span class="ej-label">${num()} // ${items.length}</span></div><ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const tables = groups.map(g =>
    `<div><div class="ej-label-row"><span class="ej-label">TBL.${num()} // ${g.name}</span><span class="ej-label">${g.items.length}</span></div>` +
    `<div class="ej-table-wrap"><table class="ej-table"><thead><tr><th>What</th><th>Why</th><th>Commit</th></tr></thead><tbody>` +
    g.items.map(it => `<tr><td>${esc(it.text)}</td><td class="ej-muted">${esc(it.why || '')}</td><td class="ej-mono">${commit(it, d.repo)}${it.session && it.session !== d.session ? ' · ' + esc(it.session) : ''}</td></tr>`).join('') +
    `</tbody></table></div></div>`).join('');
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>${esc(d.session || 'Session')} Recap</title>
<link rel="stylesheet" href="styles.css">
<script>(function(){try{var t=localStorage.getItem('ej-theme');if(t)document.documentElement.setAttribute('data-theme',t);var s=localStorage.getItem('ej-size');if(s)document.documentElement.setAttribute('data-size',s);}catch(e){}})();</script>
<style>.ej-content ul{margin:0;padding-left:20px;display:grid;gap:6px}.ej-table td,.ej-table th{vertical-align:top}.ej-mono{font-family:var(--ej-font-mono);white-space:nowrap}</style>
<div class="ej-shell">
  <header class="ej-header">
    <div class="ej-header-row">
      <div class="ej-header-meta"><span class="ej-nameplate">ECHO-JAY</span><span class="ej-label">06 // Session recap</span></div>
      <div class="ej-controls"><button type="button" class="ej-ctl" id="ej-size-down" aria-label="Smaller text">A−</button><button type="button" class="ej-ctl" id="ej-size-up" aria-label="Larger text">A+</button><button type="button" class="ej-ctl" id="ej-theme">DARK</button></div>
    </div>
    <div class="ej-readout"><span><span class="ej-dot"></span>${esc(d.session || 'CC')}</span><span class="ej-readout-sep">//</span><span class="ej-readout-live" id="ej-clock">00:00:00</span><span class="ej-readout-sep">//</span><span>${total} done${d.next && d.next.length ? ` · ${d.next.length} next` : ''}</span><span class="ej-readout-end">${esc(date.replace(/-/g, '.'))}</span></div>
  </header>
  <section class="ej-titleblock">
    <h1 class="ej-title">${esc(d.session ? `${d.session}: ${d.slug || 'the session'}` : (d.slug || 'Session recap'))}</h1>
    ${d.summary ? `<p class="ej-subtitle">${esc(d.summary)}</p>` : ''}
    <div class="ej-byline"><span>CC · session recap</span><span>${esc(date.replace(/-/g, '.'))}</span></div>
  </section>
  <article class="ej-content">
    <div class="ej-section-head"><h2 class="ej-h2">What we did</h2><span class="ej-label">${what} // ${total} done</span></div>
    ${tables}
    ${list('Decisions', d.decisions)}
    ${list('Open loops', d.openLoops)}
    ${list('Next', d.next)}
  </article>
  <footer class="ej-footer"><span>SESSION // RECAP</span><span>END OF FILE</span></footer>
</div>
<script>(function(){var r=document.documentElement,b=document.getElementById('ej-theme');var dk=function(){var t=r.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;};var p=function(){b.textContent=dk()?'LIGHT':'DARK';};b.addEventListener('click',function(){var x=dk()?'light':'dark';r.setAttribute('data-theme',x);try{localStorage.setItem('ej-theme',x);}catch(e){}p();});var sz=function(dd){var v=Math.max(-1,Math.min(1,Number(r.getAttribute('data-size')||0)+dd));r.setAttribute('data-size',String(v));try{localStorage.setItem('ej-size',String(v));}catch(e){}};document.getElementById('ej-size-down').addEventListener('click',function(){sz(-1);});document.getElementById('ej-size-up').addEventListener('click',function(){sz(1);});matchMedia('(prefers-color-scheme: dark)').addEventListener('change',p);p();var c=document.getElementById('ej-clock'),q=function(v){return String(v).padStart(2,'0');};var tk=function(){var t=new Date();c.textContent=q(t.getHours())+':'+q(t.getMinutes())+':'+q(t.getSeconds());};tk();setInterval(tk,1000);})();</script>
`;
}

// The ECHO-JAY stylesheet and tokens live in sexyhtml; copy them beside the page.
function copyStyles(out) {
  // find-plugin prints the folder that holds the file it was asked for: design/echo-jay itself.
  const design = execFileSync(process.execPath, [path.join(__dirname, 'find-plugin.js'), 'sexyhtml', 'design/echo-jay/styles.css']).toString().trim();
  fs.copyFileSync(path.join(design, 'styles.css'), path.join(out, 'styles.css'));
  fs.mkdirSync(path.join(out, 'tokens'), { recursive: true });
  for (const f of fs.readdirSync(path.join(design, 'tokens'))) fs.copyFileSync(path.join(design, 'tokens', f), path.join(out, 'tokens', f));
  return ['styles.css', ...fs.readdirSync(path.join(out, 'tokens')).map(f => 'tokens/' + f)];
}

module.exports = { page };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : undefined; };
  if (argv[0] === '--test') {
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const text = h => h.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<script>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    const d = { session: 'CC-71', slug: 'the <make> build', summary: 'Ten things.', date: '2026-10-02', repo: 'https://github.com/netmobster/judgement-os.git',
      groups: [{ kind: 'filed', items: [{ text: 'An idea', commit: 'f261a58' }] }, { kind: 'built', items: [{ text: 'make 0.1.0', why: 'the front door', commit: '975e4f6' }, { text: 'Bad', commit: 'x', url: 'javascript:1' }] }],
      decisions: ['Always the form'], next: ['Item 6'] };
    const p = page(d);
    ok('an artifact page: no doctype, html, head or body', !/<!doctype|<html[\s>]|<head[\s>]|<body[\s>]/i.test(p) && p.includes('<header class="ej-header">'));
    ok('the title names the session and the slug, escaped', p.includes('<h1 class="ej-title">CC-71: the &lt;make&gt; build</h1>'));
    ok('built before filed, as tables', p.indexOf('// Built') < p.indexOf('// Filed') && (p.match(/class="ej-table"/g) || []).length === 2);
    ok('commits link to the repo, only over https', p.includes('href="https://github.com/netmobster/judgement-os/commit/975e4f6"') && !/href="javascript/.test(p));
    ok('the readout counts: 3 done, 1 next', /3 done · 1 next/.test(text(p)));
    ok('empty sections are left out', /Decisions/.test(text(p)) && !/Open loops/.test(text(p)));
    ok('numbers run in page order', p.indexOf('01 // 3 done') > -1 && p.indexOf('01 // 3 done') < p.indexOf('TBL.02 // Built'));
    ok('never a score', !/\d\s*%/.test(text(p)));
    const undated = page({ session: 'CC-72', slug: 'x', repo: 'git@github.com:a/b.git', groups: [{ kind: 'fixed', items: [{ text: 'y', commit: 'e319d91a2b3c4d5e6f708192a3b4c5d6e7f80912' }] }] });
    ok('no date given: the operator\'s day, not UTC\'s', undated.includes(localDay().replace(/-/g, '.')));
    ok('a git@ remote links as https, the hash shown at seven', undated.includes('href="https://github.com/a/b/commit/e319d91a2b3c4d5e6f708192a3b4c5d6e7f80912"') && />e319d91</.test(undated));
    ok('the nameplate, the controls and the clock', p.includes('ej-nameplate">ECHO-JAY') && p.includes('id="ej-theme"') && p.includes('id="ej-clock"'));
    ok('both scripts parse', (p.match(/<script>([\s\S]*?)<\/script>/g) || []).every(s => { try { new Function(s.replace(/<\/?script>/g, '')); return true; } catch (e) { return false; } }));
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  const file = opt('file'), out = opt('out');
  if (!file || !out) { console.error('usage: recap-page.js --file <json> --out <dir> | --test'); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'recap.html'), page(JSON.parse(fs.readFileSync(file, 'utf8'))));
  const files = copyStyles(out);
  console.log(JSON.stringify({ page: path.join(out, 'recap.html'), files }, null, 2));
}
