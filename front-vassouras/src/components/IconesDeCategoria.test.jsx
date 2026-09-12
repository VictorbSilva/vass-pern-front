import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Boxes, BrushCleaning, Cable, Package } from 'lucide-react';
import {
  IconeCabo,
  IconeDaCategoria,
  IconeEscova,
  IconeRodo,
  IconeVassoura,
} from './IconesDeCategoria.jsx';

const desenhoDe = (elemento) => render(elemento).container.innerHTML;

describe('IconeDaCategoria', () => {
  it('deve dar a cada categoria conhecida o icone dela', () => {
    expect(desenhoDe(<IconeDaCategoria nome='Escovas' />)).toBe(
      desenhoDe(<IconeEscova />)
    );
    expect(desenhoDe(<IconeDaCategoria nome='Vassouras' />)).toBe(
      desenhoDe(<IconeVassoura />)
    );
    expect(desenhoDe(<IconeDaCategoria nome='Rodos' />)).toBe(
      desenhoDe(<IconeRodo />)
    );
    expect(desenhoDe(<IconeDaCategoria nome='Cabos' />)).toBe(
      desenhoDe(<IconeCabo />)
    );
    expect(desenhoDe(<IconeDaCategoria nome='Acessórios' />)).toBe(
      desenhoDe(<Boxes />)
    );
  });

  it('deve cair no icone generico numa categoria que ninguem mapeou', () => {
    expect(desenhoDe(<IconeDaCategoria nome='Panos de Chao' />)).toBe(
      desenhoDe(<Package />)
    );
  });

  // Cabo aqui e cabo de vassoura. O `Cable` do lucide desenha um cabo ELETRICO,
  // com corpo de plugue e dois pinos — o erro obvio deste mapa, e o tipo de
  // coisa que volta na primeira "melhoria" de quem so olhou o nome.
  it('nao deve usar o cabo eletrico do lucide em Cabos', () => {
    expect(desenhoDe(<IconeDaCategoria nome='Cabos' />)).not.toBe(
      desenhoDe(<Cable />)
    );
  });

  // O lucide TEM uma escova (`BrushCleaning`), e ela foi trocada de proposito:
  // o cliente mandou uma referencia com outro desenho — alca curva, corpo solido
  // e cerdas retas. Sem este teste, alguem "simplifica" de volta para a do
  // pacote sem saber que estaria desfazendo um pedido.
  it('nao deve usar a escova do lucide em Escovas', () => {
    expect(desenhoDe(<IconeDaCategoria nome='Escovas' />)).not.toBe(
      desenhoDe(<BrushCleaning />)
    );
  });

  // Os desenhados precisam sair do mesmo molde que os do lucide, senao o grid
  // mistura dois conjuntos visiveis a olho nu.
  it('deve desenhar os icones proprios na gramatica do lucide', () => {
    for (const Icone of [IconeEscova, IconeVassoura, IconeRodo, IconeCabo]) {
      const svg = render(<Icone />).container.querySelector('svg');

      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('stroke', 'currentColor');
      expect(svg).toHaveAttribute('stroke-width', '2');
      expect(svg).toHaveAttribute('stroke-linecap', 'round');
      expect(svg).toHaveAttribute('fill', 'none');
    }
  });

  it('deve repassar tamanho e classe para o svg', () => {
    const svg = render(
      <IconeDaCategoria nome='Vassouras' size={64} className='text-white' />
    ).container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveClass('text-white');
  });
});
