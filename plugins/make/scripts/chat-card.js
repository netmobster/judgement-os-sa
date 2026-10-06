#!/usr/bin/env node
// chat-card.js: the make plugin's chat cards, drawn in ECHO-JAY for show_widget (2 Oct 2026).
// Two cards, made by code so they look the same every time:
//   done  The done list: what we did, grouped by kind (built, fixed, filed), each line with why in
//         a few words and its commit (linked), and its session only when it differs from the
//         card's. Past 15 items the list goes compact, one line per item, and nothing is cut.
//   diff  Before and after: a unified diff as the changed lines and two either side. A new file
//         shows a preview, no file more than 40 lines, the card at most 120, and every file says
//         what it left out. Binary files, renames and empty files get one line each.
// The output is show_widget's widget_code. It keeps the widget rules that matter (no comments,
// no fixed positioning, host colours for the ground and the text so it reads in both themes)
// and wears ECHO-JAY on top: the nameplate, the faces, the labels, steel brackets, one gold thing.
// The date is the operator's day (the settings' timezone, else the machine's), never UTC's.
//
//   node chat-card.js done --file <json> [--fold 15]
//   node chat-card.js diff --file <unified diff> [--title "..."] [--commit <hash> --repo <url>] [--session CC-n] [--date YYYY-MM-DD] [--around 2]
//   node chat-card.js --test
//
// done JSON: { title?, session?, date?, repo?, groups: [{ kind: built|fixed|filed, items: [{ text,
// why?, commit?, url?, session? }] }], next?: [text] }. A commit links to repo + /commit/<hash>
// unless the item carries its own https url; a git@ remote links as its https address.

