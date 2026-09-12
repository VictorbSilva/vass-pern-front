import { Boxes, Package } from 'lucide-react';
import { chaveDaCategoria } from '../utils/chaveDaCategoria.js';

// Quatro dos icones sao desenhados a mao, por dois motivos diferentes.
//
// Vassoura, rodo e cabo NAO existem no lucide (varri os 1951 icones da 0.577.0:
// zero para broom, mop, sweep, squeegee, wiper e handle). E `Cable` nao serve
// para Cabos — o desenho dele e um cabo ELETRICO, com corpo de plugue e dois
// pinos.
//
// A escova existe (`BrushCleaning`), mas o cliente mandou uma referencia com
// outro desenho: alca curva, corpo solido e cerdas retas. Trocada de proposito.
//
// Estes nove atributos sao a gramatica do lucide, e e por isso que vivem num
// componente base: os desenhados aparecem lado a lado com Boxes e Package no
// mesmo grid, e qualquer divergencia de stroke, cap ou viewBox salta aos olhos
// como "esse aqui e de outro conjunto".
const IconeBase = ({ size = 24, strokeWidth = 2, children, ...resto }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...resto}
  >
    {children}
  </svg>
);

export const IconeEscova = (props) => (
  <IconeBase {...props}>
    <path d='M6 10V8a3 3 0 0 1 3-3h11' />
    <path d='M2 10h20v4H2z' />
    <path d='M5 14v5M8.5 14v5M12 14v5M15.5 14v5M19 14v5' />
  </IconeBase>
);

export const IconeVassoura = (props) => (
  <IconeBase {...props}>
    <path d='M20.5 3.5 12 12' />
    <path d='M10.2 10.2 13.8 13.8 9.2 21.2 2.8 14.8Z' />
    <path d='M8.8 11.6 12.4 15.2' />
  </IconeBase>
);

// A borracha e a parte MAIS larga de proposito. Na primeira versao ela era mais
// estreita que o suporte, e haste + barra larga + barra estreita e exatamente o
// simbolo de aterramento eletrico — era o que o icone parecia.
export const IconeRodo = (props) => (
  <IconeBase {...props}>
    <path d='M12 2v8' />
    <path d='M6 10h12v4H6z' />
    <path d='M3 14h18v3H3z' />
  </IconeBase>
);

// Dois cabos, e nao um: um cabo sozinho na diagonal com detalhe numa das pontas
// vira lapis, que foi o que aconteceu na primeira versao. O par tambem casa com
// o nome da categoria, que e plural.
export const IconeCabo = (props) => (
  <IconeBase {...props}>
    <path d='M18.7 2.5 10.7 20.5' />
    <path d='M13.3 3.5 5.3 21.5' />
  </IconeBase>
);

// O switch parece mais verboso que um mapa nome -> componente, e e de proposito.
// Com o mapa, o componente sai de uma variavel montada durante o render e o
// react-hooks/static-components reprova — a regra existe porque componente
// derivado no render remonta e perde estado. Aqui cada ramo devolve JSX estatico.
export const IconeDaCategoria = ({ nome, ...props }) => {
  switch (chaveDaCategoria(nome)) {
    case 'escova':
      return <IconeEscova {...props} />;
    case 'vassoura':
      return <IconeVassoura {...props} />;
    case 'rodo':
      return <IconeRodo {...props} />;
    case 'cabo':
      return <IconeCabo {...props} />;
    case 'acessorio':
      return <Boxes {...props} />;
    default:
      return <Package {...props} />;
  }
};
