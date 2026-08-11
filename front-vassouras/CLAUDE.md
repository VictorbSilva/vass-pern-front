# Vassouras Pernambucanas — front

Catálogo B2B em React 19 + Vite 7 + React Router 7. SPA sem backend próprio: consome a API
Django em `VITE_API_URL`.

## Raiz e comandos

A raiz do Vite é `front-vassouras/`, **não** a raiz do repositório git. Comando rodado um
nível acima falha de um jeito confuso (npm não acha script, eslint não acha config).

```
npm run dev      # servidor local
npm run build    # build de produção
npm run lint     # eslint .
npm test         # vitest em modo watch
npx vitest --run # uma passada só (o que interessa antes de PR)
```

## Estrutura

- `src/pages/` — uma página por rota, todas registradas em `App.jsx`.
- `src/components/` — o que é reusado por mais de uma página (`ProdutoCard`, `ProdutosRow`,
  `BotaoWhatsapp`, `Header`, `Footer`).
- `src/services/` — o que fala com o mundo externo: `api.js` (rede), `ads.js` (gtag).
- `src/utils/` — função pura, sem React (`embaralhar.js`, `GeraLinkWhatsapp.jsx`).
- Teste fica ao lado do arquivo testado, como `Nome.test.jsx` (`components/Footer.test.jsx`,
  `pages/ProdutoDetalhe.test.jsx`).

## Convenções (cada uma comprovada em arquivo)

**Vocabulário de domínio em português.** `buscarJson` (`services/api.js`), `embaralhar`
(`utils/embaralhar.js`), `idCategoria` / `termoBusca` (`pages/Catalogo.jsx`),
`registrarConversaoWhatsapp` (`services/ads.js`). Nos testes idem: `it('deve renderizar sem
erro')` (`components/Footer.test.jsx`) — os arquivos novos escrevem os títulos sem acento.

**Estilo só por classe utilitária do Tailwind no JSX.** Tailwind 4 pelo plugin
`@tailwindcss/vite` (`vite.config.js`); não existe `tailwind.config.js`. `src/index.css` é
uma linha (`@import "tailwindcss";`) e `src/App.css` está vazio. Não se escreve CSS novo
neste projeto — valor arbitrário vai em colchete (`min-h-[45vh]` em `pages/Sobre.jsx`).

**Toda chamada de rede passa por `buscarJson`** de `services/api.js`, com `API_BASE_URL`
vindo de lá — a URL nunca é remontada à mão. O erro lançado carrega `erro.status`, e é isso
que deixa `pages/ProdutoDetalhe.jsx` separar 404 (`'nao-encontrado'`) de falha de rede
(`'falha'`).

**`AbortController` + limpeza no `useEffect`** em toda busca: `Home.jsx`, `Catalogo.jsx` e
os dois efeitos de `ProdutoDetalhe.jsx` criam o controller, passam o `signal` para
`buscarJson`, ignoram `error.name === 'AbortError'` e abortam no return do efeito. A função
async é chamada com `void fetchX()` — veio da limpeza de alertas do Sonar/IDE, mantenha.

**Estados de tela explícitos: carregando / erro / vazio / com dado.** `Catalogo.jsx` trata
os quatro; `ProdutoDetalhe.jsx` tem erro com botão "Tentar novamente" (contador `tentativa`
como dependência do efeito, que é o que refaz a busca). Página que só trata o caminho feliz
já custou defeito em produção aqui.

**Debounce onde o usuário digita ou redimensiona.** 700 ms na busca do catálogo
(`Catalogo.jsx`), 300 ms no resize de `ProdutosRow.jsx`. Ambos limpam o timer no return.

**Variáveis de ambiente.** `VITE_API_URL` é só a origem, sem barra final e sem `/api` —
`api.js` corta a barra e o caminho é montado no código. O gtag só carrega se
`VITE_GADS_ID` existir (`services/ads.js`); sem a variável, nenhum script de terceiro e
nenhum cookie entram na página.

**Teste.** Vitest + Testing Library em jsdom (`vite.config.js`), `setupTests.js` faz
`cleanup` e importa `jest-dom/vitest`. Padrão observado: `fetch` stubado com
`vi.stubGlobal` e desfeito no `afterEach` (`App.test.jsx`), componente com `Link` renderiza
dentro de `MemoryRouter` (`Footer.test.jsx`), env com `vi.stubEnv` (`ads.test.js`). Não há
`@testing-library/user-event` em todo teste — só onde há clique.

