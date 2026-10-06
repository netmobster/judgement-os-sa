#!/usr/bin/env node
// profile-stale.js: the local profile copy, built from the user's own vault sections, and whether
// it's out of date.
//
// The copy lives in <stateDir>/profile/: small.md, general.md and full.md (one per depth), plus
// manifest.json, which records each source section's `modified` time when the copy was built.
//
//   node profile-stale.js <listing-file>       is the copy out of date? (fresh, stale or error)
//   node profile-stale.js --index <listing-file>   the sections, safely: slug, title, tags, size,
//                                              modified. Never a body. Private topics left out.
//   node profile-stale.js --install <dir> --sources '<json>' [--by <name>]
//                                              copy <dir>/{small,general,full}.md into place and
//                                              write the manifest; sources is {slug: modified}
//   node profile-stale.js --test
//
// <listing-file> is the saved output of vault_list(type: "profile_sections", fields: "summary").
// That listing can return every section's full text, private ones included, so it spills to a
// file. This script reads only the slug, title, tags and dates from it, never prints a body, and
// never quotes the file when it can't parse it. Delete the file once this has run.
// Prints one line (or the index as JSON) and exits 0, except --install, which exits 1 on a problem.

const fs = require('fs');
const path = require('path');
const os = require('os');

function S() { return require('./jos-settings'); }
function dir() { return process.env.PROFILE_COPY_DIR || path.join(S().stateDir(), 'profile'); }
const TIERS = ['small', 'general', 'full'];

function when(iso) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: S().timezone(), weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(new Date(iso)).replace(',', '').replace(/Sept/, 'Sep');
}

function list(raw) {
  let j;
  // Never surface JSON.parse's message: it quotes the input, and the input is profile text.
  try { j = JSON.parse(raw); } catch { throw new Error(`listing isn't valid JSON (${raw.length} chars)`); }
  const arr = Array.isArray(j) ? j : Object.values(j).find(Array.isArray);
  if (!arr) throw new Error('no section list in the listing');
  return arr.filter(s => s && s.slug);
}

// A private section: its slug, title or tags carry a private topic (the settings' list, plus the
// topics every profile keeps out of work).
const ALWAYS = /relationship|therapy|treatment|health|medical|grief|trauma/i;
function isPrivate(s) {
  const text = [s.slug, s.title || '', ...(s.tags || [])].join(' ').replace(/[-_]/g, ' ');
  return ALWAYS.test(text) || S().silo().test(text);
}

function index(raw) {
  const all = list(raw);
  const shown = all.filter(s => !isPrivate(s)).map(s => ({
    slug: s.slug, title: s.title || null, tags: s.tags || [],
    size: String(s.body || s.content || '').length, modified: s.modified || s.updatedAt || null,
  }));
  return { sections: shown, privateLeftOut: all.length - shown.length };
}

function stale(raw) {
  const mf = path.join(dir(), 'manifest.json');
  if (!fs.existsSync(mf)) return 'error: no profile copy yet. /sa:profile builds one.';
  const manifest = JSON.parse(fs.readFileSync(mf, 'utf8'));
  const live = new Map(list(raw).map(s => [s.slug, s.modified || s.updatedAt || null]));
  const missing = TIERS.map(t => `${t}.md`).filter(f => !fs.existsSync(path.join(dir(), f)));
  if (missing.length) return `error: profile copy files missing: ${missing.join(', ')}`;
  const changed = [], gone = [];
  for (const [slug, builtFrom] of Object.entries(manifest.sources || {})) {
    if (!live.has(slug)) { gone.push(slug); continue; }
    const now = live.get(slug);
    if (now && (!builtFrom || new Date(now) > new Date(builtFrom))) changed.push(`${slug} changed ${when(now)}`);
  }
  const built = `built ${manifest.builtAt}${manifest.by ? ` by ${manifest.by}` : ''}`;
  if (!changed.length && !gone.length) return `fresh: ${built}, ${Object.keys(manifest.sources || {}).length} sections unchanged`;
  return `stale: ${[...changed, ...gone.map(s => `${s} no longer in the vault`)].join('; ')} (${built})`;
}

