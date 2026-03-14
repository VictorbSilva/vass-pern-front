import './App.css';
import ProdutoDetalhe from './components/ProdutoDetalhe.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalogo from './components/Catalogo.jsx';
import Home from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';

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
