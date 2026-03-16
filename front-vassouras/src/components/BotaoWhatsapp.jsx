import gerarLinkWhatsapp from '../utils/GeraLinkWhatsapp';
import { MessageCircle, ArrowRight } from 'lucide-react';

const BotaoWhatsapp = ({ produto }) => {
  return (
    <a
      href={gerarLinkWhatsapp(produto)}
      target='_blank'
      rel='noopener noreferrer'
      className='group w-full flex items-center justify-center lg:justify-between p-6 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-2xl transition-all shadow-md hover:shadow-lg'
    >
      <div className='flex items-center gap-4'>
        <MessageCircle className='w-8 h-8 fill-current' />
        <span className={'text-xl lg:text-2xl font-bold tracking-tight'}>
          {produto ? 'Tenho Interesse' : 'Entre em Contato pelo WhatsApp'}
        </span>
      </div>
      <ArrowRight className='hidden lg:block w-8 h-8 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all' />
    </a>
  );
};

export default BotaoWhatsapp;
