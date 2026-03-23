import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const getNavClasses = (isActive) => {
  const baseClasses =
    "relative pb-1 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300";

  const activeClasses =
    'text-yellow-400 font-bold after:w-full after:bg-yellow-400';

  const inactiveClasses =
    'text-gray-600 hover:text-blue-500 transition-colors after:w-0 hover:after:w-full after:bg-blue-500';

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='relative bg-white shadow-sm sticky top-0 z-50'>
      <div className='headercontainer mx-auto flex items-center justify-between px-6 py-4'>
        <Link to='/'>
          <h1 className='text-2xl font-bold'>Logo</h1>
        </Link>

        <ul className='hidden md:flex space-x-8'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => getNavClasses(isActive)}
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/produtos'
              className={({ isActive }) => getNavClasses(isActive)}
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sobre'
              className={({ isActive }) => getNavClasses(isActive)}
            >
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contatos/'
              className={({ isActive }) => getNavClasses(isActive)}
            >
              Contatos
            </NavLink>
          </li>
        </ul>

        <button
          onClick={toggleMenu}
          className='md:hidden p-2 text-gray-600 hover:text-blue-500 transition-colors'
          aria-label='Alternar menu'
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navegação Mobile */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start px-6 py-4 space-y-4 md:hidden'>
          <NavLink
            to='/'
            className={({ isActive }) => getNavClasses(isActive)}
            onClick={toggleMenu}
          >
            Início
          </NavLink>
          <NavLink
            to='/produtos'
            className={({ isActive }) => getNavClasses(isActive)}
            onClick={toggleMenu}
          >
            Produtos
          </NavLink>
          <NavLink
            to='/sobre'
            className={({ isActive }) => getNavClasses(isActive)}
            onClick={toggleMenu}
          >
            Sobre
          </NavLink>
          <NavLink
            to='/contatos/'
            className={({ isActive }) => getNavClasses(isActive)}
            onClick={toggleMenu}
          >
            Contatos
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
