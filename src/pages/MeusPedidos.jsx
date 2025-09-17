import React, { useState, useEffect } from "react";

export default function MeusPedidos() {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const pedidoSalvo = localStorage.getItem("ultimoPedido");
    if (pedidoSalvo) {
      setPedido(JSON.parse(pedidoSalvo));
    }
  }, []);

  if (!pedido) {
    return <p className="text-center mt-5">Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Meus Pedidos</h2>
      <div className="card p-3 shadow-sm">
        <p><strong>Número:</strong> {pedido.numero}</p>
        <p><strong>Data:</strong> {pedido.data}</p>
        <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
        <h5 className="mt-3">Itens:</h5>
        <ul className="list-group">
          {pedido.itens.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              {item.nome} <span>{item.quantidade}x</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
