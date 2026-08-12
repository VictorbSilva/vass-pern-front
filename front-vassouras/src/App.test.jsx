import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.history.pushState({}, '', '/');
  });

  it('deve montar a aplicacao sem erro', async () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('deve exibir a pagina de nao encontrada numa rota que nao existe', () => {
    window.history.pushState({}, '', '/rota-que-nao-existe');

    render(<App />);

    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('deve ter um unico h1 na home', async () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('deve ter um unico h1 na pagina de nao encontrada', () => {
    window.history.pushState({}, '', '/rota-que-nao-existe');

    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
