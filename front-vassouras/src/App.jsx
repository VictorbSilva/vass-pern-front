import './App.css';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Categorias from './pages/Categorias.jsx';
import ProdutoDetalhe from './pages/ProdutoDetalhe.jsx';
import Contatos from './pages/Contatos.jsx';
import Sobre from './pages/Sobre.jsx';
import NaoEncontrada from './pages/NaoEncontrada.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className='flex flex-col min-h-screen bg-gray-50'>
                <Header/>
                <main className='grow w-full  mx-auto'>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/produtos' element={<Categorias/>}/>
                        {/* Estatica antes da dinamica de proposito: com a rota
                            propria, 'todos' nunca chega ao :categoriaId, e o
                            Catalogo le "sem categoria" de um param undefined em
                            vez de comparar com uma string magica. */}
                        <Route path='/produtos/todos' element={<Catalogo/>}/>
                        <Route path='/produtos/:categoriaId' element={<Catalogo/>}/>
                        <Route path='/produto/:id' element={<ProdutoDetalhe/>}/>
                        <Route path='/contatos/' element={<Contatos/>}/>
                        <Route path='/sobre/' element={<Sobre/>}/>
                        <Route path='*' element={<NaoEncontrada/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
