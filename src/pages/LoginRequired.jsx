// pages/LoginRequired.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from '../components/ModalLogin';
import ModalRegistro from '../components/ModalRegistro';

function LoginRequired() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body py-5">
              <i className="bi bi-exclamation-circle" style={{ fontSize: '4rem', color: '#ffc107' }}></i>
              <h3 className="mt-4">Acesso Restrito</h3>
              <p className="text-muted">
                Você precisa estar logado para acessar esta página ou finalizar sua compra.
              </p>
              
              <div className="d-grid gap-2 d-md-block mt-4">
                <button
                  className="btn btn-primary me-md-2"
                  onClick={() => setShowLogin(true)}
                >
                  Fazer Login
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowRegister(true)}
                >
                  Criar Conta
                </button>
              </div>
              
              <p className="mt-3">
                Ou <Link to="/">continuar navegando</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
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
    </div>
  );
}

export default LoginRequired;