import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProdutoCard from '../components/ProdutoCard.jsx';
import { API_BASE_URL, buscarJson } from '../services/api.js';

const MS_DEBOUNCE_BUSCA = 700;

function Catalogo() {
  // undefined na rota /produtos/todos, que o App.jsx registra separada da rota
  // dinamica. E por isso que a string 'todos' nao aparece na logica daqui.
  const { categoriaId } = useParams();

  // O resultado carrega o id que o produziu para ser DERIVADO na rota atual.
  // A alternativa era limpar o estado dentro do efeito ao trocar de categoria,
  // que e o que ProdutoDetalhe faz e o que obrigou o eslint-disable de la.
  const [resultadoCategoria, setResultadoCategoria] = useState(null);
  // O `Boolean(resultadoCategoria) &&` nao e redundante: em /produtos/todos o
  // categoriaId e undefined, e o optional chaining de um resultado nulo tambem
  // da undefined — sem a guarda os dois batem e a rota sem categoria se declara
  // dona de um resultado que nao existe.
  const daRotaAtual =
    Boolean(resultadoCategoria) && resultadoCategoria.id === categoriaId;
  const categoria = daRotaAtual ? resultadoCategoria.dados : null;
  const categoriaNaoEncontrada = daRotaAtual && resultadoCategoria.naoEncontrada;

  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [termoBusca, setTermoBusca] = useState('');
  const [termoBuscado, setTermoBuscado] = useState('');

  // O debounce mora sozinho neste efeito, e nao no que busca os produtos: e o
  // que faz a digitacao esperar 700ms e a troca de categoria nao esperar nada.
  // Antes um unico timer cobria os dois, e clicar em categoria custava 700ms.
  useEffect(() => {
    const timerId = setTimeout(
      () => setTermoBuscado(termoBusca),
      MS_DEBOUNCE_BUSCA
    );

    return () => clearTimeout(timerId);
  }, [termoBusca]);

  useEffect(() => {
    if (!categoriaId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCategoria() {
      try {
        const data = await buscarJson(
          `${API_BASE_URL}/api/categorias/${categoriaId}/`,
          signal
        );
        if (!signal.aborted) {
          setResultadoCategoria({
            id: categoriaId,
            dados: data,
            naoEncontrada: false,
          });
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (!signal.aborted) {
          // So o 404 daqui distingue categoria inexistente de categoria vazia:
          // /api/produtos/?categoria=999 responde 200 com o catalogo inteiro.
          setResultadoCategoria({
            id: categoriaId,
            dados: null,
            naoEncontrada: error.status === 404,
          });
          console.error('Erro ao processar a categoria:', error);
        }
      }
    }
    void fetchCategoria();

    return () => controller.abort();
  }, [categoriaId]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProdutos() {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_BASE_URL}/api/produtos/`);
        if (categoriaId) url.searchParams.append('categoria', categoriaId);
        if (termoBuscado) url.searchParams.append('search', termoBuscado);

        const data = await buscarJson(url.toString(), signal);

        if (!signal.aborted) {
          setProdutos(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        if (!signal.aborted) {
          setError('Erro ao carregar produtos.');
          setIsLoading(false);
          console.error('Erro ao processar produtos:', error);
        }
      }
    }
    void fetchProdutos();

    return () => controller.abort();
  }, [categoriaId, termoBuscado]);

  if (categoriaNaoEncontrada) {
    return (
      <div className='p-10 text-center flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Categoria não encontrada
        </h1>
        <p className='text-gray-600'>
          Esta categoria pode ter saído do catálogo.
        </p>
        <Link to='/produtos' className='text-blue-600 underline'>
          Ver todas as categorias
        </Link>
      </div>
    );
  }

  const titulo =
    categoria?.nome ?? (categoriaId ? 'Produtos' : 'Todos os Produtos');

  return (
    <>
      <div className='bg-linear-to-br from-blue-800 to-cyan-500 mb-4 pb-4 text-center'>
        <h1 className='text-5xl md:text-4xl font-black text-white drop-shadow-md'>
          {titulo}
        </h1>
        <p className='text-lg md:text-xl text-white/90 mt-2 max-w-xl mx-auto leading-relaxed'>
          Encontre as melhores opções para o seu negócio.
        </p>
      </div>

      <div className='CatalogoContainer p-4 max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-8'>
          <Link
            to='/produtos'
            className='shrink-0 text-blue-600 hover:text-blue-800 underline'
          >
            ← Todas as categorias
          </Link>

          <input
            type='text'
            placeholder='Buscar produtos...'
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className='w-full bg-white text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors'
          />
        </div>

        {isLoading && (
          <div className='text-center text-blue-500 my-10 font-bold'>
            Carregando produtos...
          </div>
        )}

        {!isLoading && error && (
          <div className='text-center text-red-500 my-10'>{error}</div>
        )}

        {!isLoading && !error && produtos.length === 0 && (
          <div className='text-center text-gray-500 my-10 font-bold'>
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
      </div>
    </>
  );
}

export default Catalogo;
