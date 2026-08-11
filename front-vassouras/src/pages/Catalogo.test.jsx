import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Catalogo from './Catalogo';

const CATEGORIAS = [
  { id: 2, nome: 'Escovas' },
  { id: 3, nome: 'Vassouras' },
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
      <Catalogo />
    </MemoryRouter>
  );
}

describe('Catalogo', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deve listar as categorias quando a api responde', async () => {
    fetch.mockImplementation((url) =>
      url.includes('/categorias/') ? resposta(CATEGORIAS) : resposta([])
    );

    renderizar();

    expect(await screen.findByText('Escovas')).toBeInTheDocument();
    expect(screen.getByText('Vassouras')).toBeInTheDocument();
  });

  // O catalogo mostrava "R$ 20.00" enquanto a PDP mostrava "R$ 20,00" para o mesmo produto.
  it('deve formatar o preco do card em pt-BR', async () => {
    fetch.mockImplementation((url) =>
      url.includes('/categorias/')
        ? resposta([])
        : resposta([{ id: 7, nome: 'Escova Oval', preco: '20.00', imagem: null }])
    );

    renderizar();

    expect(await screen.findByText('R$ 20,00')).toBeInTheDocument();
  });

  it('deve avisar quando a busca de categorias falha', async () => {
    fetch.mockImplementation((url) =>
      url.includes('/categorias/') ? resposta(null, 500) : resposta([])
    );

    renderizar();

    expect(
      await screen.findByText('Não foi possível carregar as categorias.')
    ).toBeInTheDocument();
  });

  // O botao "Todos" e estatico. Sem esta assercao, a falha de categorias ficaria
  // indistinguivel do estado normal — que era exatamente o defeito em producao.
  it('nao deve confundir falha de categorias com catalogo sem categoria', async () => {
    fetch.mockImplementation((url) =>
      url.includes('/categorias/') ? resposta([]) : resposta([])
    );

    renderizar();

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(
      screen.queryByText('Não foi possível carregar as categorias.')
    ).not.toBeInTheDocument();
  });
});
