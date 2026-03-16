import './App.css';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import ProdutoDetalhe from './pages/ProdutoDetalhe.jsx';
import Contatos from './pages/Contatos.jsx';
import Sobre from './pages/Sobre.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen bg-gray-50"'>
        <Header />
        <main className='flex-grow w-full  mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/produtos' element={<Catalogo />} />
            <Route path='/produto/:id' element={<ProdutoDetalhe />} />
            <Route path='/contatos/' element={<Contatos />} />
            <Route path='/sobre/' element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
