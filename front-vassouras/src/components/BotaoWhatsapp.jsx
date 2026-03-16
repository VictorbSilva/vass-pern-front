import gerarLinkWhatsapp from '../utils/GeraLinkWhatsapp';

const BotaoWhatsapp = ({ produto }) => {
  return (
    <a
      href={gerarLinkWhatsapp(produto)}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors'
    >
      Fale Conosco!
    </a>
  );
};

export default BotaoWhatsapp;
