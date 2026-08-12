import { useId } from 'react';

const PILHA_DE_FONTES =
  "'Arial Narrow','Helvetica Neue',Helvetica,Arial,sans-serif";

// Contorno de Pernambuco, tracado a mao a partir de uma silhueta de referencia.
// E APROXIMADO de proposito: mapa exato e trabalho de designer, e o cliente foi
// avisado. Coordenadas proprias (0 0 1310 495) — a forma ocupa x 5..1300 e
// y 15..480.
const CONTORNO_PERNAMBUCO =
  'M110,15 L140,25 L160,18 L200,30 L220,22 L255,22 L280,35 L305,38 L330,55 ' +
  'L360,65 L375,80 L400,95 L430,110 L455,128 L470,138 L490,120 L510,85 ' +
  'L525,90 L535,125 L550,130 L565,110 L580,115 L590,135 L610,140 L630,138 ' +
  'L660,140 L690,125 L710,110 L740,80 L770,55 L790,50 L810,55 L825,70 ' +
  'L840,80 L845,110 L835,135 L815,150 L810,170 L830,185 L850,200 L865,210 ' +
  'L870,230 L885,240 L905,230 L920,210 L940,190 L960,175 L985,165 L1010,160 ' +
  'L1030,165 L1050,170 L1070,165 L1090,150 L1110,155 L1125,140 L1140,150 ' +
  'L1155,135 L1170,110 L1190,95 L1210,85 L1230,90 L1250,105 L1265,120 ' +
  'L1280,135 L1295,160 L1300,190 L1290,220 L1270,250 L1255,280 L1240,310 ' +
  'L1230,340 L1220,370 L1210,390 L1190,405 L1170,410 L1150,415 L1130,418 ' +
  'L1110,410 L1095,400 L1080,390 L1060,385 L1040,395 L1020,405 L1000,410 ' +
  'L980,450 L960,475 L940,480 L910,478 L885,475 L860,470 L835,460 L815,445 ' +
  'L800,425 L785,410 L770,400 L755,390 L740,380 L725,385 L710,390 L700,380 ' +
  'L690,365 L680,360 L665,365 L650,380 L635,400 L620,430 L605,450 L595,460 ' +
  'L585,450 L580,425 L575,400 L565,385 L555,380 L545,390 L540,370 L535,355 ' +
  'L525,350 L515,360 L510,375 L500,365 L495,345 L485,340 L470,345 L455,340 ' +
  'L440,330 L425,325 L410,315 L390,310 L365,305 L340,300 L315,300 L295,305 ' +
  'L275,315 L260,330 L245,355 L235,380 L225,395 L210,390 L195,380 L180,385 ' +
  'L165,400 L155,425 L145,450 L135,470 L125,478 L110,470 L95,455 L85,440 ' +
  'L80,420 L75,400 L65,385 L50,375 L38,365 L35,350 L45,335 L60,325 L70,310 ' +
  'L65,290 L55,275 L40,260 L20,245 L5,230 L15,210 L30,190 L50,170 L65,150 ' +
  'L80,130 L90,105 L95,80 L100,50 Z';

const SOL =
  'm 270,126 2.93684,9.19249 5.21596,-8.11915 0.45758,9.63937 7.13962,-6.49251 ' +
  '-2.05287,9.42935 8.57673,-4.42341 -4.42341,8.57673 9.42935,-2.05287 ' +
  '-6.49251,7.13962 9.63937,0.45758 -8.11915,5.21596 9.19249,2.93684 ' +
  '-9.19249,2.93684 8.11915,5.21596 -9.63937,0.45758 6.49251,7.13962 ' +
  '-9.42935,-2.05287 4.42341,8.57673 -8.57673,-4.42341 2.05287,9.42935 ' +
  '-7.13962,-6.49251 -0.45758,9.63937 -5.21596,-8.11915 L 270,189 ' +
  'l -2.93684,-9.19249 -5.21596,8.11915 -0.45758,-9.63937 -7.13962,6.49251 ' +
  '2.05287,-9.42935 -8.57673,4.42341 4.42341,-8.57673 -9.42935,2.05287 ' +
  '6.49251,-7.13962 -9.63937,-0.45758 8.11915,-5.21596 L 238.5,157.5 ' +
  'l 9.19249,-2.93684 -8.11915,-5.21596 9.63937,-0.45758 -6.49251,-7.13962 ' +
  '9.42935,2.05287 -4.42341,-8.57673 8.57673,4.42341 -2.05287,-9.42935 ' +
  '7.13962,6.49251 0.45758,-9.63937 5.21596,8.11915z';

