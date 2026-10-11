import { Link } from 'react-router-dom';
import { IconeDaCategoria } from './IconesDeCategoria.jsx';

const CategoriaCard = ({ categoria }) => (
  <Link
    to={`/produtos/${categoria.id}`}
    className='group block w-full h-full min-w-0'
  >
    <div className='w-full h-full flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-xl transition-shadow overflow-hidden'>
      <div className='w-full aspect-[4/3] bg-blue-600 flex items-center justify-center overflow-hidden'>
        {/* O icone e decorativo: o nome da categoria ja esta em texto logo
            abaixo, e sem o aria-hidden ele entraria duas vezes no nome
            acessivel do link. */}
        <IconeDaCategoria
          nome={categoria.nome}
          size={48}
          strokeWidth={1.5}
          className='text-white/90 group-hover:scale-110 transition-transform duration-300'
          aria-hidden='true'
        />
      </div>

      {/* O line-clamp fica no span, e nao no h2: no mesmo elemento do padding,
          a terceira linha aparece cortada dentro do padding de baixo. */}
      <h2 className='p-3 text-sm sm:text-base font-bold text-gray-800 text-center'>
        <span className='line-clamp-2'>{categoria.nome}</span>
      </h2>
    </div>
  </Link>
);

export default CategoriaCard;
