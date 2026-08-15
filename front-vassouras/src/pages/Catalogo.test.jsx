import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Catalogo from './Catalogo';

const CATEGORIA = { id: 3, nome: 'Vassouras', descricao: '', imagem: null };

const PRODUTOS = [
  { id: 4, nome: 'Vassoura Nylon', preco: '20.00', imagem: null, categoria: 3 },
];

const resposta = (corpo, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(corpo),
  });

const urlsChamadas = () => fetch.mock.calls.map(([url]) => String(url));

function renderizar(rota = '/produtos/3') {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path='/produtos/todos' element={<Catalogo />} />
        <Route path='/produtos/:categoriaId' element={<Catalogo />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Catalogo', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url) =>
        String(url).includes('/api/categorias/')
          ? resposta(CATEGORIA)
          : resposta(PRODUTOS)
      )
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('deve buscar apenas os produtos da categoria da rota', async () => {
    renderizar('/produtos/3');

    expect(await screen.findByText('Vassoura Nylon')).toBeInTheDocument();
    expect(
      urlsChamadas().some((url) => url.includes('/api/produtos/?categoria=3'))
    ).toBe(true);
  });

  it('deve exibir o nome da categoria no titulo da pagina', async () => {
    renderizar('/produtos/3');

    expect(
      await screen.findByRole('heading', { level: 1, name: /vassouras/i })
    ).toBeInTheDocument();
  });

  // Categoria inexistente e categoria vazia sao coisas diferentes, e a tela
  // precisa dizer qual das duas e. A API devolve 404 em /api/categorias/999/,
  // mas 200 com o catalogo inteiro em /api/produtos/?categoria=999 — so o
  // primeiro serve para decidir.
  it('deve separar categoria inexistente de categoria sem produto', async () => {
    fetch.mockImplementation((url) =>
      String(url).includes('/api/categorias/')
        ? resposta({ detail: 'nao encontrado' }, 404)
        : resposta(PRODUTOS)
    );

    renderizar('/produtos/999');

    expect(
      await screen.findByText(/categoria não encontrada/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Nenhum produto encontrado.')
    ).not.toBeInTheDocument();
  });

  it('deve buscar o catalogo inteiro na rota de todos os produtos', async () => {
    renderizar('/produtos/todos');

    expect(await screen.findByText('Vassoura Nylon')).toBeInTheDocument();

    const urls = urlsChamadas();
    expect(urls.some((url) => url.includes('/api/categorias/'))).toBe(false);
    expect(urls.some((url) => url.includes('categoria='))).toBe(false);
  });

  // 🔴 Os dois testes abaixo sao o motivo do CP5 separar o debounce. Antes um
  // unico timer de 700ms cobria categoria E texto, entao trocar de categoria
  // custava 700ms a toa. Sem o segundo teste a separacao nao esta provada.
  it('nao deve buscar antes da pausa na digitacao', async () => {
    vi.useFakeTimers();

    renderizar('/produtos/3');
    fetch.mockClear();

    fireEvent.change(screen.getByPlaceholderText(/buscar/i), {
      target: { value: 'nylon' },
    });

    expect(fetch).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(700));

    expect(urlsChamadas().some((url) => url.includes('search=nylon'))).toBe(
      true
    );
  });

  it('deve buscar os produtos da categoria sem esperar o debounce', () => {
    vi.useFakeTimers();

    renderizar('/produtos/3');

    expect(
      urlsChamadas().some((url) => url.includes('/api/produtos/?categoria=3'))
    ).toBe(true);
  });

  // O catalogo mostrava "R$ 20.00" enquanto a PDP mostrava "R$ 20,00" para o mesmo produto.
  it('deve formatar o preco do card em pt-BR', async () => {
    renderizar('/produtos/3');

    expect(await screen.findByText('R$ 20,00')).toBeInTheDocument();
  });

  it('deve avisar quando a busca de produtos falha', async () => {
    fetch.mockImplementation((url) =>
      String(url).includes('/api/categorias/')
        ? resposta(CATEGORIA)
        : resposta(null, 500)
    );

    renderizar('/produtos/3');

    expect(
      await screen.findByText('Erro ao carregar produtos.')
    ).toBeInTheDocument();
  });

  it('deve avisar quando a categoria nao tem produto', async () => {
    fetch.mockImplementation((url) =>
      String(url).includes('/api/categorias/')
        ? resposta(CATEGORIA)
        : resposta([])
    );

    renderizar('/produtos/3');

    expect(
      await screen.findByText('Nenhum produto encontrado.')
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/categoria não encontrada/i)).not.toBeInTheDocument()
    );
  });
});