const ESTRELA =
  'M270 18 l8.77283 27-22.96757-16.686918 h28.38948 l-22.96757 16.686917z';

// As faixas azul e branca sao retangulos que atravessam o mapa inteiro, mas o
// arco-iris, o sol, a estrela e a cruz ficam nas proporcoes NATIVAS da bandeira
// (540x360), so escalados e centralizados. Esticar tudo para a largura do mapa
// transformaria o sol em elipse e o arco-iris em oval — que e o erro obvio aqui.
const MioloDaBandeira = () => (
  <g transform='translate(342, 36.6) scale(1.15)'>
    <path
      d='M69 270 A 129 129 202.5 0 1 471,270'
      fill='none'
      strokeWidth='12'
      stroke='#C34342'
    />
    <path
      d='M81 270 A 117 117 202.5 0 1 459,270'
      fill='none'
      strokeWidth='12'
      stroke='#FFB511'
    />
    <path
      d='M93 270 A 105 105 202.5 0 1 447,270'
      fill='none'
      strokeWidth='12'
      stroke='#00AD4A'
    />
    <path
      d='M270 243v90m-27-58.5h54'
      strokeWidth='12'
      stroke='#C34342'
      fill='none'
    />
    <path fill='#FFB511' d={SOL} />
    <path fill='#FFB511' d={ESTRELA} />
  </g>
);

const Logo = ({ className = 'h-16 w-auto' }) => {
  const id = useId();
  const idTitulo = `${id}-titulo`;
  const idRecorte = `${id}-recorte`;

  return (
    <svg
      viewBox='0 0 400 250'
      role='img'
      aria-labelledby={idTitulo}
      className={className}
    >
      <title id={idTitulo}>Vassouras Pernambucanas</title>

      <rect width='400' height='250' rx='18' fill='#2563EB' />

      {/* textLength e load-bearing: e ele que faz as duas palavras terem a
          mesma largura, como na logo do cliente, independente da fonte que a
          maquina do visitante tiver. Sem ele a logo se desmonta em quem nao
          tem uma sans condensada instalada. */}
      <text
        x='200'
        y='58'
        textLength='364'
        lengthAdjust='spacingAndGlyphs'
        textAnchor='middle'
        fontFamily={PILHA_DE_FONTES}
        fontSize='60'
        fontWeight='700'
        fill='#FFFFFF'
      >
        VASSOURAS
      </text>

      <g transform='translate(28.7, 62.1) scale(0.2625)'>
        <defs>
          <clipPath id={idRecorte}>
            <path d={CONTORNO_PERNAMBUCO} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${idRecorte})`}>
          <rect x='-20' y='-20' width='1350' height='305' fill='#3155A4' />
          <rect x='-20' y='285' width='1350' height='230' fill='#FFFFFF' />
          <MioloDaBandeira />
        </g>

        <path
          d={CONTORNO_PERNAMBUCO}
          fill='none'
          stroke='#FFFFFF'
          strokeWidth='14'
        />
      </g>

      <text
        x='200'
        y='234'
        textLength='364'
        lengthAdjust='spacingAndGlyphs'
        textAnchor='middle'
        fontFamily={PILHA_DE_FONTES}
        fontSize='48'
        fontWeight='700'
        fill='#FFFFFF'
      >
        PERNAMBUCANAS
      </text>
    </svg>
  );
};

export default Logo;
