import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Categorias from './Categorias';

const CATEGORIAS = [
  { id: 2, nome: 'Escovas', descricao: '', imagem: 'https://exemplo/escovas' },
  { id: 3, nome: 'Vassouras', descricao: '', imagem: null },
];

const resposta = (corpo, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(corpo),
  });

function renderizar() {
  return render(
    <MemoryRouter>
      <Categorias />
    </MemoryRouter>
  );
}

describe('Categorias', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => resposta(CATEGORIAS)));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deve dar a cada categoria um card que leva para a rota dela', async () => {
    renderizar();

    expect(
      await screen.findByRole('link', { name: /escovas/i })
    ).toHaveAttribute('href', '/produtos/2');
    expect(screen.getByRole('link', { name: /vassouras/i })).toHaveAttribute(
      'href',
      '/produtos/3'
    );
  });

  it('deve renderizar a foto da categoria que tem imagem', async () => {
    renderizar();

    expect(await screen.findByRole('img', { name: 'Escovas' })).toHaveAttribute(
      'src',
      'https://exemplo/escovas'
    );
  });

  // Metade das categorias em producao esta sem foto, entao o fallback e o caminho
  // normal e nao a excecao. O que ele nao pode virar e uma <img> apontando para
  // null, que o navegador desenha como icone quebrado.
  it('nao deve renderizar imagem na categoria sem foto', async () => {
    renderizar();

    await screen.findByRole('link', { name: /vassouras/i });

    const imagens = screen.getAllByRole('img');
    expect(imagens).toHaveLength(1);
    expect(imagens[0]).toHaveAccessibleName('Escovas');
  });

  it('deve oferecer a saida para o catalogo inteiro', async () => {
    renderizar();

    await screen.findByRole('link', { name: /escovas/i });

    expect(
      screen.getByRole('link', { name: /ver todos os produtos/i })
    ).toHaveAttribute('href', '/produtos/todos');
  });

  it('deve avisar quando a busca de categorias falha', async () => {
    fetch.mockImplementation(() => resposta(null, 500));

    renderizar();

    expect(
      await screen.findByText('Não foi possível carregar as categorias.')
    ).toBeInTheDocument();
  });

  // Falha e lista vazia caiam na mesma tela no <aside> antigo, e isso ja foi
  // defeito em producao (CP2). A tela nova nao pode reintroduzir.
  it('nao deve confundir falha com catalogo sem categoria', async () => {
    fetch.mockImplementation(() => resposta([]));

    renderizar();

    expect(
      await screen.findByText('Nenhuma categoria cadastrada.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Não foi possível carregar as categorias.')
    ).not.toBeInTheDocument();
  });
});
