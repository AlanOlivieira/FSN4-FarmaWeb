import React from 'react';

const AbaHistorico = ({ pedidos }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Meus Pedidos</h5>
      </div>
      <div className="card-body">
        {pedidos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Número do Pedido</th>
                  <th>Itens</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido, index) => (
                  <tr key={index}>
                    <td>{new Date(pedido.data).toLocaleDateString('pt-BR')}</td>
                    <td>#{pedido.numero}</td>
                    <td>
                      <ul className="list-unstyled mb-0">
                        {pedido.itens.map((item, i) => (
                          <li key={i} className="small">
                            {item.quantidade}x {item.nome}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>R$ {pedido.total.toFixed(2)}</td>
                    <td>
                      <span className="badge bg-success">Entregue</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-receipt" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
            <p className="mt-3">Nenhum pedido encontrado</p>
            <p className="text-muted">Você ainda não realizou nenhuma compra.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbaHistorico;