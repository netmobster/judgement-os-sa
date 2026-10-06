#!/usr/bin/env node
// find-plugin.js: print the folder of another installed Judgement OS plugin (or a path inside it).
//
// Plugins don't sit next to each other once installed: each lives in its own versioned
// cache folder, so "../day" from here points nowhere. (That broke a path on 1 Oct.)
// This looks in order, and prints the first folder that has what's asked for:
//   1. $JUDGEMENT_OS_PLUGINS/<plugin>   an explicit override
//   2. the source tree: ../../<plugin>  when running from the repo's plugins folder
//   3. the install cache, under any marketplace: ~/.claude/plugins/cache/*/<plugin>/<version>,
//      highest version first. Any marketplace, because the packaged editions install under
//      their own names.
//
//   node find-plugin.js day scripts/day.js      → …/day/<ver>/scripts
//   node find-plugin.js sexyhtml design/echo-jay/styles.css
//   node find-plugin.js --test
const fs = require('fs');
const path = require('path');
const os = require('os');

function semverKey(v) { return v.split('.').map(n => String(Number(n) || 0).padStart(6, '0')).join('.'); }

function candidates(plugin, home = os.homedir(), here = __dirname, env = process.env) {
  const out = [];
  const override = env.JUDGEMENT_OS_PLUGINS;
  if (override) out.push(path.join(override, plugin));
  out.push(path.join(here, '..', '..', plugin));
  // Claude Code keeps its plugins under CLAUDE_CONFIG_DIR when one is set, so a second config finds its own.
  const cache = env.CLAUDE_CONFIG_DIR ? path.join(env.CLAUDE_CONFIG_DIR, 'plugins', 'cache') : path.join(home, '.claude', 'plugins', 'cache');
  const found = [];
  let markets = [];
  try { markets = fs.readdirSync(cache); } catch (e) {}
  for (const m of markets) {
    try {
      for (const v of fs.readdirSync(path.join(cache, m, plugin))) {
        if (/^\d+\.\d+\.\d+$/.test(v)) found.push({ v, dir: path.join(cache, m, plugin, v) });
      }
    } catch (e) {}
  }
  found.sort((a, b) => semverKey(b.v).localeCompare(semverKey(a.v))).forEach(f => out.push(f.dir));
  return out;
}

function find(plugin, inner) {
  for (const root of candidates(plugin)) {
    const target = path.join(root, inner);
    if (fs.existsSync(target)) return path.dirname(target);
  }
  return null;
}

if (require.main === module) {
  if (process.argv[2] === '--test') {
    let n = 0, fail = 0; const ok = (name, c) => { n++; if (!c) { fail++; console.log('FAIL ' + name); } };
    ok('semver orders 0.10.0 above 0.9.9', semverKey('0.10.0') > semverKey('0.9.9'));
    ok('the source tree comes first', candidates('day', '/h', '/p/labs/scripts', {})[0].replace(/\\/g, '/').endsWith('/p/day'));
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'find-'));
    for (const [m, v] of [['old-market', '0.1.0'], ['new-market', '0.2.0']]) fs.mkdirSync(path.join(tmp, '.claude', 'plugins', 'cache', m, 'day', v), { recursive: true });
    const c = candidates('day', tmp, '/nowhere/labs/scripts', {}).map(x => x.replace(/\\/g, '/'));
    ok('any marketplace, highest version first', c[1].endsWith('new-market/day/0.2.0') && c[2].endsWith('old-market/day/0.1.0'));
    ok('the override wins', candidates('day', tmp, '/x', { JUDGEMENT_OS_PLUGINS: '/o' })[0].replace(/\\/g, '/').endsWith('/o/day'));
    const cfg = path.join(tmp, 'cfg'); fs.mkdirSync(path.join(cfg, 'plugins', 'cache', 'm', 'day', '0.3.0'), { recursive: true });
    ok('a CLAUDE_CONFIG_DIR finds its own plugins', candidates('day', tmp, '/nowhere/labs/scripts', { CLAUDE_CONFIG_DIR: cfg }).map(x => x.replace(/\\/g, '/'))[1].endsWith('cfg/plugins/cache/m/day/0.3.0'));
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`${n - fail}/${n} pass`); process.exit(fail ? 1 : 0);
  }
  const [plugin, inner] = process.argv.slice(2);
  if (!plugin || !inner) { console.error('usage: find-plugin.js <plugin> <path inside it>'); process.exit(2); }
  const dir = find(plugin, inner);
  if (!dir) { console.error(`not found: ${plugin}/${inner}`); process.exit(1); }
  console.log(dir.replace(/\\/g, '/'));
}
module.exports = { find };
