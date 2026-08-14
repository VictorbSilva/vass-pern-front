import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProdutoDetalhe from './ProdutoDetalhe';

const PRODUTO = {
  id: 1,
  nome: 'Vassoura de Piaçava',
  descricao: 'Cabo longo, cerdas naturais.',
  preco: '30.00',
  imagem: null,
  categoria: 2,
};

const resposta = (corpo, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(corpo),
  });

function renderizar() {
  return render(
    <MemoryRouter initialEntries={['/produto/1']}>
      <Link to='/produto/2'>ir para o produto 2</Link>
      <Routes>
        <Route path='/produto/:id' element={<ProdutoDetalhe />} />
        <Route path='/produtos' element={<h2>Pagina do catalogo</h2>} />
        <Route path='/produtos/todos' element={<h2>Todos os produtos</h2>} />
        <Route
          path='/produtos/:categoriaId'
          element={<h2>Pagina da categoria</h2>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProdutoDetalhe', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => resposta(PRODUTO)));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deve exibir o produto quando a api responde', async () => {
    fetch.mockImplementation((url) =>
      String(url).includes('?categoria=') ? resposta([]) : resposta(PRODUTO)
    );

    renderizar();

    expect(await screen.findByText('Vassoura de Piaçava')).toBeInTheDocument();
  });

  // O produto ja traz a categoria dele, entao "Voltar" cai de onde o visitante
  // veio. Com o catalogo em duas etapas, mandar para /produtos devolveria o
  // visitante para a escolha de categoria — um passo atras do que ele fez.
  it('deve voltar para a categoria do produto', async () => {
    fetch.mockImplementation((url) =>
      String(url).includes('?categoria=') ? resposta([]) : resposta(PRODUTO)
    );

    renderizar();

    await screen.findByText('Vassoura de Piaçava');

    expect(screen.getByRole('link', { name: /voltar/i })).toHaveAttribute(
      'href',
      '/produtos/2'
    );
  });

  it('deve levar do erro para o catalogo inteiro', async () => {
    fetch.mockImplementation(() => resposta({ detail: 'nao encontrado' }, 404));

    renderizar();

    await screen.findByText(/não encontrado/i);

    expect(
      screen.getByRole('link', { name: /ver todos os produtos/i })
    ).toHaveAttribute('href', '/produtos/todos');
  });

  it('deve exibir nao encontrado quando a api responde 404', async () => {
    fetch.mockImplementation(() => resposta({ detail: 'nao encontrado' }, 404));

    renderizar();

    expect(await screen.findByText(/não encontrado/i)).toBeInTheDocument();
    expect(screen.queryByText(/carregando detalhes/i)).not.toBeInTheDocument();
  });

  it('deve exibir erro quando a rede falha', async () => {
    fetch.mockImplementation(() => Promise.reject(new TypeError('falhou')));

    renderizar();

    expect(
      await screen.findByRole('button', { name: /tentar novamente/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/carregando detalhes/i)).not.toBeInTheDocument();
  });

  it('deve refazer a busca ao clicar em tentar novamente', async () => {
    fetch.mockImplementation(() => Promise.reject(new TypeError('falhou')));

    renderizar();

    const botao = await screen.findByRole('button', {
      name: /tentar novamente/i,
    });

    fetch.mockImplementation((url) =>
      String(url).includes('?categoria=') ? resposta([]) : resposta(PRODUTO)
    );
    await userEvent.click(botao);

    expect(await screen.findByText('Vassoura de Piaçava')).toBeInTheDocument();
  });

  it('nao deve manter o erro ao trocar de produto', async () => {
    fetch.mockImplementation(() => resposta({ detail: 'nao encontrado' }, 404));

    renderizar();

    await screen.findByText(/não encontrado/i);

    fetch.mockImplementation((url) =>
      String(url).includes('?categoria=') ? resposta([]) : resposta(PRODUTO)
    );
    await userEvent.click(screen.getByText('ir para o produto 2'));

    expect(await screen.findByText('Vassoura de Piaçava')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/não encontrado/i)).not.toBeInTheDocument()
    );
  });
});
