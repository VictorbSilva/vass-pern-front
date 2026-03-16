import { Link } from 'react-router-dom';

// const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const ProdutoCard = ({ produto }) => {
  return (
    <Link to={`/produto/${produto.id}`} className='produto-card'>
      <div className='bg-white p-4 border rounded-lg shadow-sm hover:shadow-xl/20 transition-shadow'>
        <div className='aspect-square bg-gray-100 mb-4 rounded-md flex items-center justify-center'>
          {produto.imagem ? (
            <img
              src={`${produto.imagem}`}
              alt={produto.nome}
              className='w-full h-full object-cover'
            />
          ) : (
            <span className='text-gray-500'>Imagem não disponível</span>
          )}
        </div>
        <h2 className='font-semibold text-gray-800'>{produto.nome}</h2>
        <p className='text-blue-600 font-bold mt-2'>R$ {produto.preco}</p>
      </div>
    </Link>
  );
};

export default ProdutoCard;
