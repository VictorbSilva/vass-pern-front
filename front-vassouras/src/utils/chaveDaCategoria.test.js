import { describe, expect, it } from 'vitest';
import { chaveDaCategoria } from './chaveDaCategoria.js';

describe('chaveDaCategoria', () => {
  it('nao deve depender de acento, caixa nem espaco', () => {
    expect(chaveDaCategoria('Acessórios')).toBe('acessorio');
    expect(chaveDaCategoria('ACESSÓRIOS')).toBe('acessorio');
    expect(chaveDaCategoria('  Vassouras  ')).toBe('vassoura');
  });

  it('deve tratar singular e plural como a mesma chave', () => {
    expect(chaveDaCategoria('Vassoura')).toBe(chaveDaCategoria('Vassouras'));
    expect(chaveDaCategoria('Rodo')).toBe(chaveDaCategoria('Rodos'));
    expect(chaveDaCategoria('Cabo')).toBe(chaveDaCategoria('Cabos'));
  });

  it('nao deve quebrar sem nome', () => {
    expect(chaveDaCategoria('')).toBe('');
    expect(chaveDaCategoria(null)).toBe('');
    expect(chaveDaCategoria(undefined)).toBe('');
  });
});
