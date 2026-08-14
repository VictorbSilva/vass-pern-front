import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const CategoriaCard = ({ categoria, prioritaria = false }) => (
  <Link
    to={`/produtos/${categoria.id}`}
    className='group block w-full h-full min-w-0'
  >
    <div className='w-full h-full flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-xl transition-shadow overflow-hidden'>
      <div className='w-full aspect-[4/3] bg-blue-600 flex items-center justify-center overflow-hidden'>
        {categoria.imagem ? (
          <img
            src={categoria.imagem}
            alt={categoria.nome}
            loading={prioritaria ? 'eager' : 'lazy'}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          // O icone e decorativo: o nome da categoria ja esta em texto logo
          // abaixo, e sem o aria-hidden ele entraria duas vezes no nome
          // acessivel do link.
          <Package
            size={56}
            strokeWidth={1.5}
            className='text-white/80'
            aria-hidden='true'
          />
        )}
      </div>

      <h2 className='p-4 text-base sm:text-lg font-bold text-gray-800 text-center'>
        {categoria.nome}
      </h2>
    </div>
  </Link>
);

export default CategoriaCard;
