import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    async function fetchProdutos() {
      try {
        let url = `${baseUrl}/`;

        if (idCategoria) {
          url += `?categoriaId=${idCategoria}`;
        }

        console.log('Buscando produtos com URL:', url);

        const response = await fetch(url);
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao processar produtos:', error);
      }
    }
    fetchProdutos();
  }, [idCategoria, baseUrl]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch(`${baseUrl}/categoria/`);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao processar categorias:', error);
      }
    }
    fetchCategorias();
  }, [baseUrl]);

  return (
    <div className='CatalogoContainer p-4 bg-gradient-to-br from-white-200 to-gray-200 '>
      <h1 className='text-2xl font-bold text-yellow-400 mb-6'>Produtos</h1>

      <ul className='flex gap-2 mb-8 overflow-x-auto pb-2 px-4 border-b rounded-lg  bg-gray-100'>
        <button
          onClick={() => setIdCategoria(null)}
          className={`px-4 py-2 rounded-full border ${
            idCategoria === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } cursor-pointer hover:bg-blue-400 transition-colors shrink-0`}
        >
          Todos
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setIdCategoria(categoria.id)}
            className={`px-4 py-2 rounded-full border ${
              idCategoria === categoria.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } cursor-pointer hover:bg-blue-400 transition-colors shrink-0`}
          >
            {categoria.nomeCategoria}
          </button>
        ))}
      </ul>

      {produtos.length === 0 ? (
        <div className='text-center text-gray-500 mt-10'>
          Nenhum produto encontrado.
        </div>
      ) : (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {produtos.map((produto) => (
            <Link key={produto.id} to={`/produto/${produto.id}`}>
              <li className='bg-white p-4 border rounded-lg shadow-sm hover:shadow-xl/20 transition-shadow'>
                <div className='aspect-square bg-gray-100 mb-4 rounded-md flex items-center justify-center'>
                  {produto.imagemProduto ? (
                    <img
                      src={`${baseUrl}${produto.imagemProduto}`}
                      alt={produto.nomeProduto}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <span className='text-gray-500'>Imagem não disponível</span>
                  )}
                </div>
                <h2 className='font-semibold text-gray-800'>
                  {produto.nomeProduto}
                </h2>
                <p className='text-blue-600 font-bold mt-2'>
                  R$ {produto.preco}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Catalogo;
