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
      <div className='col-span-1 lg:col-span-4 bg-gradient-to-br from-blue-800 to-cyan-500 mb-4 pb-4 text-center'>
        <h1 className='text-5xl md:text-4xl font-black text-white drop-shadow-md'>
          Catálogo de <span className='text-yellow-400'>Produtos</span>
        </h1>
        <p className='text-lg md:text-xl text-white/90 mt-2 max-w-1xl mx-auto leading-relaxed'>
          Encontre as melhores opções para o seu negócio.
        </p>
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
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors border-l-4 cursor-pointer ${
              idCategoria === null
                ? 'bg-blue-50 text-blue-700 border-blue-600 font-bold'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>

          {categorias.map((categoria) => (
            <button
              onClick={() => setIdCategoria(categoria.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors border-l-4 cursor-pointer ${
                idCategoria === categoria.id
                  ? 'bg-blue-50 text-blue-700 border-blue-600 font-bold'
                  : 'border-transparent text-gray-600 hover:bg-gray-100'
              }`}
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
          <div className='text-center text-gray-500 mt-10 font-bold'>
            Nenhum produto encontrado.
          </div>
        ) : (
          <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:col-span-3 gap-3 sm:gap-6'>
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Catalogo;
