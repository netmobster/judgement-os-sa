#!/usr/bin/env node
// stage.js: put a LABS page beside its design system, ready to publish.
// The design files come from the sexyhtml plugin, wherever it's installed.
//
//   node stage.js <page.html> --out <dir> [--design selfactual|echo-jay]
//       copies the page in beside that design system, prints {page, root, files}
//
// results-page.js uses stageDesign() for the same thing.

const fs = require('fs');
const path = require('path');
const { find } = require('./find-plugin');

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

// The design systems a LABS page can stand on, both in the sexyhtml plugin.
// selfactual: the results page. echo-jay: the guide (Jay, 1 Oct: Jay's own pages use ECHO-JAY).
const DESIGNS = {
  selfactual: { dir: 'design/selfactual', assets: ['assets/selfactual-logo.png'] },
  'echo-jay': { dir: 'design/echo-jay', assets: [] },
};

// Copies styles.css, tokens/ and any assets into `out`; returns the published paths.
function stageDesign(out, which = 'selfactual') {
  const d = DESIGNS[which];
  if (!d) throw new Error(`unknown design: ${which} (have: ${Object.keys(DESIGNS).join(', ')})`);
  const design = find('sexyhtml', d.dir + '/styles.css');
  if (!design) throw new Error(`sexyhtml plugin not found: this page needs its ${which} design system`);
  fs.mkdirSync(out, { recursive: true });
  fs.copyFileSync(path.join(design, 'styles.css'), path.join(out, 'styles.css'));
  copyDir(path.join(design, 'tokens'), path.join(out, 'tokens'));
  for (const a of d.assets) { fs.mkdirSync(path.join(out, path.dirname(a)), { recursive: true }); fs.copyFileSync(path.join(design, a), path.join(out, a)); }
  return ['styles.css', ...d.assets, ...fs.readdirSync(path.join(out, 'tokens')).map(f => 'tokens/' + f)];
}

function staged(out, pageName, files) {
  return { page: path.join(out, pageName).replace(/\\/g, '/'), root: out.replace(/\\/g, '/'), files };
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const i = argv.indexOf('--out'), j = argv.indexOf('--design');
  const values = [i, j].filter(x => x >= 0).map(x => x + 1);   // the arguments that are option values
  const page = argv.find((a, k) => !a.startsWith('--') && !values.includes(k));
  if (!page || i < 0) { console.error('usage: stage.js <page.html> --out <dir> [--design selfactual|echo-jay]'); process.exit(2); }
  const out = path.resolve(argv[i + 1]);
  const files = stageDesign(out, j >= 0 ? argv[j + 1] : 'selfactual');
  fs.copyFileSync(path.resolve(page), path.join(out, path.basename(page)));
  console.log(JSON.stringify(staged(out, path.basename(page), files), null, 2));
}
module.exports = { stageDesign, staged };
