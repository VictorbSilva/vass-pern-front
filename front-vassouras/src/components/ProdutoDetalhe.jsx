import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`${baseUrl}/produto/${id}`);
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    }
    fetchProduto();
  }, [id, baseUrl]);

  if (!produto) {
    return <div className='p-10 text-center'>Carregando detalhes...</div>;
  }

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className='ProdutoContainer bg-gray-100 rounded-lg max-w-6xl mx-auto p-6'>
      <Link to='/produtos' className='inline-block mb-6'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Voltar
        </button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        <div className='w-full'>
          <img
            src={`${baseUrl}${produto.imagemProduto}`}
            alt={produto.nomeProduto}
            className='w-full h-auto rounded-xl shadow-lg object-cover'
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400?text=Sem+Imagem';
            }}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {produto.nomeProduto}
          </h1>

          <div className='border-t border-b py-4 my-2'>
            <h3 className='text-sm uppercase tracking-wider text-gray-700 font-bold mb-2'>
              Descrição
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              {produto.descricaoProduto ||
                'Este produto não possui descrição disponível.'}
            </p>
          </div>
          <p className='mt-4 text-3xl font-semibold text-blue-600'>
            {formatarPreco(produto.preco)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProdutoDetalhe;
