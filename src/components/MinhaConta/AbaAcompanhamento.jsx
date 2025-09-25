import React from 'react';

const AbaAcompanhamento = ({ pedidos, getStatusEntrega, gerarCodigoRastreio }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Acompanhamento de Pedidos</h5>
      </div>
      <div className="card-body">
        {pedidos.length > 0 ? (
          <div className="row">
            {pedidos.map((pedido, index) => {
              const status = getStatusEntrega(pedido.data);
              return (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <strong>Pedido #{pedido.numero}</strong>
                      <span className={`badge ${status.status === "Entregue" ? "bg-success" : status.status === "Em trânsito" ? "bg-warning" : "bg-info"}`}>
                        {status.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p><strong>Data do pedido:</strong> {new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Código de rastreio:</strong> {gerarCodigoRastreio(pedido.numero)}</p>
                      
                      <div className="d-flex align-items-center mb-3">
                        <i className={status.icone + " me-2 text-primary"}></i>
                        <span>{status.texto}</span>
                      </div>
                      
                      <h6>Itens do pedido:</h6>
                      <ul className="list-group list-group-flush">
                        {pedido.itens.map((item, i) => (
                          <li key={i} className="list-group-item d-flex justify-content-between py-2 px-0">
                            <span>{item.quantidade}x {item.nome}</span>
                            <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                        <strong>Total:</strong>
                        <strong>R$ {pedido.total.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          alert(`Status: ${status.status}\n${status.texto}\nCódigo de rastreio: ${gerarCodigoRastreio(pedido.numero)}`);
                        }}
                      >
                        <i className="bi bi-info-circle me-1"></i> Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-truck" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
            <p className="mt-3">Nenhum pedido encontrado</p>
            <p className="text-muted">Você ainda não realizou nenhuma compra.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbaAcompanhamento;