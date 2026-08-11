import { useState, useEffect } from 'react';
import ProdutoCard from '../components/ProdutoCard.jsx';
import { API_BASE_URL, buscarJson } from '../services/api.js';

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [erroCategorias, setErroCategorias] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCategorias() {
      setErroCategorias(null);
      try {
        const data = await buscarJson(
          `${API_BASE_URL}/api/categorias/`,
          signal
        );
        if (!signal.aborted) setCategorias(data);
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (!signal.aborted) {
          setErroCategorias('Não foi possível carregar as categorias.');
          console.error('Erro ao processar categorias:', error);
        }
      }
    }
    void fetchCategorias();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProdutos() {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_BASE_URL}/api/produtos/`);
        if (idCategoria)
          url.searchParams.append('categoria', String(idCategoria));
        if (termoBusca) url.searchParams.append('search', termoBusca);

        const data = await buscarJson(url.toString(), signal);

        if (!signal.aborted) {
          setProdutos(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (!signal.aborted) {
          setError('Erro ao carregar produtos.');
          setIsLoading(false);
          console.error('Erro ao processar produtos:', err);
        }
      }
    }
    const timerId = setTimeout(() => {
      void fetchProdutos();
    }, 700);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [idCategoria, termoBusca]);

  return (
    <>
      <div className='col-span-1 lg:col-span-4 bg-linear-to-br from-blue-800 to-cyan-500 mb-4 pb-4 text-center'>
        <h1 className='text-5xl md:text-4xl font-black text-white drop-shadow-md'>
          Catálogo de <span className='text-yellow-400'>Produtos</span>
        </h1>
        <p className='text-lg md:text-xl text-white/90 mt-2 max-w-xl mx-auto leading-relaxed'>
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

          {erroCategorias && (
            <p className='px-4 py-3 text-sm text-red-500'>{erroCategorias}</p>
          )}

          {categorias.map((categoria) => (
            <button
              key={categoria.id}
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

        <main className='col-span-1 lg:col-span-3'>
          {isLoading && (
            <div className='text-center text-blue-500 my-10 font-bold'>
              Carregando produtos...
            </div>
          )}

          {!isLoading && error && (
            <div className='text-center text-red-500 my-10'>{error}</div>
          )}

          {!isLoading && !error && produtos.length === 0 && (
            <div className='text-center text-gray-500 mt-10 font-bold'>
              Nenhum produto encontrado.
            </div>
          )}

          {!isLoading && !error && produtos.length > 0 && (
            <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
              {produtos.map((produto) => (
                <li key={produto.id}>
                  <ProdutoCard produto={produto} />
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}

export default Catalogo;
