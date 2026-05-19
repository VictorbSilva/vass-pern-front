import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BotaoWhatsapp from '../components/BotaoWhatsapp';
import ProdutosRow from '../components/ProdutosRow.jsx';

function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loadingRelacionados, setLoadingRelacionados] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    const controller = new AbortController();

    setProduto(null);
    window.scrollTo(0, 0);

    async function fetchProduto() {
      try {
        const response = await fetch(`${baseUrl}/api/produtos/${id}/`, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar detalhes do produto:', error);
        }
      }
    }

    fetchProduto();

    return () => controller.abort();
  }, [id, baseUrl]);

  useEffect(() => {
    if (!produto?.categoria) return;

    const controller = new AbortController();

    async function fetchRelacionados() {
      setLoadingRelacionados(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/produtos/?categoria=${produto.categoria}`,
          { signal: controller.signal }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const vitrineFiltrada = data
          .filter((item) => item.id !== produto.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
        setRelacionados(vitrineFiltrada);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar produtos relacionados:', error);
        }
      } finally {
        setLoadingRelacionados(false);
      }
    }

    fetchRelacionados();

    return () => controller.abort();
  }, [produto?.categoria, produto?.id, baseUrl]);

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (!produto) {
    return <div className='p-10 text-center'>Carregando detalhes...</div>;
  }

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
            src={`${produto.imagem}`}
            alt={produto.nome}
            className='w-full h-auto rounded-xl shadow-lg object-cover'
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/png?text=Sem+Imagem';
            }}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-gray-900'>{produto.nome}</h1>

          <div className='border-t border-b py-4 my-2'>
            <h3 className='text-sm uppercase tracking-wider text-gray-700 font-bold mb-2'>
              Descrição
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              {produto.descricao ||
                'Este produto não possui descrição disponível.'}
            </p>
          </div>
          <p className='mt-4 text-3xl font-semibold text-blue-600'>
            {formatarPreco(produto.preco)}
          </p>
          <BotaoWhatsapp produto={produto} />
        </div>
      </div>

      {(loadingRelacionados || relacionados.length > 0) && (
        <ProdutosRow
          titulo='Veja também'
          produtos={relacionados}
          loading={loadingRelacionados}
        />
      )}
    </div>
  );
}

export default ProdutoDetalhe;
