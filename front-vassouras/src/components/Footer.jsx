import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

function Footer() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
  const adminUrl = apiUrl.replace('/api', '') + '/admin';

  return (
    <footer className='bg-gray-100 text-white py-6 mt-5 justify-center items-center w-full border-t shadow-lg'>
      <div className='container grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto text-center'>
        <div className='flex flex-col justify-center items-center'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.5507682018533!2d-34.91772124210681!3d-8.080760936091494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1ecffc3083cd%3A0x42f7654b0d61a99e!2sR.%20S%C3%A3o%20Miguel%2C%201234%20-%20Afogados%2C%20Recife%20-%20PE%2C%2050850-000!5e0!3m2!1spt-BR!2sbr!4v1774236763237!5m2!1spt-BR!2sbr'
            className='w-full h-48 rounded-lg shadow-md'
            height='450'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
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
                Rua São Miguel, 1234 - Afogados, Recife - PE, 50850-000
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
