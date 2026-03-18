import GeraLinkWhatsapp from './GeraLinkWhatsapp';
import { it, expect, describe } from 'vitest';

describe('GeraLinkWhatsapp', () => {
  it('deve gerar o link com o nome do produto caso o produto exista', () => {
    const produto = { nome: 'Vassoura de Pelo' };

    const link = GeraLinkWhatsapp(produto);
    expect(link).toContain('https://wa.me/5583996465052');
    expect(link).toContain('Vassoura%20de%20Pelo');
  });
  it('deve gerar o link com a mensagem genérica caso o produto seja nulo', () => {
    const produto = null;
    const link = GeraLinkWhatsapp(produto);
    expect(link).toContain('https://wa.me/5583996465052');
    expect(link).toContain(
      'sobre%20os%20produtos%20da%20Vassouras%20Pernambucanas'
    );
  });
});
