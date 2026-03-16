import { MapPin, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import BotaoWhatsapp from '../components/BotaoWhatsapp';

function Contatos() {
  return (
    <div className='ContatosWrapper max-w-full mx-auto space-y-8 pb-8'>
      <div className='ContactContainer w-full min-h-[45vh] bg-gradient-to-br from-blue-800 to-cyan-500 px-8 md:px-16 py-12 rounded-lg shadow-xl'>
        <span className='bg-white/10 text-white/90 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide border border-white/20'>
          ATENDIMENTO DIRETO
        </span>

        <h1 className='text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-md leading-tight'>
          Fale<span className='text-yellow-400'> Conosco</span>
        </h1>

        <p className='text-lg md:text-xl text-white/90 mt-2 max-w-2xl leading-relaxed'>
          Dúvidas sobre nossos produtos ou pedidos? Estamos prontos para atender
          você com a agilidade que precisa.
        </p>
      </div>

      <div className='CardsContainer grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-8'>
        <div className='InfoCard bg-white flex flex-col justify-center gap-8 p-8 rounded-3xl shadow-sm border border-gray-100'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0'>
              <MapPin className='w-6 h-6 text-primary text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-1'>
                Endereço
              </h3>
              <p className='text-gray-800 font-medium'>
                Av. Industrial, 1234 — Distrito Industrial,
                <br />
                Recife - PE
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0'>
              <Mail className='w-6 h-6 text-primary text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-1'>
                E-mail
              </h3>
              <p className='text-gray-800 font-medium'>
                contato@vassouraspernambucanas.com.br
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0'>
              <Clock className='w-6 h-6 text-primary text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-1'>
                Horário de Funcionamento
              </h3>
              <p className='text-gray-800 font-medium'>
                Segunda a Sexta: 08h às 18h
              </p>
            </div>
          </div>
        </div>

        <div className='WhatsAppCard bg-white flex flex-col justify-center p-8 rounded-3xl shadow-sm border border-gray-100'>
          <div className='w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6'>
            <MessageCircle className='w-7 h-7 text-green-600' />
          </div>

          <h2 className='text-3xl font-bold text-gray-900 mb-3'>
            Atendimento por WhatsApp
          </h2>
          <p className='text-gray-500 mb-8 leading-relaxed'>
            Clique no botão abaixo para ser redirecionado ao atendimento por
            WhatsApp. Respondemos em média em até 30 minutos.
          </p>

          <BotaoWhatsapp
            produto={null}
            className='self-start bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center gap-2'
          />
        </div>
      </div>

      <div className='px-2 md:px-8 pt-4 pb-8'>
        <div className='bg-gray-50 rounded-2xl py-4 px-6 text-center border border-gray-100'>
          <p className='text-sm text-gray-500 italic'>
            "Tradição em limpeza e qualidade em cada fibra desde 1985."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contatos;
