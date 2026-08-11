import {Link} from 'react-router-dom';

function NaoEncontrada() {
    return (
        <div className='p-10 text-center flex flex-col items-center gap-4'>
            <h1 className='text-2xl font-bold text-gray-900'>Página não encontrada</h1>
            <p className='text-gray-600'>
                O endereço que você abriu não existe ou foi movido.
            </p>
            <Link to='/produtos' className='text-blue-600 underline'>
                Ver todos os produtos
            </Link>
        </div>
    );
}

export default NaoEncontrada;
