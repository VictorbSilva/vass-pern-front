import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='HomeContainer flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-800 to-cyan-500 px-6 py-12 text-center'>
      <span className='text-white/80 tracking-[0.15em] text-sm md:text-base font-bold mb-4 uppercase'>
        Qualidade & Confiança
      </span>

      <h1 className='text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-md leading-tight'>
        Limpeza que <br />
        <span className='text-yellow-400'>Transforma</span>
      </h1>

      <p className='text-white/95 max-w-3xl text-lg md:text-xl mb-12 leading-relaxed drop-shadow-sm'>
        Há mais de 25 anos oferecendo os melhores produtos de limpeza para sua
        casa, empresa e indústria. Qualidade profissional ao seu alcance.
      </p>

      <div className='flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center'>
        <Link
          to='/produtos'
          className='flex-1 bg-white text-blue-800 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-transform hover:scale-105'
        >
          Nossos Produtos
        </Link>

        <Link
          to='/contato'
          className='flex-1 bg-white/20 backdrop-blur-sm border border-white/50 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-white/30 transition-transform hover:scale-105'
        >
          Fale Conosco
        </Link>
      </div>
    </div>
  );
}

export default Home;
