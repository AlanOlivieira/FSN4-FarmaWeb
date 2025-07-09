import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<h1 style={{ padding: '2rem' }}>Sobre</h1>} />
        <Route path="contato" element={<h1 style={{ padding: '2rem' }}>Contato</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
