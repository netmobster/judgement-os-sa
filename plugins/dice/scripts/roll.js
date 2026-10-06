#!/usr/bin/env node
// roll.js: real dice, so the model never picks a number. Cryptographic randomness.
// Same principle as Seren's gate.py: a roll is a fact about the world, not something the
// narrator authors.
//
//   node roll.js 1d20+5            node roll.js 2d20kh1+7 (advantage)
//   node roll.js d20 adv           node roll.js d20 dis
//   node roll.js 4d6dl1 x6         (ability scores: six sets)
//   node roll.js 8d6 fireball      (anything after the dice is a label)
//   node roll.js 3d8+4 2d8+4       (several expressions at once)
//   node roll.js --test
//
// Notation: NdS, then optional kh/kl/dh/dl N, then + or - terms (dice or flat).
// `adv` / `dis` turns a d20 into 2d20 keep high/low. `xN` repeats the whole roll N times.
const crypto = require('crypto');

function die(sides) {                       // unbiased integer 1..sides
  if (sides < 1) throw new Error('a die needs at least 1 side');
  const max = Math.floor(0x100000000 / sides) * sides;
  let r;
  do { r = crypto.randomBytes(4).readUInt32BE(0); } while (r >= max);
  return (r % sides) + 1;
}

function parseTerm(term) {
  const m = term.match(/^(\d*)d(\d+|%)((?:kh|kl|dh|dl|k|d)\d+)?$/i);
  if (m) {
    const n = m[1] === '' ? 1 : +m[1];
    const s = m[2] === '%' ? 100 : +m[2];
    if (n > 200 || s > 1000) throw new Error(`"${term}" is too big`);
    let keep = null;
    if (m[3]) { const k = m[3].toLowerCase().match(/^(kh|kl|dh|dl|k|d)(\d+)$/); keep = { op: k[1] === 'k' ? 'kh' : k[1] === 'd' ? 'dl' : k[1], n: +k[2] }; }
    return { dice: true, n, s, keep };
  }
  if (/^\d+$/.test(term)) return { dice: false, value: +term };
  throw new Error(`can't read "${term}"`);
}

function rollExpr(expr, mode, rng = die) {
  let e = expr.replace(/\s+/g, '').toLowerCase();
  if (mode && /^1?d20/.test(e)) e = e.replace(/^1?d20/, mode === 'adv' ? '2d20kh1' : '2d20kl1');
  const parts = e.match(/[+-]?[^+-]+/g);
  if (!parts) throw new Error(`can't read "${expr}"`);
  let total = 0; const shown = [];
  for (const raw of parts) {
    const sign = raw[0] === '-' ? -1 : 1;
    const t = parseTerm(raw.replace(/^[+-]/, ''));
    if (!t.dice) { total += sign * t.value; shown.push(`${sign < 0 ? '−' : '+'} ${t.value}`); continue; }
    const rolls = Array.from({ length: t.n }, () => rng(t.s));
    let kept = rolls.map((v, i) => ({ v, i, keep: true }));
    if (t.keep) {
      const order = [...kept].sort((a, b) => a.v - b.v);       // ascending
      const k = Math.min(t.keep.n, t.n);
      let drop;
      if (t.keep.op === 'kh') drop = order.slice(0, t.n - k);
      else if (t.keep.op === 'kl') drop = order.slice(k);
      else if (t.keep.op === 'dl') drop = order.slice(0, k);
      else drop = order.slice(t.n - k);                          // dh
      drop.forEach(d => (kept[d.i].keep = false));
    }
    const sum = kept.filter(x => x.keep).reduce((a, x) => a + x.v, 0);
    total += sign * sum;
    const face = kept.map(x => (x.keep ? String(x.v) : `~~${x.v}~~`)).join(', ');
    shown.push(`${sign < 0 ? '−' : shown.length ? '+' : ''} ${t.n}d${t.s}${t.keep ? t.keep.op + t.keep.n : ''} [${face}]`.trim());
  }
  const d20 = /\b1?d20\b|2d20k[hl]1/.test(e);
  const natural = d20 && parts.length >= 1 ? (() => { const m = shown[0].match(/\[([^\]]+)\]/); if (!m) return null; const keptVals = m[1].split(', ').filter(x => !x.startsWith('~~')).map(Number); return keptVals.length === 1 ? keptVals[0] : null; })() : null;
  return { expr, mode, total, detail: shown.join(' '), nat: natural };
}

function run(args, rng) {
  const out = []; let mode = null, times = 1; const exprs = []; const label = [];
  for (const a of args) {
    if (/^adv(antage)?$/i.test(a)) mode = 'adv';
    else if (/^dis(advantage)?$/i.test(a)) mode = 'dis';
    else if (/^x\d+$/i.test(a)) times = Math.min(+a.slice(1), 20);
    else if (/^[\dd%+\-khl]+$/i.test(a) && /d/i.test(a)) exprs.push(a);
    else label.push(a);
  }
  if (!exprs.length) exprs.push('1d20');
  for (let t = 0; t < times; t++) for (const e of exprs) {
    const r = rollExpr(e, mode, rng);
    let line = `${r.expr}${mode ? ` (${mode})` : ''}${label.length ? ` · ${label.join(' ')}` : ''}: **${r.total}**   ${r.detail}`;
    if (r.nat === 20) line += '   ⚡ natural 20';
    if (r.nat === 1) line += '   ✗ natural 1';
    out.push(line);
  }
  return out.join('\n');
}

if (process.argv[2] === '--test') {
  let fail = 0; const ok = (n, c) => { if (!c) { fail++; console.log('FAIL ' + n); } };
  const fixed = seq => { let i = 0; return () => seq[i++ % seq.length]; };
  ok('1d20+5', rollExpr('1d20+5', null, fixed([12])).total === 17);
  ok('adv keeps high', rollExpr('d20+3', 'adv', fixed([4, 15])).total === 18);
  ok('dis keeps low', rollExpr('d20+3', 'dis', fixed([4, 15])).total === 7);
  ok('4d6dl1', rollExpr('4d6dl1', null, fixed([1, 6, 5, 3])).total === 14);
  ok('2d20kh1 nat20', rollExpr('2d20kh1', null, fixed([20, 2])).nat === 20);
  ok('nat 1 on dis', rollExpr('d20', 'dis', fixed([1, 19])).nat === 1);
  ok('minus term', rollExpr('3d8-2', null, fixed([8, 8, 8])).total === 22);
  ok('dice + dice', rollExpr('1d8+2d6+4', null, fixed([5, 3, 4])).total === 16);
  ok('d% is 1..100', (() => { for (let i = 0; i < 2000; i++) { const v = die(100); if (v < 1 || v > 100) return false; } return true; })());
  ok('d6 covers 1..6', (() => { const s = new Set(); for (let i = 0; i < 600; i++) s.add(die(6)); return s.size === 6; })());
  ok('rejects junk', (() => { try { rollExpr('banana', null); return false; } catch (e) { return true; } })());
  ok('x6 gives 6 lines', run(['4d6dl1', 'x6']).split('\n').length === 6);
  console.log(`${12 - fail}/12 pass`); process.exit(fail ? 1 : 0);
} else {
  try { console.log(run(process.argv.slice(2))); }
  catch (e) { console.log(`Can't roll that: ${e.message}. Try 1d20+5, 2d20kh1, 4d6dl1 x6, d20 adv.`); process.exit(1); }
}
