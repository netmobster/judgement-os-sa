#!/usr/bin/env node
// guard.js: PreToolUse. Hard rules, enforced as code instead of memory. Each rule returns deny
// (never right) or ask (right only with the user's yes, so the app stops and asks). Silent when
// nothing matches. A guard that crashes never blocks work.
//
// What it reads from the install's settings (jos-settings): stateDir (state files there change
// only through their scripts), guard.protectMain (folders where main is protected)
// and vault.username (a write to anyone else's vault asks)
// .
//
// Test: node guard.js --test   (runs the cases at the bottom)

const path = require('path');
const { execFileSync } = require('child_process');
const S = require('./jos-settings');

const norm = p => String(p || '').replace(/\\/g, '/').toLowerCase();

const SECRET = [
  /gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{40,}/,
  /sk-(ant-)?[A-Za-z0-9_-]{24,}/, /sk_live_[A-Za-z0-9]{16,}/, /AKIA[0-9A-Z]{16}/,
  /xox[abprs]-[A-Za-z0-9-]{10,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
];
const SILO = { test: s => /relationships?|treatment|therapy|health/i.test(s) || S.silo().test(String(s).replace(/[-_]/g, ' ')) };   // the user's private topics
const VAULT_WRITE = /__(create_|update_|write_|delete_|complete_|drop_|save_|set_|send_|broadcast_|share_|revoke_|register_|archive_)/;

function branchOf(dir) {
  try { return execFileSync('git', ['-C', dir, 'branch', '--show-current'], { encoding: 'utf8', timeout: 2000 }).trim(); }
  catch (e) { return ''; }
}

// A state file: JSON or JSONL straight in the state folder (or its labs/), never settings.json.
function isState(fp, stateDir) {
  const dir = norm(stateDir).replace(/\/+$/, '');
  if (!dir || !fp.startsWith(dir + '/')) return false;
  const rest = fp.slice(dir.length + 1);
  return /^(labs\/)?[^/]+\.(json|jsonl)$/.test(rest) && rest !== 'settings.json';
}

function check(input, getBranch = branchOf) {
  const s = S.load();
  const tool = String(input.tool_name || '');
  const ti = input.tool_input || {};
  const cwd = norm(input.cwd);
  const protectedHere = p => (s.guard.protectMain || []).map(norm).filter(Boolean).some(f => p.includes(f));
  const inProtected = protectedHere(cwd);
  const deny = r => ({ decision: 'deny', reason: r });
  const ask = r => ({ decision: 'ask', reason: r });

  // ---- Bash ------------------------------------------------------------------------
  if (tool === 'Bash' || tool === 'PowerShell') {
    const c = String(ti.command || '');
    // Reading the pass is fine; creating, copying or deleting it is not.
    // The write op must point AT the pass (a redirect into it, or a command/call naming it),
    // so a doc edit that merely mentions the filename isn't caught.
    if (/>>?\s*["']?[^\s"';|&]*send-pass|\b(tee|cp|mv|touch|rm|ln|Set-Content|Out-File|Add-Content|New-Item|Copy-Item|Move-Item|Remove-Item)\b[^\n;|&]*send-pass|\b(writeFile\w*|appendFile\w*|unlink\w*|rename\w*|copyFile\w*)\s*\([^;]*send-pass|sed\s+-i[^\n;|&]*\s["']?\S*send-pass\.json["']?\s*($|[;|&])/i.test(c))
      return deny('The send pass is issued only by the user typing "send". Claude never writes it.');
    if (/\bdeploy-[a-z-]+\.sh\b|\bterraform\s+apply\b|\bpm2\s+(restart|reload|start|delete|stop)\b|\baws\s+ssm\s+send-command\b/i.test(c))
      return deny('Deploy guard: Claude never deploys. Print the command for the user to run.');
    if (/\bgit\s+push\b[^\n]*(--force\b|--force-with-lease\b|\s-f\b)|\bgit\s+reset\s+--hard\b|\bgit\s+clean\s+-[a-z]*f|\bgit\s+branch\s+-D\b|\bgit\s+push\b[^\n]*--delete\b|\brm\s+-[a-z]*r[a-z]*f|\bRemove-Item\b[^\n]*-Recurse/i.test(c))
      return ask('Destructive command. The user confirms before it runs.');
    if (inProtected && /\bgit\s+(commit|push|merge)\b/.test(c)) {
      const b = getBranch(input.cwd);
      if (b === 'main' || b === 'master') return deny(`Branch guard: this repo is on ${b}. Make a feature branch first.`);
    }
    return null;
  }

  // ---- File writes -----------------------------------------------------------------
  if (/^(Write|Edit|MultiEdit|NotebookEdit)$/.test(tool)) {
    const fp = norm(ti.file_path || ti.notebook_path);
    if (isState(fp, s.stateDir))
      return deny(/\/labs\/[^/]+$|\/log\.jsonl$/.test(fp) || fp === norm(s.log)
        ? 'The Judgement OS log changes only through its scripts: labs-log.js and record.js. It is append-only evidence.'
        : 'State files change only through their own scripts (day.js, the send gate, the recorder). Never by hand.');
    const body = [ti.content, ti.new_string, ti.new_source, JSON.stringify(ti.edits || '')].join('\n');
    if (SECRET.some(r => r.test(body)))
      return ask('This write contains what looks like a secret (token or key). The user confirms.');
    if (protectedHere(fp)) {
      const b = getBranch(path.dirname(ti.file_path || ti.notebook_path));
      if (b === 'main' || b === 'master') return ask(`Branch guard: this repo is on ${b}. The user confirms before files change on ${b}.`);
    }
    return null;
  }

  // ---- MCP -------------------------------------------------------------------------
  if (tool.startsWith('mcp__')) {
    const verb = tool.replace(/^mcp__.+?__/, '');
    const json = JSON.stringify(ti);
    if (/^list_profile_sections$/.test(verb))
      return deny('list_profile_sections returns every section body, gated ones included. Load one section by name instead.');
    if (verb === 'vault_list' && /profile_sections/.test(String(ti.type)) && ti.fields !== 'summary')
      return deny('profile_sections only with fields:"summary": the full listing returns gated sections too.');
    if (verb === 'get_profile_section' && SILO.test(String(ti.slug || ti.name || '')))
      return inProtected ? deny('Silo rule: that section never loads in a work session.')
                         : ask('Silo-gated profile section. The user confirms.');
    if (verb === 'list_tasks' && (!ti.status || (ti.limit && ti.limit > 200)))
      return deny('list_tasks needs a status filter and limit ≤ 200 (a wide page overflows the tool result).');
    const me = s.vault && s.vault.username;
    if (me && VAULT_WRITE.test('__' + verb)) {
      const m = json.match(/"(?:username|toUsername)":"([^"]+)"/);
      if (m && m[1] !== me) return ask(`This writes to someone else's vault (${m[1]}). The user confirms.`);
    }
    if (verb === 'archive_session')
      return ask('archive_session ends the session for good. Only when the user said "archive" about this session.');
    if (SECRET.some(r => r.test(json)))
      return ask('This call carries what looks like a secret (token or key). The user confirms.');
  }
  return null;
}

function emit(res) {
  if (!res) return;
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: res.decision, permissionDecisionReason: 'guard: ' + res.reason },
  }));
}

if (process.argv[2] === '--test') {
  // Neutral settings, never the operator's own: a state folder and one protected folder.
  const fs = require('fs'), os = require('os');
  const fx = path.join(os.tmpdir(), `guard-settings-${process.pid}.json`);
  const fixture = { stateDir: 'C:\\Users\\u\\.jos', log: 'C:\\Users\\u\\.jos\\log.jsonl', guard: { protectMain: ['/work/team'] } };
  fixture.vault = { username: 'me' };
  fs.writeFileSync(fx, JSON.stringify(fixture));
  process.env.JUDGEMENT_OS_SETTINGS = fx;
  const team = 'C:\\work\\team\\platform';
  const home = 'C:\\Users\\u\\project';
  const st = f => 'C:\\Users\\u\\.jos\\' + f;
  const main = () => 'main', feat = () => 'cc/x';
  const cases = [
    ['deploy script', { tool_name: 'Bash', cwd: team, tool_input: { command: 'bash scripts/deploy-gateway.sh --env staging' } }, feat, 'deny'],
    ['terraform apply', { tool_name: 'Bash', cwd: team, tool_input: { command: 'terraform apply -auto-approve' } }, feat, 'deny'],
    ['terraform plan ok', { tool_name: 'Bash', cwd: team, tool_input: { command: 'terraform plan' } }, feat, null],
    ['force push', { tool_name: 'Bash', cwd: home, tool_input: { command: 'git push --force origin x' } }, feat, 'ask'],
    ['reset hard', { tool_name: 'Bash', cwd: home, tool_input: { command: 'git reset --hard HEAD~1' } }, feat, 'ask'],
    ['rm -rf', { tool_name: 'Bash', cwd: home, tool_input: { command: 'rm -rf dist' } }, feat, 'ask'],
    ['commit on a protected main', { tool_name: 'Bash', cwd: team, tool_input: { command: 'git commit -m x' } }, main, 'deny'],
    ['commit on a protected branch', { tool_name: 'Bash', cwd: team, tool_input: { command: 'git commit -m x' } }, feat, null],
    ['commit on an unprotected main', { tool_name: 'Bash', cwd: home, tool_input: { command: 'git commit -m x' } }, main, null],
    ['plain ls', { tool_name: 'Bash', cwd: team, tool_input: { command: 'ls -la' } }, main, null],
    ['edit day.json', { tool_name: 'Edit', cwd: home, tool_input: { file_path: st('day.json'), new_string: 'x' } }, feat, 'deny'],
    ['edit a script beside it ok', { tool_name: 'Edit', cwd: home, tool_input: { file_path: st('hooks\\day.js'), new_string: 'x' } }, feat, null],
    ['write the log', { tool_name: 'Write', cwd: home, tool_input: { file_path: st('log.jsonl'), content: '{}' } }, feat, 'deny'],
    ['edit a labs state file', { tool_name: 'Edit', cwd: home, tool_input: { file_path: st('labs\\results.json'), new_string: 'x' } }, feat, 'deny'],
    ['edit the settings ok', { tool_name: 'Edit', cwd: home, tool_input: { file_path: st('settings.json'), new_string: 'x' } }, feat, null],
    ['edit the profile ok', { tool_name: 'Edit', cwd: home, tool_input: { file_path: st('profile.md'), new_string: 'x' } }, feat, null],
    ['edit a script ok', { tool_name: 'Edit', cwd: home, tool_input: { file_path: home + '\\plugins\\labs\\scripts\\labs-log.js', new_string: 'x' } }, feat, null],
    ['write secret', { tool_name: 'Write', cwd: home, tool_input: { file_path: home + '\\a.md', content: 'token ghp_' + 'a'.repeat(36) } }, feat, 'ask'],
    ['write on a protected main', { tool_name: 'Write', cwd: team, tool_input: { file_path: team + '\\README.md', content: 'x' } }, main, 'ask'],
    ['forge send pass', { tool_name: 'Bash', cwd: home, tool_input: { command: 'echo {} > ~/.jos/send-pass.json' } }, feat, 'deny'],
    ['write send pass', { tool_name: 'Write', cwd: home, tool_input: { file_path: st('send-pass.json'), content: '{}' } }, feat, 'deny'],
    ['node writes send pass', { tool_name: 'Bash', cwd: home, tool_input: { command: 'node -e "require(\'fs\').writeFileSync(require(\'os\').homedir()+\'/.jos/send-pass.json\',\'{}\')"' } }, feat, 'deny'],
    ['doc mentions send pass ok', { tool_name: 'Bash', cwd: home, tool_input: { command: 'sed -i "s/x/y/" docs/PLUGINS.md # mentions send-pass.json and <b>html</b>' } }, feat, null],
    ['read send pass ok', { tool_name: 'Bash', cwd: home, tool_input: { command: 'grep -n uses ~/.jos/send-pass.json' } }, feat, null],
    ['archive', { tool_name: 'mcp__abc__archive_session', cwd: home, tool_input: {} }, feat, 'ask'],
    ['list_profile_sections', { tool_name: 'mcp__abc__list_profile_sections', cwd: home, tool_input: { username: 'x' } }, feat, 'deny'],
    ['vault_list summary ok', { tool_name: 'mcp__abc__vault_list', cwd: home, tool_input: { type: 'profile_sections', fields: 'summary' } }, feat, null],
    ['vault_list full', { tool_name: 'mcp__abc__vault_list', cwd: home, tool_input: { type: 'profile_sections' } }, feat, 'deny'],
    ['silo in a protected folder', { tool_name: 'mcp__abc__get_profile_section', cwd: team, tool_input: { slug: 'relationships-x' } }, feat, 'deny'],
    ['silo elsewhere', { tool_name: 'mcp__abc__get_profile_section', cwd: home, tool_input: { slug: 'therapy-notes' } }, feat, 'ask'],
    ['ok section', { tool_name: 'mcp__abc__get_profile_section', cwd: team, tool_input: { slug: 'ai-protocol' } }, feat, null],
    ['list_tasks unfiltered', { tool_name: 'mcp__abc__list_tasks', cwd: home, tool_input: { username: 'x' } }, feat, 'deny'],
    ['list_tasks 500', { tool_name: 'mcp__abc__list_tasks', cwd: home, tool_input: { username: 'x', status: ['Next'], limit: 500 } }, feat, 'deny'],
    ['list_tasks ok', { tool_name: 'mcp__abc__list_tasks', cwd: home, tool_input: { username: 'x', status: ['Next'], limit: 75 } }, feat, null],
    ['write to someone else', { tool_name: 'mcp__abc__create_task', cwd: home, tool_input: { username: 'someone', title: 'x' } }, feat, 'ask'],
    ['write to yourself ok', { tool_name: 'mcp__abc__create_task', cwd: home, tool_input: { username: 'me', title: 'x' } }, feat, null],
    ['read someone else ok', { tool_name: 'mcp__abc__list_messages', cwd: home, tool_input: { username: 'someone' } }, feat, null],
  ];
  let fail = 0;
  for (const [name, inp, br, want] of cases) {
    const got = check(inp, br); const d = got ? got.decision : null;
    if (d !== want) { fail++; console.log(`FAIL ${name}: want ${want}, got ${d}`); }
  }
  try { fs.unlinkSync(fx); } catch (e) {}
  console.log(`${cases.length - fail}/${cases.length} pass`);
  process.exit(fail ? 1 : 0);
} else {
  let raw = '';
  process.stdin.on('data', d => (raw += d));
  process.stdin.on('end', () => {
    let input = {};
    try { input = JSON.parse(raw || '{}'); } catch (e) { return; }
    try { emit(check(input)); } catch (e) { /* a guard that crashes must not block work */ }
  });
}
