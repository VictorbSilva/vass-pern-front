import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

const renderizarFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe('Footer', () => {
  it('deve renderizar sem erro', () => {
    renderizarFooter();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('deve manter os links de navegacao publicos', () => {
    renderizarFooter();

    ['Início', 'Produtos', 'Sobre', 'Contatos'].forEach((nome) => {
      expect(screen.getByRole('link', { name: nome })).toBeInTheDocument();
    });
  });

  it('nao deve conter link para o admin', () => {
    renderizarFooter();

    expect(screen.queryByText('Acesso Restrito')).not.toBeInTheDocument();
  });
});
