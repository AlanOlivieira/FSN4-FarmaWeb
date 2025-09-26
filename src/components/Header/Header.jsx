import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { useAuth } from '../../contexts/AuthContext';
import { FaSearch } from 'react-icons/fa';
import ModalLogin from '../ModalLogin.jsx';
import ModalRegistro from '../ModalRegistro.jsx';
import './Header.css';

export default function Header() {
  const { itens } = useCarrinho();
  const { currentUser, logout } = useAuth();

  const totalItens = itens.reduce((soma, item) => soma + (item.quantidade || 0), 0);

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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

                  <li className="has-children">
                    <a href="#">
                      <i className="bi bi-person" style={{ fontSize: "1.5rem" }}></i>
                    </a>
                    <ul className="dropdown">
                      {currentUser ? (
                        <>
                          <li className="dropdown-item-text px-3">
                            <strong>{currentUser.nome}</strong><br/>
                            <small className="text-muted">{currentUser.email}</small>
                          </li>

                          {currentUser.role === "cliente" && (
                            <>
                              <li><Link to="/minha-conta">Minha Conta</Link></li>
                              <li><Link to="/meus-pedidos">Meus Pedidos</Link></li>
                              <li><Link to="/favoritos">Meus Favoritos</Link></li>
                            </>
                          )}

                          {currentUser.role === "vendedor" && (
                            <>
                              <li><Link to="/minha-conta">Minha Conta</Link></li>
                              <li><Link to="/admin/produtos">Cadastrar Produtos</Link></li>
                              <li><Link to="/meus-produtos">Gerenciar Meus Produtos</Link></li>
                            </>
                          )}

                          {currentUser.role === "admin" && (
                            <>
                              <li><Link to="/minha-conta">Minha Conta</Link></li>
                            </>
                          )}

                          <li className="px-3">
                            <button 
                              onClick={handleLogout} 
                              className="btn btn-danger w-100"
                            >
                              Sair
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button 
                              onClick={() => setShowLogin(true)} 
                              className="btn btn-link w-100 text-start"
                              style={{ textDecoration: "none" }}
                            >
                              Fazer Login
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => setShowRegister(true)} 
                              className="btn btn-link w-100 text-start"
                              style={{ textDecoration: "none" }}
                            >
                              Criar Conta
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
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
                      textAlign: 'center'
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
}
