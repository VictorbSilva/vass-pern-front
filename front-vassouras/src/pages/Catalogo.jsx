import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProdutoCard from '../components/ProdutoCard.jsx';

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch(`${baseUrl}/categorias/`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao processar categorias:', error);
      }
    }
    fetchCategorias();
  }, [baseUrl]);

  useEffect(() => {
    async function fetchProdutos() {
      setIsLoading(true);
      setError(null);
      try {
        let url = `${baseUrl}/produtos/`;

        if (idCategoria) {
          url += `?categoria=${idCategoria}`;
        }

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        console.log('Buscando produtos com URL:', url);

        const data = await response.json();
        setProdutos(data);
      } catch (err) {
        setError(
          'Erro ao carregar produtos. Por favor, tente novamente mais tarde.'
        );
        console.error('Erro ao processar produtos:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProdutos();
  }, [idCategoria, baseUrl]);

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
            {categoria.nome}
          </button>
        ))}
      </ul>

      {isLoading && (
        <div className='text-center text-blue-500 my-10 font-bold'>
          Carregando produtos...
        </div>
      )}
      {error && <div className='text-center text-red-500 my-10'>{error}</div>}

      {produtos.length === 0 ? (
        <div className='text-center text-gray-500 mt-10'>
          Nenhum produto encontrado.
        </div>
      ) : (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} baseUrl={baseUrl} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Catalogo;
