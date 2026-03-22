import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

function Footer() {
  const apiUrl = import.meta.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
  const adminUrl = apiUrl.replace('/api', '') + '/admin';

  return (
    <footer className='bg-gray-100 text-white py-6 mt-5 justify-center items-center w-full border-t shadow-lg'>
      <div className='container grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto text-center'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold text-gray-950'>Logo</h2>
        </div>
        <nav className='flex flex-col gap-4'>
          <h3 className='text-1xl font-bold text-gray-800 '>Links Rápidos</h3>
          <ul className='flex flex-col text-gray-600 space-y-2'>
            <li>
              <Link to='/' className='hover:text-yellow-400 transition-colors'>
                Início
              </Link>
            </li>
            <li>
              <Link
                to='/produtos'
                className='hover:text-yellow-400 transition-colors'
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to='/sobre'
                className='hover:text-yellow-400 transition-colors'
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                to='/contatos'
                className='hover:text-yellow-400 transition-colors'
              >
                Contatos
              </Link>
            </li>
            <li>
              <Link
                to={adminUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-yellow-400 transition-colors opacity-50 hover:opacity-100'
              >
                Acesso Restrito
              </Link>
            </li>
          </ul>
        </nav>
        <address className='flex flex-col gap-4 not-italic'>
          <h3 className='text-lg font-bold uppercase text-gray-950 tracking-wider'>
            Contatos
          </h3>
          <ul className='space-y-4 text-gray-600'>
            <li className='flex items-center gap-3'>
              <MapPin className='w-5 h-5 text-blue-500 shrink-0' />
              <span>
                Av. Industrial, 1234 — Distrito Industrial, Recife - PE
              </span>
            </li>
            <li className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-blue-500 shrink-0' />
              <span>(81) 9999-9999</span>
            </li>
            <li className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-blue-500 shrink-0' />
              <span>contato@vassouraspernambucanas.com.br</span>
            </li>
          </ul>
        </address>
      </div>
    </footer>
  );
}

export default Footer;
