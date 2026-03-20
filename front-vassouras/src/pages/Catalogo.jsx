import { useState, useEffect } from 'react';
import ProdutoCard from '../components/ProdutoCard.jsx';

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

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
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProdutos() {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(`${baseUrl}/produtos/`);
        if (idCategoria) url.searchParams.append('categoria', idCategoria);
        if (termoBusca) url.searchParams.append('search', termoBusca);

        const response = await fetch(url.toString(), { signal });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        console.log('Buscando produtos com URL:', url);

        const data = await response.json();

        if (!signal.aborted) {
          setProdutos(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name == 'AbortError') {
          console.log('Requisição abortada');
          return;
        }
        if (!signal.aborted) {
          setError('Erro ao carregar produtos.');
          setIsLoading(false);
          console.error('Erro ao processar produtos:', err);
        }
      }
    }
    const timerId = setTimeout(() => {
      fetchProdutos();
    }, 700);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [idCategoria, baseUrl, termoBusca]);

  return (
    <>
      <div className='CatalogoHero flex flex-col md:flex-row items-center justify-between w-full min-h-[25vh] bg-gradient-to-br from-blue-800 to-cyan-500 px-8 md:px-16 py-12 rounded-[35px] shadow-xl '>
        <div className='text-center md:text-left'>
          <h2 className='text-2xl md:text-5xl font-black text-white mb-6 drop-shadow-md leading-tight'>
            Nossos <span className='text-yellow-400'>Produtos</span>
          </h2>
        </div>
      </div>
      <div className='CatalogoContainer p-4 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <aside className='col-span-1 flex flex-col mb-8 overflow-x-auto pb-2 px-4   '>
          <div className='InputContainer pb-6 border-b border-gray-200'>
            <input
              type='text'
              placeholder='Buscar produtos...'
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className='mt-1 w-full bg-white text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors'
            />
          </div>
          <button
            onClick={() => setIdCategoria(null)}
            className={`w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ${
              idCategoria === null
                ? 'w-full text-left px-4 py-3 rounded-lg font-bold bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                : 'w-full text-left px-4 py-3 rounded-lg font-bold border-l-4 bg-gray-200 text-gray-700'
            } cursor-pointer hover:bg-blue-400 transition-colors shrink-0`}
          >
            Todos
          </button>

          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setIdCategoria(categoria.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ${
                idCategoria === categoria.id
                  ? 'w-full text-left px-4 py-3 rounded-lg font-bold bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'w-full text-left px-4 py-3 rounded-lg font-bold border-l-4 bg-gray-200 text-gray-700'
              } cursor-pointer hover:bg-blue-400 transition-colors shrink-0`}
            >
              {categoria.nome}
            </button>
          ))}
        </aside>

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
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:col-span-3 gap-6'>
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={produto}
                baseUrl={baseUrl}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Catalogo;
