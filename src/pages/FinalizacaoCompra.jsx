import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useCarrinho } from "../contexts/CarrinhoContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FinalizacaoCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { limparCarrinho } = useCarrinho();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const state = location.state;

    if (!state || !state.carrinho || state.carrinho.length === 0) {
      navigate("/", { replace: true });
      return;
    }

    const numeroPedido = "FW" + Math.floor(100000 + Math.random() * 900000);

    const novoPedido = {
      numero: numeroPedido,
      itens: state.carrinho,
      total: typeof state.total === "number"
        ? state.total
        : state.carrinho.reduce((s, it) => s + it.preco * (it.quantidade || 1), 0),
      pagamento: "Cartão de Crédito",
      data: new Date().toLocaleString(),
    };

    setPedido(novoPedido);
    localStorage.setItem("ultimoPedido", JSON.stringify(novoPedido));


    if (typeof limparCarrinho === "function") {
      limparCarrinho();
    }

  }, []); 

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
          Número do Pedido: <strong>{pedido.numero}</strong>
        </div>

        <h5>Resumo do Pedido</h5>
        <div className="list-group mb-3">
          {pedido.itens.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <div className="fw-bold">{item.nome}</div>
                <small className="text-muted">R$ {item.preco.toFixed(2)}</small>
              </div>
              <div className="text-end">
                <div>{item.quantidade}x</div>
                <div>R$ {(item.preco * item.quantidade).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mb-3">
          <strong>Forma de Pagamento:</strong>
          <span>{pedido.pagamento}</span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <h5>Total:</h5>
          <h5>R$ {pedido.total.toFixed(2)}</h5>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <Link to={`/meus-pedidos`} className="btn btn-primary btn-lg">
            ACOMPANHAR PEDIDO
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
