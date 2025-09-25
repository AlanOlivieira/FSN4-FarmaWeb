import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FinalizacaoCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itens, total, limparCarrinho } = useCarrinho();
  const { currentUser } = useAuth();
  const [pedido, setPedido] = useState(null);
  const processado = useRef(false);

  useEffect(() => {
    const processarPedido = async () => {
      if (processado.current) return;

      const state = location.state;

      if ((!state || !state.itens || state.itens.length === 0) && (!itens || itens.length === 0)) {
        navigate("/", { replace: true });
        return;
      }

      const itensPedido = state?.itens?.length > 0 ? state.itens : itens;

      const payload = {
        usuario_id: currentUser?.id,
        endereco_entrega_id: currentUser?.endereco_id,
        forma_pagamento: "Cartão de Crédito",
        itens: itensPedido.map((item) => ({
          produto_id: item.produto?.id || item.id,
          quantidade: item.quantidade,
          preco_unitario: item.produto?.preco || item.preco,
        })),
      };

      try {
        const res = await api.post("/pedidos", payload);
        setPedido(res.data);
        limparCarrinho();
        processado.current = true;
      } catch (err) {
        console.error("Erro ao salvar pedido:", err.response?.data || err.message);
      }
    };

    processarPedido();
  }, [location.state, itens, total, currentUser, limparCarrinho, navigate]);

  if (!pedido) {
    return (
      <div className="container py-5 text-center">
        <p>Processando seu pedido...</p>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="shadow-lg p-5"
        style={{
          maxWidth: "820px",
          width: "100%",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <FaCheckCircle size={64} color="#28a745" />
          <h2 className="mt-3 text-success">Compra Concluída!</h2>
          <p>
            Obrigado por comprar na <strong>FarmaWeb</strong>. Seu pedido foi
            confirmado e o pagamento está em análise.
          </p>
        </div>

        <div className="alert alert-info text-center">
          Número do Pedido: <strong>{pedido.id}</strong>
        </div>

        <h5>Resumo do Pedido</h5>
        <div className="list-group mb-3">
          {pedido.itenspedido.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <div className="fw-bold">{item.produto?.nome}</div>
                <small className="text-muted">
                  R$ {item.preco_unitario.toFixed(2)}
                </small>
              </div>
              <div className="text-end">
                <div>{item.quantidade}x</div>
                <div>
                  R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mb-3">
          <strong>Forma de Pagamento:</strong>
          <span>{pedido.forma_pagamento}</span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <h5>Total:</h5>
          <h5>R$ {pedido.total.toFixed(2)}</h5>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <Link to={`/Meus-Pedidos/`} className="btn btn-primary btn-lg">
            VER MEUS PEDIDOS
          </Link>
          <Link to="/" className="btn btn-outline-secondary btn-lg">
            VOLTAR À LOJA
          </Link>
        </div>

        <p className="mt-3 text-center text-muted small">
          Você receberá atualizações do pedido por e-mail.
        </p>
      </div>
    </div>
  );
}
