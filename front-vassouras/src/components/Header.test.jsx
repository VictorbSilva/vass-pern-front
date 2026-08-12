import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header';

const renderizarHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

describe('Header', () => {
  it('deve renderizar sem erro', () => {
    renderizarHeader();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('deve exibir a logo com nome acessivel', () => {
    renderizarHeader();

    expect(
      screen.getByRole('img', { name: /vassouras pernambucanas/i })
    ).toBeInTheDocument();
  });

  it('deve levar a logo para a home', () => {
    renderizarHeader();

    const link = screen.getByRole('link', { name: /vassouras pernambucanas/i });

    expect(link).toHaveAttribute('href', '/');
  });

  it('nao deve conter h1, que pertence a pagina', () => {
    renderizarHeader();

    expect(screen.queryAllByRole('heading', { level: 1 })).toHaveLength(0);
  });
});