**ESLint.** `eslint.config.js` usa o recomendado + react-hooks + react-refresh, e ajusta
`no-unused-vars` para ignorar identificadores `^[A-Z_]`. Um hook de Stop roda `npm run lint`
ao fim do turno quando há `.js/.jsx` modificado (`.claude/hooks/lint-stop.mjs`).

**Commits.** Conventional Commits com escopo opcional e mensagem em português sem acento:
`fix(sonar): resolve alertas do SonarQube e das inspecoes da IDE`. O histórico antigo tem
mensagens em inglês; para commit novo, siga o padrão em português.

## Antes de abrir PR

`npm run lint` **e** `npm test` (ou `npx vitest --run`), rodados dentro de
`front-vassouras/`. Hoje os dois passam limpos — quebra é regressão sua.

## Armadilhas desta stack

- **Variável indefinida em JSX não quebra o build.** Para o Rollup ela é global livre, não
  import faltando: compila, deploya e explode em runtime. Só o `no-undef` do ESLint ou um
  teste de render pegam. Isso já derrubou o site inteiro uma vez.
- **Erro em `Header` ou `Footer` derruba o app inteiro**, não só o componente: os dois são
  irmãos de `<Routes>` em `App.jsx` e não existe error boundary.
- **HTTP 200 não prova que a SPA funciona.** `index.html` é só a casca (e o `vercel.json`
  reescreve toda rota para ela); o erro está no JS. Verificar é abrir a página e olhar o
  console, ou ter teste de render.
- **Variável `VITE_*` é embutida no build** — mudar o valor na Vercel exige redeploy.

## Trabalho com o dev

- O dev mantém este código e precisa entender cada linha. **Explique cada mudança**; nada de
  caixa-preta para colar.
- **Comentário no código só quando for load-bearing**, isto é, quando impede alguém de
  "consertar" uma escolha deliberada — como o comentário sobre `function` e `arguments` em
  `services/ads.js`. O resto da explicação vai no PR e na conversa.
- **Rigor proporcional ao risco.** V1 atrasado: sem over-engineering, sem abstração
  preventiva, sem suíte gigante.
- **PR que remove código merece leitura dobrada:** apagar a definição e esquecer o uso é
  exatamente o erro que derrubou o site, e o build não pega.

## Inconsistências conhecidas (decidir, não "consertar" de passagem)

- **Formatação:** 13 arquivos com 2 espaços e `import { x }` (majoritário, e é o estilo de
  tudo que é recente: `ads.js`, `Catalogo.jsx`, os testes) contra 8 com 4 espaços e
  `import {x}` (`App.jsx`, `ProdutoDetalhe.jsx`, `ProdutoCard.jsx`, `ProdutosRow.jsx`,
  `Footer.jsx`, `Contatos.jsx`, `api.js`, `GeraLinkWhatsapp.jsx`). Não há Prettier nem
  `.editorconfig` no repositório; a formatação de 4 espaços veio do WebStorm.
- **Declaração de componente:** páginas e `Header`/`Footer` usam `function Nome()`;
  `ProdutoCard`, `ProdutosRow` e `BotaoWhatsapp` usam `const Nome = () =>`.
- **Nome do estado de erro/carregamento:** `isLoading`/`error` em `Home.jsx` e
  `Catalogo.jsx`, contra `erro`/`loadingRelacionados` em `ProdutoDetalhe.jsx`.
- **`ProdutosRow` recebe uma prop que não consome:** `ProdutoDetalhe.jsx` passa
  `loading={loadingRelacionados}`, mas a assinatura em `ProdutosRow.jsx` é
  `({titulo, produtos})` — não existe estado de carregamento nessa faixa.
- **`Home.jsx` não trata lista vazia** (só `produtos.length > 0`), enquanto `Catalogo.jsx`
  mostra "Nenhum produto encontrado.".
- **`utils/GeraLinkWhatsapp.jsx` não contém JSX** e mesmo assim usa a extensão `.jsx`,
  diferente de `utils/embaralhar.js`.
