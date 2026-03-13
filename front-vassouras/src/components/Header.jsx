import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='bg-linear-to-r from-gray-300 to-white-300'>
      <div className='container mx-auto'>
        <Link to='/'>
          <h1 className='text-2xl font-bold'>Logo</h1>
        </Link>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/' className='hover:text-blue-300'>
              Início
            </Link>
          </li>
          <li>
            <Link to='/produtos' className='hover:text-blue-300'>
              Produtos
            </Link>
          </li>
          <li>
            <Link to='/sobre' className='hover:text-blue-300'>
              Sobre
            </Link>
          </li>
          <li>
            <Link to='/contato' className='hover:text-blue-300'>
              Contato
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
