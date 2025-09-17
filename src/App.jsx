import { FavoritosProvider } from './contexts/FavoritosContext';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/contato';
import Carrinho from './pages/Carrinho';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suplementos from './pages/suplementos';
import Vitaminas from './pages/vitaminas';
import Nutricao from './pages/nutricao';
import Beleza from './pages/beleza';
import Bebes from './pages/bebes';
import Medicamentos from './pages/medicamentos';
import DetalheProduto from './pages/DetalheProduto';
import TelaVendas from './pages/TelaVendas';
import ProdutosFavoritos from './pages/ProdutosFavoritos';
import "bootstrap-icons/font/bootstrap-icons.css";
import PaginaDePesquisa from './pages/PaginaDePesquisa';
import FinalizacaoCompra from './pages/FinalizacaoCompra';
import MeusPedidos from './pages/MeusPedidos';

function Layout() {
  return (
    <div className="site-wrap">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <FavoritosProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="contato" element={<Contato />} />
          <Route path="categorias">
            <Route path="suplementos" element={<Suplementos />} />
            <Route path="vitaminas" element={<Vitaminas />} />
            <Route path="dieta-nutricao" element={<Nutricao />} />
            <Route path="beleza" element={<Beleza />} />
            <Route path="baby" element={<Bebes />} />
            <Route path="medicamentos" element={<Medicamentos />} />
          </Route>
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="vendas" element={<TelaVendas />} />
          <Route path="favoritos" element={<ProdutosFavoritos />} />
          <Route path="pesquisa" element={<PaginaDePesquisa />} />
          <Route path="finalizacao" element={<FinalizacaoCompra />} />
          <Route path="meus-pedidos" element={<MeusPedidos />} />
        </Route>

        <Route path="/produto/:id" element={<DetalheProduto />} />
      </Routes>
    </FavoritosProvider>
  );
}

export default App;
