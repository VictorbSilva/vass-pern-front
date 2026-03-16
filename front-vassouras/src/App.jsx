import './App.css';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import ProdutoDetalhe from './pages/ProdutoDetalhe.jsx';
import Sobre from './pages/Sobre.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos' element={<Catalogo />} />
        <Route path='/produto/:id' element={<ProdutoDetalhe />} />
        <Route path='/sobre/' element={<Sobre />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
