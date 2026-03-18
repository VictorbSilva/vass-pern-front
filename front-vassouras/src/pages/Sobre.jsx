function Sobre() {
  return (
    <>
      <div className='HistoryContainer flex flex-col md:flex-row items-center justify-between w-full min-h-[45vh] bg-gradient-to-br from-blue-800 to-cyan-500 px-8 md:px-16 py-12 rounded-[35px] shadow-xl'>
        <div className='flex flex-col md:w-1/2 text-center md:text-left'>
          <h1 className='text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-md leading-tight'>
            Nossa <span className='text-yellow-400'>História</span>
          </h1>
          <p className='text-xl md:text-2xl font-bold text-white mb-6 drop-shadow-md leading-tight'>
            Vassouras Pernambucanas é uma empresa especializada na fabricação de
            vassouras de alta qualidade.{' '}
            {/*<br className='hidden md:block' /> */}
            Com mais de 20 anos de experiência no mercado, nos dedicamos a
            oferecer produtos duráveis e eficientes para atender às necessidades
            dos nossos clientes.
          </p>
        </div>

        <div className='hidden md:flex md:w-1/2 justify-center items-center'>
          <div className='w-full h-64 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center italic text-white/50'>
            [Espaço para Imagem]
          </div>
        </div>
      </div>

      <div className='CardsContainer grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
        <div className='relative bg-color-neutral-300 rounded-[35px] pt-[40px] px-[30px] pb-[30px] text-center text-white flex flex-col items-center gap-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105'>
          <h2 className='text-3xl font-bold text-yellow-400'>Missão</h2>
          <p className='text-zinc-950 leading-relaxed'>
            Nossa missão é fornecer vassouras de alta qualidade que atendam às
            necessidades de limpeza dos nossos clientes, promovendo a
            sustentabilidade e o bem-estar.
          </p>
        </div>

        <div className='relative bg-color-neutral-300   rounded-[35px] pt-[40px] px-[30px] pb-[70px] text-center text-white flex flex-col items-center gap-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105'>
          <h2 className='text-3xl font-bold text-yellow-400'>Visão</h2>
          <p className='text-zinc-950 leading-relaxed'>
            Ser reconhecida como a principal fabricante de vassouras no mercado,
            destacando-se pela qualidade, inovação e compromisso com a
            satisfação do cliente.
          </p>
        </div>

        <div className='relative bg-color-neutral-300 rounded-[35px] pt-[40px] px-[30px] pb-[30px] text-center text-white flex flex-col items-center gap-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105'>
          <h2 className='text-3xl font-bold text-yellow-400'>Valores</h2>
          <ul className='text-left text-zinc-950 space-y-2'>
            <li>
              <span className='font-bold text-yellow-400'>•</span> Qualidade:
              Excelência em produtos.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>•</span> Inovação:
              Melhoria constante.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>•</span>{' '}
              Sustentabilidade: Respeito ambiental.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>•</span> Compromisso:
              Atendimento dedicado.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sobre;
