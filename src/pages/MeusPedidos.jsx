import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function MeusPedidos() {
  const { currentUser } = useAuth(); // 🔹 Agora pega do contexto
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const carregarPedidos = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await api.get(`/pedidos/usuario/${currentUser.id}`);
        setPedidos(res.data);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err.response?.data || err.message);
      }
    };
    carregarPedidos();
  }, [currentUser]);

  const cancelarPedido = async (pedidoId) => {
    try {
      await api.put(`/pedidos/${pedidoId}/cancelar`); // 🔹 Nova rota
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId ? { ...p, status: "cancelado" } : p
        )
      );
    } catch (err) {
      console.error("Erro ao cancelar pedido:", err.response?.data || err.message);
    }
  };

  if (pedidos.length === 0) {
    return <p className="text-center mt-5">Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Meus Pedidos</h2>
      {pedidos.map((p) => (
        <div key={p.id} className="card p-3 shadow-sm mb-3">
          <p><strong>Número:</strong> {p.id}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Data:</strong> {new Date(p.data_pedido).toLocaleDateString()}</p>
          <p><strong>Total:</strong> R$ {p.total.toFixed(2)}</p>

          <h5 className="mt-3">Itens:</h5>
          <ul className="list-group">
            {p.itenspedido.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.produto.imagemPrincipal}
                    alt={item.produto.nome}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  {item.produto.nome}
                </div>
                <span>{item.quantidade}x</span>
                <span>
                  R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {p.status !== "cancelado" && (
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={() => cancelarPedido(p.id)}
            >
              Cancelar Pedido
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
