// components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaSearch } from 'react-icons/fa';
import ModalLogin from '../ModalLogin';
import ModalRegistro from '../ModalRegistro';
import './Header.css';

export default function Header() {
  const { carrinho } = useCarrinho();
  const { currentUser, logout } = useAuth();
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  const handlePesquisa = (e) => {
    e.preventDefault();
    if (termoPesquisa.trim()) {
      navigate(`/pesquisa?q=${termoPesquisa}`);
      setTermoPesquisa('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <>
      <ModalLogin 
        show={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      
      <ModalRegistro 
        show={showRegister} 
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      
      <div className="site-navbar py-2">
        <div className={isSearchOpen ? 'search-wrap active' : 'search-wrap'}>
          <div className="container">
            <form onSubmit={handlePesquisa} className="search-form-container">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar produto..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
              />
              <button type="submit" className="search-submit-button">
                <FaSearch />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="search-close"
              >
                ✕
              </button>
            </form>
          </div>
        </div>
        

        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <Link to="/" className="js-logo-clone d-flex align-items-center">
                  <img
                    src="/images/logo.jpeg"
                    alt="Logo"
                    style={{ height: '80px', marginRight: '10px', width: '110px' }}
                  />
                  <span style={{ color: '#e0181f' }}>FARMA</span>
                  <span style={{ color: '#0052b4' }}>WEB</span>
                </Link>
              </div>
            </div>

            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li><Link to="/">Início</Link></li>
                  <li className="has-children">
                    <Link to="/categorias">Categorias</Link>
                    <ul className="dropdown">
                      <li><Link to="/categorias/medicamentos">Medicamentos e saúde</Link></li>
                      <li><Link to="/categorias/suplementos">Suplementos</Link></li>
                      <li><Link to="/categorias/vitaminas">Vitaminas</Link></li>
                      <li><Link to="/categorias/dieta-nutricao">Dieta & Nutrição</Link></li>
                      <li><Link to="/categorias/beleza">Cuidados e Beleza</Link></li>
                      <li><Link to="/categorias/baby">Cuidados para Bebês</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/sobre">Sobre</Link></li>
                  <li><Link to="/contato">Contato</Link></li>
                </ul>
              </nav>
            </div>

            <div className="icons">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="icons-btn d-inline-block js-search-open"
              >
                <span className="icon-search"></span>
              </button>
              
              {/* Ícone único de usuário com menu dropdown */}
              <div className="user-menu-container" style={{ position: 'relative', display: 'inline-block' }}>
                <button 
                  className="icons-btn d-inline-block" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  title={currentUser ? currentUser.nome : 'Minha conta'}
                >
                  <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                </button>
                
                {showUserMenu && (
                  <div className="user-menu-dropdown" style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    minWidth: '150px',
                    zIndex: 1000,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    {currentUser ? (
                      <>
                        <div className="user-info" style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                          <strong>{currentUser.nome}</strong>
                          <div className="small text-muted">{currentUser.email}</div>
                        </div>
                        <Link 
                          to="/minha-conta" 
                          className="d-block py-2"
                          onClick={() => setShowUserMenu(false)}
                          style={{ color: '#333', textDecoration: 'none' }}
                        >
                          Minha Conta
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="btn btn-link p-0 text-danger"
                          style={{ textDecoration: 'none' }}
                        >
                          Sair
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            setShowLogin(true);
                            setShowUserMenu(false);
                          }}
                          className="btn btn-link p-0 d-block mb-2"
                          style={{ textDecoration: 'none' }}
                        >
                          Fazer Login
                        </button>
                        <button 
                          onClick={() => {
                            setShowRegister(true);
                            setShowUserMenu(false);
                          }}
                          className="btn btn-link p-0 d-block"
                          style={{ textDecoration: 'none' }}
                        >
                          Criar Conta
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <Link to="/carrinho" className="icons-btn d-inline-block bag" style={{ position: 'relative', marginLeft: '10px' }}>
                <span className="icon-shopping-bag"></span>
                {totalItens > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      lineHeight: '16px',
                      textAlign: 'center',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {totalItens}
                  </span>
                )}
              </Link>
              
              <button className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                <span className="icon-menu"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};