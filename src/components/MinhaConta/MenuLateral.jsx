import React from 'react';

const MenuLateral = ({ activeTab, setActiveTab, logout }) => {
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Minha Conta</h5>
        </div>
        <div className="list-group list-group-flush">
          <button
            className={`list-group-item list-group-item-action ${activeTab === 'dados' ? 'active' : ''}`}
            onClick={() => setActiveTab('dados')}
          >
            <i className="bi bi-person me-2"></i> Meus Dados
          </button>
          <button
            className={`list-group-item list-group-item-action ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => setActiveTab('historico')}
          >
            <i className="bi bi-receipt me-2"></i> Histórico de Compras
          </button>
          <button
            className={`list-group-item list-group-item-action ${activeTab === 'acompanhamento' ? 'active' : ''}`}
            onClick={() => setActiveTab('acompanhamento')}
          >
            <i className="bi bi-geo-alt me-2"></i> Acompanhamento de Pedidos
          </button>
          <button
            className={`list-group-item list-group-item-action ${activeTab === 'ajuda' ? 'active' : ''}`}
            onClick={() => setActiveTab('ajuda')}
          >
            <i className="bi bi-question-circle me-2"></i> Central de Ajuda
          </button>
          <button
            className="list-group-item list-group-item-action text-danger"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuLateral;