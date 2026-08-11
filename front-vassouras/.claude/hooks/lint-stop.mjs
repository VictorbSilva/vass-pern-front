import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

function lerStdin() {
  try {
    return JSON.parse(readFileSync(0, 'utf8') || '{}');
  } catch {
    return {};
  }
}

// status null distingue "nao consegui rodar o comando" de "o comando rodou e reprovou".
// No Windows, spawnar npm.cmd sem shell estoura EINVAL, e tratar isso como lint reprovado
// bloquearia todo turno com uma mensagem vazia.
function rodar(comando) {
  try {
    const saida = execSync(comando, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, saida };
  } catch (erro) {
    return {
      ok: false,
      naoRodou: erro.status === null || erro.status === undefined,
      saida: `${erro.stdout ?? ''}${erro.stderr ?? ''}`.trim() || erro.message,
    };
  }
}

const sessao = lerStdin().session_id ?? 'sem-sessao';

// So vale gastar alguns segundos de ESLint se mudou algum arquivo que o ESLint le.
const git = rodar('git status --porcelain');
const temJs =
  git.ok &&
  git.saida
    .split('\n')
    .some((linha) => /\.(js|jsx|mjs|cjs)$/.test(linha.trim().split(/\s+/).pop() ?? ''));

if (!temJs) process.exit(0);

const lint = rodar('npm run lint');

if (lint.ok) {
  rmSync(join(tmpdir(), `vassouras-lint-${sessao}.flag`), { force: true });
  process.exit(0);
}

// Hook quebrado avisa, mas nunca trava a sessao.
if (lint.naoRodou) {
  console.error(`hook de lint nao conseguiu rodar npm: ${lint.saida}`);
  process.exit(0);
}

// Trava anti-loop: um erro que o modelo nao consegue corrigir prenderia a sessao num ciclo
// infinito de "nao pode parar", porque o exit 2 do hook Stop bloqueia o encerramento.
const marcador = join(tmpdir(), `vassouras-lint-${sessao}.flag`);
if (existsSync(marcador)) {
  console.error('npm run lint continua falhando; o hook nao bloqueia de novo nesta sessao.');
  process.exit(0);
}

writeFileSync(marcador, '');
console.error(`npm run lint falhou. Corrija os erros abaixo antes de encerrar.\n\n${lint.saida}`);
process.exit(2);
