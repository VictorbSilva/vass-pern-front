import { useId } from 'react';

const CONTORNO_PERNAMBUCO =
  'M6,49 C4,33 10,23 22,20 L48,17 L70,23 L88,15 L112,20 L132,12 L150,20 ' +
  'L164,4 L180,15 L200,9 L216,20 L232,12 L244,25 L258,15 L276,20 L296,12 ' +
  'L318,17 L338,12 C352,15 360,25 360,41 L356,63 C354,76 344,84 332,81 ' +
  'L308,84 L286,76 L262,86 L240,81 L216,94 L194,89 L172,102 L150,97 ' +
  'L128,110 L106,105 L84,118 C66,126 46,121 32,105 C18,92 8,70 6,49 Z';

const RAIOS_DO_SOL =
  'M197,55 L189.7,57.1 L195,62.5 L187.7,60.7 L189.5,68 L184.1,62.7 L182,70 ' +
  'L179.9,62.7 L174.5,68 L176.3,60.7 L169,62.5 L174.3,57.1 L167,55 ' +
  'L174.3,52.9 L169,47.5 L176.3,49.3 L174.5,42 L179.9,47.3 L182,40 ' +
  'L184.1,47.3 L189.5,42 L187.7,49.3 L195,47.5 L189.7,52.9 Z';

const CRUZ =
  'M178,76 L186,76 L186,81 L197,81 L197,89 L186,89 L186,96 L178,96 ' +
  'L178,89 L167,89 L167,81 L178,81 Z';

const PILHA_DE_FONTES =
  "'Arial Narrow','Helvetica Neue',Helvetica,Arial,sans-serif";

const Logo = ({ reduzida = false, className = 'h-14 w-auto' }) => {
  const id = useId();
  const idTitulo = `${id}-titulo`;
  const idRecorte = `${id}-recorte`;

  return (
    <svg
      viewBox='0 0 400 240'
      role='img'
      aria-labelledby={idTitulo}
      className={className}
    >
      <title id={idTitulo}>Vassouras Pernambucanas</title>

      <rect width='400' height='240' rx='18' fill='#1D4ED8' />

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

      <g transform='translate(18, 56)'>
        {reduzida ? (
          <path d={CONTORNO_PERNAMBUCO} fill='#FFFFFF' />
        ) : (
          <>
            <defs>
              <clipPath id={idRecorte}>
                <path d={CONTORNO_PERNAMBUCO} />
              </clipPath>
            </defs>

            <g clipPath={`url(#${idRecorte})`}>
              <rect width='364' height='70' fill='#002776' />
              <rect y='70' width='364' height='60' fill='#FFFFFF' />

              <path
                d='M-14,58 Q182,-30 378,58'
                fill='none'
                stroke='#C8102E'
                strokeWidth='10'
              />
              <path
                d='M-14,68 Q182,-20 378,68'
                fill='none'
                stroke='#F5C400'
                strokeWidth='10'
              />
              <path
                d='M-14,78 Q182,-10 378,78'
                fill='none'
                stroke='#009639'
                strokeWidth='10'
              />

              <path d={RAIOS_DO_SOL} fill='#F5C400' />
              <circle cx='182' cy='55' r='9' fill='#F5C400' />

              <path d={CRUZ} fill='#C8102E' />
            </g>

            <path
              d={CONTORNO_PERNAMBUCO}
              fill='none'
              stroke='#FFFFFF'
              strokeWidth='3'
            />
          </>
        )}
      </g>

      <text
        x='200'
        y='228'
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
