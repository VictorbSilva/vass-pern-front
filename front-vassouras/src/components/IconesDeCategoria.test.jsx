import { describe, expect, it } from 'vitest';
import { BrushCleaning, Boxes, Package } from 'lucide-react';
import {
  IconeCabo,
  IconeRodo,
  IconeVassoura,
  iconeDaCategoria,
} from './IconesDeCategoria.jsx';

describe('iconeDaCategoria', () => {
  it('deve dar a cada categoria conhecida o icone dela', () => {
    expect(iconeDaCategoria('Escovas')).toBe(BrushCleaning);
    expect(iconeDaCategoria('Vassouras')).toBe(IconeVassoura);
    expect(iconeDaCategoria('Rodos')).toBe(IconeRodo);
    expect(iconeDaCategoria('Cabos')).toBe(IconeCabo);
    expect(iconeDaCategoria('Acessórios')).toBe(Boxes);
  });

  // O cliente digita o nome da categoria no Admin, sem passar por deploy. Nao da
  // para exigir que ele acerte acento, caixa e plural — a chave e normalizada.
  it('nao deve depender de acento, caixa nem espaco', () => {
    expect(iconeDaCategoria('acessorios')).toBe(Boxes);
    expect(iconeDaCategoria('ACESSÓRIOS')).toBe(Boxes);
    expect(iconeDaCategoria('  Vassouras  ')).toBe(IconeVassoura);
  });

  it('deve tratar singular e plural como a mesma categoria', () => {
    expect(iconeDaCategoria('Vassoura')).toBe(IconeVassoura);
    expect(iconeDaCategoria('Rodo')).toBe(IconeRodo);
    expect(iconeDaCategoria('Cabo')).toBe(IconeCabo);
  });

  it('deve cair no icone generico numa categoria que ninguem mapeou', () => {
    expect(iconeDaCategoria('Panos de Chao')).toBe(Package);
    expect(iconeDaCategoria('')).toBe(Package);
  });

  // Cabo aqui e cabo de vassoura. O `Cable` do lucide desenha um cabo ELETRICO,
  // com corpo de plugue e dois pinos — o erro obvio deste mapa.
  it('nao deve usar o cabo eletrico do lucide em Cabos', async () => {
    const { Cable } = await import('lucide-react');

    expect(iconeDaCategoria('Cabos')).not.toBe(Cable);
  });
});