function install(src, sourcesJson, by) {
  if (!src || !fs.existsSync(src)) throw new Error(`no folder at ${src}`);
  let sources;
  try { sources = JSON.parse(sourcesJson || '{}'); } catch { throw new Error('--sources must be JSON: {"slug": "modified"}'); }
  if (!sources || typeof sources !== 'object' || Array.isArray(sources) || !Object.keys(sources).length) throw new Error('--sources needs at least one section');
  const missing = TIERS.filter(t => !fs.existsSync(path.join(src, `${t}.md`)));
  if (missing.length) throw new Error(`missing: ${missing.map(t => t + '.md').join(', ')}`);
  fs.mkdirSync(dir(), { recursive: true });
  for (const t of TIERS) fs.copyFileSync(path.join(src, `${t}.md`), path.join(dir(), `${t}.md`));
  const manifest = { builtAt: new Date().toISOString(), by: by || null, tiers: Object.fromEntries(TIERS.map(t => [t, { file: `${t}.md` }])), sources };
  const tmp = path.join(dir(), `manifest.json.${process.pid}.tmp`);
  fs.writeFileSync(tmp, JSON.stringify(manifest, null, 2) + '\n');
  fs.renameSync(tmp, path.join(dir(), 'manifest.json'));
  return `installed: ${TIERS.join(', ')} from ${Object.keys(sources).length} sections`;
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jos-profile-'));
  const settings = path.join(tmp, 'settings.json');
  fs.writeFileSync(settings, JSON.stringify({ stateDir: tmp, timezone: 'UTC', privateTopics: { words: ['payday'] } }));
  process.env.JUDGEMENT_OS_SETTINGS = settings;
  let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
  const listing = JSON.stringify({ items: [
    { slug: 'how-i-work', title: 'How I work', tags: ['work'], modified: '2026-10-01T10:00:00Z', body: 'SECRET-BODY-1 '.repeat(20) },
    { slug: 'relationships-family', title: 'Family', tags: [], modified: '2026-10-01T10:00:00Z', body: 'SECRET-BODY-2' },
    { slug: 'payday-plans', title: 'Money', tags: [], modified: '2026-10-01T10:00:00Z', body: 'SECRET-BODY-3' },
    { slug: 'my-projects', title: 'Projects', tags: ['health'], modified: '2026-10-01T10:00:00Z', body: 'SECRET-BODY-4' },
    { slug: 'voice', title: 'Voice', tags: ['writing'], modified: '2026-10-02T10:00:00Z', body: 'SECRET-BODY-5' },
  ] });
  const lf = path.join(tmp, 'listing.json'); fs.writeFileSync(lf, listing);
  const idx = index(listing);
  ok('the index never carries a body', !JSON.stringify(idx).includes('SECRET-BODY'));
  ok('private topics are left out, by slug, title, tag and the settings list', idx.sections.map(s => s.slug).join() === 'how-i-work,voice' && idx.privateLeftOut === 3);
  ok('the index gives a size, not the text', idx.sections[0].size === 'SECRET-BODY-1 '.repeat(20).length);
  ok('a bad listing never quotes itself', /isn't valid JSON \(\d+ chars\)/.test((() => { try { list('{"body":"SECRET'); } catch (e) { return e.message; } })()));
  ok('no copy yet: says so', /no profile copy yet/.test(stale(listing)));
  const src = path.join(tmp, 'build'); fs.mkdirSync(src);
  for (const t of TIERS) fs.writeFileSync(path.join(src, `${t}.md`), `# ${t}\n`);
  ok('install needs sections', (() => { try { install(src, '{}'); return false; } catch (e) { return true; } })());
  ok('install writes the copy and the manifest', /installed/.test(install(src, JSON.stringify({ 'how-i-work': '2026-10-01T10:00:00Z', voice: '2026-10-02T10:00:00Z' }), 'test')));
  ok('fresh when nothing moved', /^fresh: .*2 sections unchanged/.test(stale(listing)));
  const moved = listing.replace('2026-10-02T10:00:00Z', '2026-10-05T09:30:00Z');
  ok('stale when a source moved, with when', /^stale: voice changed Mon 5 Oct 09:30/.test(stale(moved)));
  const dropped = JSON.stringify({ items: JSON.parse(listing).items.filter(s => s.slug !== 'voice') });
  ok('stale when a source is gone', /voice no longer in the vault/.test(stale(dropped)));
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${n - fail}/${n} pass`);
  return fail ? 1 : 0;
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : undefined; };
  if (argv[0] === '--test') process.exit(selfTest());
  if (argv[0] === '--install') {
    try { console.log(install(argv[1], opt('sources'), opt('by'))); process.exit(0); }
    catch (e) { console.log(`error: ${e.message}`); process.exit(1); }
  }
  let out;
  try {
    if (argv[0] === '--index') out = JSON.stringify(index(fs.readFileSync(argv[1], 'utf8')), null, 2);
    else if (argv[0]) out = stale(fs.readFileSync(argv[0] === '-' ? 0 : argv[0], 'utf8'));
    else out = 'error: usage: profile-stale.js <listing-file> | --index <listing-file> | --install <dir> --sources <json>';
  } catch (e) { out = `error: ${e.message}`; }
  console.log(out);
  process.exit(0);
}
module.exports = { index, stale, install, isPrivate };
