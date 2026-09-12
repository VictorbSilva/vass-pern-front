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

  // A fixture de Escovas TEM foto de proposito. As fotos do catalogo sao fichas
  // tecnicas em fundo branco, que num card 4:3 leem como pagina de catalogo
  // escaneada — a decisao foi icone em todo card, e este teste prova que o campo
  // e ignorado mesmo quando esta preenchido.
  it('nunca deve renderizar foto, nem na categoria que tem imagem', async () => {
    renderizar();

    await screen.findByRole('link', { name: /escovas/i });

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('deve dar icones diferentes a categorias diferentes', async () => {
    renderizar();

    const escovas = await screen.findByRole('link', { name: /escovas/i });
    const vassouras = screen.getByRole('link', { name: /vassouras/i });

    const svgDe = (link) => link.querySelector('svg')?.innerHTML;

    expect(svgDe(escovas)).toBeTruthy();
    expect(svgDe(vassouras)).toBeTruthy();
    expect(svgDe(escovas)).not.toBe(svgDe(vassouras));
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
