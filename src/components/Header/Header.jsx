import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../contexts/CarrinhoContext';

export default function Header() {

  const { carrinho } = useCarrinho(); 
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  return (
    <div className="site-navbar py-2">
      {/* barra de buscar!!! entaoooo... nao ta funcionando kkk*/}
      <div className="search-wrap">
        <div className="container">
          <button className="search-close js-search-close">
            <span className="icon-close2"></span>
          </button>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="form-control" placeholder="Pesquisar produto..." />
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
                <li><Link to="/minha-conta">Minha Conta</Link></li>
              </ul>
            </nav>
          </div>

          <div className="icons">
            <button className="icons-btn d-inline-block js-search-open">
            <span className="icon-search"></span>
            </button>
             <Link to="/carrinho" className="icons-btn d-inline-block bag" style={{ position: 'relative' }}>
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
  );
}
