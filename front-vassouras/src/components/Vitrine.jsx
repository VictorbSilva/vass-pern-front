import { useState, useEffect } from 'react';

function Vitrine() {
  const [produtos, setProdutos] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch('http://127.0.0.1:8000/');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao processar produtos:', error);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <div className='VitrineContainer p-4'>
      <h1 className='text-2xl font-bold mb-6'>Produtos</h1>

      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {produtos.map((produto) => (
          <li
            key={produto.id}
            className='bg-white p-4 border rounded-lg shadow-sm hover:shadow-xl/20 transition-shadow'
          >
            <div className='aspect-square bg-gray-100 mb-4 rounded-md flex items-center justify-center'>
              <img
                src={`${baseUrl}${produto.imagem}`}
                alt={produto.nome}
                className='w-full h-full object-cover'
              />
            </div>
            <h2 className='font-semibold text-gray-800'>{produto.nome}</h2>
            <p className='text-blue-600 font-bold mt-2'>R$ {produto.preco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vitrine;