const fs = require('fs');
const S = require('./jos-settings');

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Share+Tech+Mono&family=Source+Sans+3:wght@400;600&display=swap">';
const CSS = `<style>
.ej{--g:#c9a227;--st:#2b5276;--ok:#2e7d4f;--al:#b3261e;position:relative;border:1px solid var(--border);font-family:'Source Sans 3',system-ui,sans-serif;color:var(--text-primary);padding-bottom:12px}
@media (prefers-color-scheme:dark){.ej{--st:#6f9fd0;--ok:#5fcf8a;--al:#ff7b72}}
.ej::before,.ej::after{content:'';position:absolute;width:10px;height:10px;border:2px solid var(--st)}
.ej::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.ej::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.ej-h{display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)}
.ej-np{background:var(--g);color:#1a1408;font:700 15px/1 'Barlow Condensed',sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:7px 20px 7px 10px;clip-path:polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%)}
.ej-lb,.ej-ro,.ej-m,.ej-more,.ej-hk{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.06em}
.ej-lb{text-transform:uppercase;color:var(--text-secondary)}
.ej-ro{display:flex;flex-wrap:wrap;gap:4px 10px;padding:6px 12px;border-bottom:1px solid var(--border);text-transform:uppercase;color:var(--st)}
.ej-t{font:600 22px/1.15 'Barlow Condensed',sans-serif;margin:12px 12px 2px}
.ej-g{margin:14px 12px 0}
.ej-li{display:grid;grid-template-columns:18px 1fr;gap:0 8px;padding:7px 0;border-bottom:1px solid var(--border);font-size:14px;line-height:1.5}
.ej-li i{color:var(--ok);font-size:16px;line-height:1.4}
.ej-m{color:var(--text-secondary);margin-top:2px}
.ej-m a{color:var(--st)}
.ej-lic{padding:5px 0;border-bottom:1px solid var(--border);font-size:13px;line-height:1.45}
.ej-lic .ej-m{margin-left:4px}
.ej-ro a{color:inherit;text-decoration:underline}
.ej-more{color:var(--text-secondary);padding:7px 0 0 26px;font-size:12px}
.ej-f{margin:14px 12px 4px}
.ej-hk{color:var(--text-secondary);padding:6px 8px 2px}
.ej-dl{display:grid;grid-template-columns:16px 1fr;font:12px/1.55 'Share Tech Mono',monospace;padding:0 8px;white-space:pre-wrap;overflow-wrap:anywhere}
.ej-add{background:rgba(46,125,79,.13)}.ej-add b{color:var(--ok)}
.ej-del{background:rgba(179,38,30,.11)}.ej-del b{color:var(--al)}
.ej-ctx{color:var(--text-secondary)}
</style>`;

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
// The operator's calendar day, YYYY-MM-DD. toISOString() was UTC, so every card drawn after 8 pm in
// Toronto carried tomorrow's date (checker batch 2, 2 Oct).
const localDay = (when = new Date(), tz = S.timezone()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(when);
const stamp = d => String(d || localDay()).replace(/-/g, '.');
// A remote as its web address: git@host:owner/repo and ssh://git@host/owner/repo become https.
function webRepo(repo) {
  const r = String(repo || '').trim().replace(/\/$/, '').replace(/\.git$/, '');
  const ssh = r.match(/^(?:ssh:\/\/)?git@([^:/]+)[:/](.+)$/);
  return ssh ? `https://${ssh[1]}/${ssh[2]}` : r;
}
// A hash is shown at seven characters; the link keeps all of it.
const short = h => /^[0-9a-f]{8,40}$/i.test(String(h)) ? String(h).slice(0, 7) : String(h);
// The readout strip: plain strings are escaped; {html} is markup made here (a link).
const head = (label, readout) =>
  `<div class="ej-h"><span class="ej-np">ECHO-JAY</span><span class="ej-lb">${esc(label)}</span></div>` +
  `<div class="ej-ro">${readout.filter(Boolean).map(x => `<span>${typeof x === 'object' ? x.html : esc(x)}</span>`).join('<span>//</span>')}</div>`;
const sessionsOf = items => [...new Set(items.map(it => it.session).filter(Boolean))];

// ---- the done list --------------------------------------------------------------------------
const KINDS = [['built', 'Built'], ['fixed', 'Fixed'], ['filed', 'Filed']];

function commitLink(it, repo) {
  const url = it.url || (repo && it.commit ? `${webRepo(repo)}/commit/${it.commit}` : null);
  if (!it.commit && !it.url) return '';
  const label = esc(it.commit ? short(it.commit) : 'link');
  return url && /^https:\/\//.test(url) ? `<a href="${esc(url)}">${label}</a>` : label;
}

function done(data, { fold = 15 } = {}) {
  const groups = KINDS.map(([kind, name]) => {
    const items = (data.groups || []).filter(g => g.kind === kind).flatMap(g => g.items || []);
    return { kind, name, items };
  }).filter(g => g.items.length);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  // Past `fold` items the list goes compact: one line per item, and every item keeps its why and
  // its commit. Nothing becomes a bare name (the first checker run: 34 of 49 had lost both).
  const compact = total > fold;
  // A line names its session only when it differs from the card's; a card with no session (a day
  // across several) names each line's own.
  const meta = it => [commitLink(it, data.repo), it.session && it.session !== data.session ? esc(it.session) : ''].filter(Boolean).join(' · ');
  const line = it => compact
    ? `<div class="ej-lic"><b>${esc(it.text)}.</b>${it.why ? ' ' + esc(it.why) + '.' : ''}${meta(it) ? ` <span class="ej-m">${meta(it)}</span>` : ''}</div>`
    : `<div class="ej-li"><i class="ti ti-check" aria-hidden="true"></i><div><b>${esc(it.text)}.</b>${it.why ? ' ' + esc(it.why) + '.' : ''}` +
      (meta(it) ? `<div class="ej-m">${meta(it)}</div>` : '') + '</div></div>';
  let body = '';
  groups.forEach((g, i) => {
    body += `<div class="ej-g"><div class="ej-lb">${String(i + 1).padStart(2, '0')} // ${g.name} · ${g.items.length}</div>` + g.items.map(line).join('') + '</div>';
  });
  const next = data.next || [];
  if (next.length) body += `<div class="ej-g"><div class="ej-lb">${String(groups.length + 1).padStart(2, '0')} // Next · ${next.length}</div>` +
    next.map(n => `<div class="ej-li"><i class="ti ti-arrow-right" aria-hidden="true" style="color:var(--st)"></i><div>${esc(n)}</div></div>`).join('') + '</div>';
  const many = data.session ? [] : sessionsOf(groups.flatMap(g => g.items));
  const who = data.session || (many.length > 3 ? `${many.length} sessions` : many.join(' · '));
  return FONTS + `<h2 class="sr-only">The done list: ${total} things, grouped by kind.</h2>` + CSS +
    `<div class="ej">${head('04 // Done list', [who, `${total} done`, next.length ? `${next.length} next` : '', stamp(data.date)])}` +
    `<div class="ej-t">${esc(data.title || 'What we did')}</div>${body}</div>`;
}

// ---- before and after -----------------------------------------------------------------------
function parse(text) {
  const files = []; let f = null, h = null;
  for (const line of String(text).split(/\r?\n/)) {
    if (line.startsWith('diff --git ')) { f = { name: line.replace(/^diff --git a\/(.+?) b\/.+$/, '$1'), hunks: [], add: 0, del: 0 }; files.push(f); h = null; continue; }
    // Lines that say what happened to a file with no lines to show: binary, renamed, new, deleted.
    const bin = f && line.match(/^Binary files (.+?) and (.+?) differ$/);
    if (bin) { f.binary = bin[1] === '/dev/null' ? 'added' : bin[2] === '/dev/null' ? 'deleted' : 'changed'; continue; }
    if (f && line.startsWith('rename from ')) { f.from = line.slice(12); continue; }
    if (f && line.startsWith('rename to ')) { f.name = line.slice(10); continue; }
    if (f && line.startsWith('new file mode')) { f.isNew = true; continue; }
    if (f && line.startsWith('deleted file mode')) { f.isDeleted = true; continue; }
    if (/^(index |similarity |dissimilarity |old mode|new mode|copy from |copy to )/.test(line)) continue;
    if (line.startsWith('--- ')) { if (!f) { f = { name: '', hunks: [], add: 0, del: 0 }; files.push(f); } if (/^--- \/dev\/null/.test(line)) f.isNew = true; h = null; continue; }
    if (line.startsWith('+++ ')) { const n = line.slice(4).replace(/^b\//, '').replace(/\t.*$/, ''); if (f && n !== '/dev/null') f.name = n; else if (f) f.isDeleted = true; continue; }
    const m = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (m && f) { h = { start: +m[1], lines: [] }; f.hunks.push(h); continue; }
    if (!h || line.startsWith('\\')) continue;
    if (line[0] === '+') { h.lines.push(['add', line.slice(1)]); f.add++; }
    else if (line[0] === '-') { h.lines.push(['del', line.slice(1)]); f.del++; }
    else if (line[0] === ' ') h.lines.push(['ctx', line.slice(1)]);
  }
  return files.filter(x => x.name);
}

// Keep the changed lines and `around` context lines either side; a longer run between two changes
// becomes one gap, and context before the first or after the last is dropped. `lead` is how many
// new-file lines were dropped before the first kept line, so the label can name the right line.
function trim(lines, around) {
  const change = l => l[0] !== 'ctx';
  const keep = lines.map((l, i) => change(l) || lines.slice(Math.max(0, i - around), i + around + 1).some(change));
  const out = []; let gap = false, lead = 0;
  lines.forEach((l, i) => {
    if (keep[i]) { if (gap && out.length) out.push(['gap']); gap = false; out.push(l); }
    else { gap = true; if (!out.length && l[0] !== 'del') lead++; }
  });
  return { out, lead };
}

// A new file shows its first `preview` lines and says how many more; a deleted file is one line;
// no file shows more than `perFile` lines, so one big file can't bury the real edits (the first
// checker run: a 229-line new page would have eaten the whole card). Every file says what it left
// out, in its own block, and the end names the files the card's limit cut (batch 2: a bare
// "+2 more lines not shown" didn't say where). The strip names the commit.
function diff(text, { title, session, date, commit, repo, around = 2, max = 120, perFile = 40, preview = 5 } = {}) {
  const files = parse(text);
  const add = files.reduce((n, f) => n + f.add, 0), del = files.reduce((n, f) => n + f.del, 0);
  const row = l => {
    const [cls, mark] = l[0] === 'add' ? ['ej-add', '+'] : l[0] === 'del' ? ['ej-del', '−'] : ['ej-ctx', ' '];
    return `<div class="ej-dl ${cls}"><b>${mark}</b><span>${esc(l[1])}</span></div>`;
  };
  const one = label => `<div class="ej-f"><div class="ej-lb">${label}</div></div>`;
  const lines = n => n === 1 ? 'line' : 'lines';
  let budget = max, body = '';
  const capped = [];
  files.forEach(f => {
    const name = esc(f.name);
    if (f.binary) { body += one(`Binary // ${name} · ${f.binary}`); return; }
    if (f.isDeleted) { body += one(`Deleted // ${name} · −${f.del}`); return; }
    if (!f.hunks.length) { body += one(f.from ? `Renamed // ${esc(f.from)} → ${name}` : f.isNew ? `New file // ${name} · empty` : `File // ${name} · no line changes`); return; }
    if (f.isNew) {
      const all = f.hunks.flatMap(h => h.lines), want = Math.min(preview, all.length), shown = Math.min(want, Math.max(budget, 0));
      if (shown < want) capped.push(f.name);
      budget -= shown;
      body += `<div class="ej-f"><div class="ej-lb">New file // ${name} · +${f.add}</div>` + all.slice(0, shown).map(row).join('') +
        (f.add > shown ? `<div class="ej-more">+${f.add - shown} more ${lines(f.add - shown)} in this new file</div>` : '') + '</div>';
      return;
    }
    let room = perFile, hidden = 0, hiddenChanges = 0, hit = false;
    body += `<div class="ej-f"><div class="ej-lb">File // ${name}${f.from ? ` · was ${esc(f.from)}` : ''} · +${f.add} −${f.del}</div>`;
    f.hunks.forEach(h => {
      const { out, lead } = trim(h.lines, around);
      if (room > 0 && budget > 0) body += `<div class="ej-hk">Line ${h.start + lead}</div>`;
      out.forEach(l => {
        if (l[0] === 'gap') { if (room > 0 && budget > 0) body += '<div class="ej-hk">⋯</div>'; return; }
        if (budget <= 0 || room <= 0) { hidden++; if (l[0] !== 'ctx') hiddenChanges++; if (budget <= 0) hit = true; return; }
        budget--; room--;
        body += row(l);
      });
    });
    if (hidden) body += `<div class="ej-more">+${hidden} more ${hiddenChanges ? '' : 'unchanged '}${lines(hidden)} in this file</div>`;
    if (hit) capped.push(f.name);
    body += '</div>';
  });
  if (capped.length) {
    const named = capped.length <= 3 ? capped.map(esc).join(', ') : `${esc(capped[0])} and ${capped.length - 1} more files`;
    body += `<div class="ej-more">The card stops at ${max} lines: ${named} ${capped.length === 1 ? 'is' : 'are'} cut short.</div>`;
  }
  const url = commit && repo ? `${webRepo(repo)}/commit/${commit}` : null;
  const which = commit ? (url && /^https:\/\//.test(url) ? { html: `<a href="${esc(url)}">${esc(short(commit))}</a>` } : short(commit)) : '';
  return FONTS + `<h2 class="sr-only">Before and after: ${files.length} files, ${add} lines added, ${del} removed.</h2>` + CSS +
    `<div class="ej">${head('05 // Before and after', [which, session, `${files.length} ${files.length === 1 ? 'file' : 'files'}`, `+${add} −${del}`, stamp(date)])}` +
    `<div class="ej-t">${esc(title || 'What changed')}</div>${body}</div>`;
}

module.exports = { done, diff, parse, trim, localDay, webRepo, short };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : undefined; };
  if (argv[0] === '--test') {
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    const text = html => html.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<[^>]+>/g, ' ');
    const sample = { session: 'CC-71', date: '2026-10-02', repo: 'https://github.com/netmobster/judgement-os.git', groups: [
      { kind: 'filed', items: [{ text: 'An IDEAS row', why: 'kept for later', commit: 'f261a58' }] },
      { kind: 'built', items: [{ text: 'make <0.1.0>', why: 'one front door', commit: '975e4f6' }, { text: 'A bad link', url: 'javascript:alert(1)', commit: 'abc1234' }] }] };
    const d = done(sample);
    ok('built comes before filed, whatever the input order', d.indexOf('// Built') < d.indexOf('// Filed'));
    ok('text is escaped', d.includes('make &lt;0.1.0&gt;') && !d.includes('<0.1.0>'));
    ok('a commit links to the repo', d.includes('href="https://github.com/netmobster/judgement-os/commit/975e4f6"'));
    ok('only https links are made', !/href="javascript/.test(d) && d.includes('abc1234'));
    ok('a card-wide session is said once, in the strip', (text(d).match(/CC-71/g) || []).length === 1);
    const other = done({ session: 'CC-71', groups: [{ kind: 'built', items: [{ text: 'x', session: 'CC-68' }, { text: 'y', session: 'CC-71' }] }] });
    ok('a line names its session only when it differs from the card', (text(other).match(/CC-68/g) || []).length === 1 && (text(other).match(/CC-71/g) || []).length === 1);
    const day = done({ groups: [{ kind: 'built', items: [{ text: 'a', session: 'CC-68' }, { text: 'b', session: 'CC-71' }] }] });
    ok('a day across sessions: the strip lists them and each line names its own', /CC-68 · CC-71/.test(text(day)) && (text(day).match(/CC-68/g) || []).length === 2);
    ok('the readout counts, the group labels count', /3 done/.test(text(d)) && /Built · 2/.test(text(d)));
    ok('never a score: no percentages in what is read', !/\d\s*%/.test(text(d)));
    ok('no comments and no fixed positioning (widget rules)', !d.includes('<!--') && !/position:\s*fixed/.test(d));
    ok('the nameplate and a summary for screen readers', d.includes('class="ej-np">ECHO-JAY') && d.includes('class="sr-only"'));
    const big = done({ repo: 'https://github.com/a/b', groups: [{ kind: 'built', items: Array.from({ length: 20 }, (_, i) => ({ text: 'Item ' + (i + 1), why: 'because', commit: 'c' + i })) }] });
    ok('past 15 items every line stays, compact, with its why and its commit', (big.match(/class="ej-lic"/g) || []).length === 20 && (big.match(/because\./g) || []).length === 20 && big.includes('/commit/c19') && !big.includes('class="ej-more"'));
    const fifteen = done({ groups: [{ kind: 'fixed', items: Array.from({ length: 15 }, (_, i) => ({ text: 'F' + i })) }] });
    ok('at 15 or fewer, full lines', (fifteen.match(/class="ej-li"/g) || []).length === 15 && !fifteen.includes('class="ej-lic"'));
    ok('a next list when there is one', /Next · 1/.test(text(done({ groups: [{ kind: 'built', items: [{ text: 'x' }] }], next: ['Restart'] }))));
    const patch = ['diff --git a/TASKS.md b/TASKS.md', 'index 1..2 100644', '--- a/TASKS.md', '+++ b/TASKS.md', '@@ -10,14 +10,15 @@ head',
      ' c1', ' c2', ' c3', '-old <line>', '+new <line>', '+another', ' c4', ' c5', ' c6', ' c7', ' c8', ' c9', ' c10', '+late add', ' c11', ' c12', ' c13',
      '\\ No newline at end of file', 'diff --git a/x.json b/x.json', '--- a/x.json', '+++ b/x.json', '@@ -1,1 +1,1 @@', '-"v": 1', '+"v": 2', ''].join('\n');
    const files = parse(patch);
    ok('two files, their counts', files.length === 2 && files[0].add === 3 && files[0].del === 1 && files[1].add === 1);
    const { out: t, lead } = trim(files[0].hunks[0].lines, 2);
    ok('two context lines either side of a change, one gap between, the ends dropped', t.filter(l => l[0] === 'gap').length === 1 && !t.some(l => l[1] === 'c1') && t.some(l => l[1] === 'c2') && t.some(l => l[1] === 'c5') && !t.some(l => l[1] === 'c6') && !t.some(l => l[1] === 'c13'));
    ok('the line label names the first line shown', lead === 1 && diff(patch).includes('Line 11'));
    const c = diff(patch, { title: 'What changed', session: 'CC-71', date: '2026-10-02' });
    ok('the diff card escapes and marks lines', c.includes('old &lt;line&gt;') && c.includes('class="ej-dl ej-add"') && c.includes('class="ej-dl ej-del"'));
    ok('its readout counts', /2 files/.test(text(c)) && /\+4 −2/.test(text(c)));
    ok('the no-newline note never shows', !c.includes('No newline'));
    const capped = text(diff(patch, { max: 3 }));
    ok('the cap: each file says what it left out, and the end names the files cut', /\+\d+ more lines in this file/.test(capped) && /The card stops at 3 lines: TASKS\.md, x\.json are cut short/.test(capped) && !/not shown/.test(capped));
    const tail = ['diff --git a/a.md b/a.md', '--- a/a.md', '+++ b/a.md', '@@ -1,6 +1,6 @@', ' k1', ' k2', '-old', '+new', ' k3', ' k4'].join('\n');
    ok('only unchanged lines left out: it says so', /\+2 more unchanged lines in this file/.test(text(diff(tail, { max: 4 }))));
    const lateNew = patch + '\n' + ['diff --git a/n.md b/n.md', 'new file mode 100644', '--- /dev/null', '+++ b/n.md', '@@ -0,0 +1,3 @@', '+a', '+b', '+c'].join('\n');
    const ln = text(diff(lateNew, { max: 3 }));
    ok('a new file after the cap is counted and named', /\+3 more lines in this new file/.test(ln) && /n\.md are cut short|n\.md is cut short|and \d+ more files are cut short/.test(ln));
    ok('the day is the operator\'s, not UTC\'s (8:48 pm in New York is still the 2nd)', localDay(new Date('2026-10-03T00:48:00Z'), 'America/New_York') === '2026-10-02' && localDay(new Date('2026-10-03T00:48:00Z'), 'UTC') === '2026-10-03');
    ok('no date given: the card stamps the operator\'s day', diff(patch).includes(localDay().replace(/-/g, '.')) && done(sample).includes('2026.10.02'));
    const full = 'e319d91a2b3c4d5e6f708192a3b4c5d6e7f80912';
    const fh = diff(patch, { commit: full, repo: 'https://github.com/a/b' });
    ok('a full hash shows as seven characters and links in full', text(fh).includes('e319d91') && !text(fh).includes(full) && fh.includes(`/commit/${full}"`));
    ok('a git@ remote links as https', diff(patch, { commit: 'e319d91', repo: 'git@github.com:netmobster/judgement-os.git' }).includes('href="https://github.com/netmobster/judgement-os/commit/e319d91"') &&
      webRepo('ssh://git@github.com/a/b.git') === 'https://github.com/a/b' && done({ repo: 'git@github.com:a/b.git', groups: [{ kind: 'built', items: [{ text: 'x', commit: full }] }] }).includes(`href="https://github.com/a/b/commit/${full}"`));
    const odd = ['diff --git a/logo.png b/logo.png', 'new file mode 100644', 'index 0000000..1111111', 'Binary files /dev/null and b/logo.png differ',
      'diff --git a/old.txt b/new.txt', 'similarity index 100%', 'rename from old.txt', 'rename to new.txt',
      'diff --git a/.nojekyll b/.nojekyll', 'new file mode 100644', 'index 0000000..e69de29'].join('\n');
    const ot = text(diff(odd));
    ok('binary files, renames and empty files each keep a line', /Binary \/\/ logo\.png · added/.test(ot) && /Renamed \/\/ old\.txt → new\.txt/.test(ot) && /New file \/\/ \.nojekyll · empty/.test(ot) && /3 files/.test(ot));
    const born = ['diff --git a/new.html b/new.html', 'new file mode 100644', '--- /dev/null', '+++ b/new.html', '@@ -0,0 +1,12 @@', ...Array.from({ length: 12 }, (_, i) => '+n' + i),
      'diff --git a/old.md b/old.md', 'deleted file mode 100644', '--- a/old.md', '+++ /dev/null', '@@ -1,3 +0,0 @@', '-o1', '-o2', '-o3'].join('\n');
    const nb = diff(born);
    ok('a new file: its label, a five-line preview, and how many more', /New file \/\/ new\.html · \+12/.test(text(nb)) && (nb.match(/class="ej-dl ej-add"/g) || []).length === 5 && /\+7 more lines in this new file/.test(text(nb)));
    ok('a deleted file: one line', /Deleted \/\/ old\.md · −3/.test(text(nb)) && !nb.includes('class="ej-dl ej-del"'));
    const long = ['diff --git a/a.md b/a.md', '--- a/a.md', '+++ b/a.md', '@@ -1,0 +1,50 @@', ...Array.from({ length: 50 }, (_, i) => '+l' + i)].join('\n');
    ok('no file shows more than 40 lines', (diff(long).match(/class="ej-dl /g) || []).length === 40 && /\+10 more lines in this file/.test(text(diff(long))));
    const named = diff(patch, { commit: 'da7d92b', repo: 'https://github.com/netmobster/judgement-os.git' });
    ok('the strip names the commit, linked', named.includes('href="https://github.com/netmobster/judgement-os/commit/da7d92b"') && /da7d92b/.test(text(named)));
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  const kind = argv[0], file = opt('file');
  if (!['done', 'diff'].includes(kind) || !file) { console.error('usage: chat-card.js done --file <json> [--fold 15] | diff --file <patch> [--title t] [--commit hash --repo url] [--session s] [--date d] [--around 2] | --test'); process.exit(2); }
  const src = fs.readFileSync(file, 'utf8');
  process.stdout.write(kind === 'done'
    ? done(JSON.parse(src), { fold: Number(opt('fold') || 15) })
    : diff(src, { title: opt('title'), commit: opt('commit'), repo: opt('repo'), session: opt('session'), date: opt('date'), around: Number(opt('around') || 2) }));
}
