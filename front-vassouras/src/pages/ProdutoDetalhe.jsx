import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import BotaoWhatsapp from '../components/BotaoWhatsapp';
import ProdutosRow from '../components/ProdutosRow.jsx';
import {API_BASE_URL, buscarJson} from '../services/api.js';
import {embaralhar} from '../utils/embaralhar.js';
import {formatarPreco} from '../utils/formatarPreco.js';

function ProdutoDetalhe() {
    const {id} = useParams();
    const [produto, setProduto] = useState(null);
    const [erro, setErro] = useState(null);
    const [tentativa, setTentativa] = useState(0);
    const [relacionados, setRelacionados] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        // Este reset limpa o produto velho ao trocar de id E limpa o erro no retry
        // (tentativa e dependencia do efeito). Tirar os dois exige remontar por key ou
        // derivar o estado, e as duas saidas quebram o retry. Fica para o CP5, que ja
        // reescreve a navegacao da PDP. A regra so aparece desde que o estado morto
        // loadingRelacionados saiu daqui e a analise parou de fazer bailout.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProduto(null);
        setErro(null);
        window.scrollTo(0, 0);

        async function fetchProduto() {
            try {
                const data = await buscarJson(
                    `${API_BASE_URL}/api/produtos/${id}/`,
                    controller.signal
                );
                setProduto(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Erro ao buscar detalhes do produto:', error);
                    setErro(error.status === 404 ? 'nao-encontrado' : 'falha');
                }
            }
        }

        void fetchProduto();

        return () => controller.abort();
    }, [id, tentativa]);

    useEffect(() => {
        if (!produto?.categoria) return;

        const controller = new AbortController();

        async function fetchRelacionados() {
            try {
                const data = await buscarJson(
                    `${API_BASE_URL}/api/produtos/?categoria=${produto.categoria}`,
                    controller.signal
                );
                const vitrineFiltrada = embaralhar(
                    data.filter((item) => item.id !== produto.id)
                ).slice(0, 8);
                setRelacionados(vitrineFiltrada);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Erro ao buscar produtos relacionados:', error);
                }
            }
        }

        void fetchRelacionados();

        return () => controller.abort();
    }, [produto?.categoria, produto?.id]);

    if (erro) {
        const naoEncontrado = erro === 'nao-encontrado';

        return (
            <div className='p-10 text-center flex flex-col items-center gap-4'>
                <h2 className='text-2xl font-bold text-gray-900'>
                    {naoEncontrado
                        ? 'Produto não encontrado'
                        : 'Não foi possível carregar o produto'}
                </h2>
                <p className='text-gray-600'>
                    {naoEncontrado
                        ? 'Este produto pode ter saído do catálogo.'
                        : 'Verifique sua conexão e tente de novo.'}
                </p>
                {!naoEncontrado && (
                    <button
                        onClick={() => setTentativa((numero) => numero + 1)}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Tentar novamente
                    </button>
                )}
                <Link to='/produtos' className='text-blue-600 underline'>
                    Ver todos os produtos
                </Link>
            </div>
        );
    }

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
                        <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
                            {produto.descricao ||
                                'Este produto não possui descrição disponível.'}
                        </p>
                    </div>
                    <p className='mt-4 text-3xl font-semibold text-blue-600'>
                        {formatarPreco(produto.preco)}
                    </p>
                    <BotaoWhatsapp produto={produto}/>
                </div>
            </div>

            {relacionados.length > 0 && (
                <ProdutosRow titulo='Veja também' produtos={relacionados}/>
            )}
        </div>
    );
}

export default ProdutoDetalhe;
