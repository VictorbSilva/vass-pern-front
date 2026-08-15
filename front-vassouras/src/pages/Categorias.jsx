import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriaCard from '../components/CategoriaCard.jsx';
import { API_BASE_URL, buscarJson } from '../services/api.js';

// Estes cards sao a primeira dobra de /produtos, que e justamente a pagina onde
// o passo 8 da secao 7 manda rerodar o Lighthouse. Dar lazy na candidata a LCP
// piora exatamente a nota que se quer proteger, entao os de cima ficam eager.
const CARDS_ACIMA_DA_DOBRA = 4;

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCategorias() {
      try {
        const data = await buscarJson(
          `${API_BASE_URL}/api/categorias/`,
          signal
        );
        if (!signal.aborted) {
          setCategorias(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (!signal.aborted) {
          setError('Não foi possível carregar as categorias.');
          setIsLoading(false);
          console.error('Erro ao processar categorias:', error);
        }
      }
    }
    void fetchCategorias();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className='bg-linear-to-br from-blue-800 to-cyan-500 mb-4 pb-4 text-center'>
        <h1 className='text-5xl md:text-4xl font-black text-white drop-shadow-md'>
          Nossas <span className='text-yellow-400'>Categorias</span>
        </h1>
        <p className='text-lg md:text-xl text-white/90 mt-2 max-w-xl mx-auto leading-relaxed'>
          Escolha uma categoria para ver os produtos.
        </p>
      </div>

      <div className='CategoriasContainer p-4 max-w-6xl mx-auto'>
        {isLoading && (
          <div className='text-center text-blue-500 my-10 font-bold'>
            Carregando categorias...
          </div>
        )}

        {!isLoading && error && (
          <div className='text-center text-red-500 my-10'>{error}</div>
        )}

        {!isLoading && !error && categorias.length === 0 && (
          <div className='text-center text-gray-500 my-10 font-bold'>
            Nenhuma categoria cadastrada.
          </div>
        )}

        {!isLoading && !error && categorias.length > 0 && (
          <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
            {categorias.map((categoria, indice) => (
              <li key={categoria.id}>
                <CategoriaCard
                  categoria={categoria}
                  prioritaria={indice < CARDS_ACIMA_DA_DOBRA}
                />
              </li>
            ))}
          </ul>
        )}

        <div className='text-center my-10'>
          <Link
            to='/produtos/todos'
            className='inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-xl shadow hover:bg-yellow-300 transition-transform hover:scale-105'
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </>
  );
}

export default Categorias;
