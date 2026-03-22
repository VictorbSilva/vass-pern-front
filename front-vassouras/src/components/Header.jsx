import { Link, NavLink } from 'react-router-dom';

function Header() {
  const getNavClasses = (isActive) => {
    const baseClasses =
      "relative pb-1 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300";

    const activeClasses =
      'text-yellow-400 font-bold after:w-full after:bg-yellow-400';

    const inactiveClasses =
      'text-gray-600 hover:text-blue-500 transition-colors after:w-0 hover:after:w-full after:bg-blue-500';

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4'>
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
      </div>
    </header>
  );
}

export default Header;
