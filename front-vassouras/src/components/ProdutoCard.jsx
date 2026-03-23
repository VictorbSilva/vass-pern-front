import { Link } from 'react-router-dom';

const ProdutoCard = ({ produto }) => {
  return (
    <Link to={`/produto/${produto.id}`} className='block w-full h-full min-w-0'>
      <div className='w-full h-full flex flex-col bg-white p-3 sm:p-4 border rounded-lg shadow-sm hover:shadow-xl transition-shadow'>
        <div className='w-full aspect-square bg-gray-100 mb-3 sm:mb-4 rounded-md flex items-center justify-center overflow-hidden'>
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <span className='text-xs text-gray-500'>Sem imagem</span>
          )}
        </div>

        <h2 className='text-sm sm:text-base font-semibold text-gray-800 flex-grow line-clamp-2'>
          {produto.nome}
        </h2>

        <p className='text-blue-600 font-bold mt-2 text-sm sm:text-base'>
          R$ {produto.preco}
        </p>
      </div>
    </Link>
  );
};

export default ProdutoCard;
