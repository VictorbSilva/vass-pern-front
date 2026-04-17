import { Link } from 'react-router-dom';
import ProdutoCard from './ProdutoCard.jsx';

const ProdutosRow = ({ titulo, produtos }) => {
  return (
    <section className='py-10'>
      <div className='px-6 flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-yellow-500'>{titulo}</h2>

        <Link
          to='/produtos'
          className='bg-yellow-400 text-blue-900 font-bold text-sm py-2 px-5 rounded-xl shadow hover:bg-yellow-300 transition-transform hover:scale-105'
        >
          Ver todos →
        </Link>
      </div>

      <ul className='flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-6'>
        {produtos.map((produto) => (
          <li key={produto.id} className='shrink-0 w-[260px] snap-center'>
            <ProdutoCard produto={produto} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProdutosRow;
