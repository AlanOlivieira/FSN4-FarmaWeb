import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { FaCreditCard, FaPlusCircle } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { RiBankLine } from "react-icons/ri";

export default function Pagamentos() {
  const { currentUser } = useAuth();
  const [metodo, setMetodo] = useState("");
  const [cartoes, setCartoes] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [novoCartao, setNovoCartao] = useState(false);
  const [formCartao, setFormCartao] = useState({
    nome_cartao: "",
    numero: "",
    vencimento: "",
    cvv: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      api.get(`/cartoes/cliente/${currentUser.id}`).then((res) => {
        setCartoes(res.data);
      });
    }
  }, [currentUser]);

  const handleCadastrarCartao = async () => {
    const payload = { ...formCartao, cliente_id: currentUser?.id };
    try {
      await api.post("/cartoes", payload);
      const lista = await api.get(`/cartoes/cliente/${currentUser?.id}`);
      setCartoes(lista.data);
      setNovoCartao(false);
      setFormCartao({ nome_cartao: "", numero: "", vencimento: "", cvv: "" });
    } catch (err) {
      console.error("Erro ao salvar cartão:", err.response?.data || err.message);
    }
  };

  const confirmarPagamento = async () => {
    if (!metodo) return alert("Selecione um método de pagamento");

    try {
      // 1️⃣ Criar o pedido
      const pedido = await api.post("/pedidos", {
        status: "aguardando pagamento",
        total: 100,
        forma_pagamento: metodo,
        usuario_id: currentUser?.id,
        endereco_entrega_id: 1, // TODO: trocar pelo endereço escolhido
        itens: [
          { produto_id: 1, quantidade: 2, preco_unitario: 50 }, // TODO: pegar do carrinho real
        ],
      });

      const pedidoId = pedido.data.id;

      // 2️⃣ Criar o pagamento vinculado ao pedido
      await api.post("/pagamentos", {
        metodo,
        status: "pendente",
        valor: 100,
        pedido_id: pedidoId,
      });

      navigate("/finalizacao");
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Pagamento</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <button
            className={`btn w-100 ${metodo === "pix" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setMetodo("pix")}
          >
            <SiPix size={24} className="me-2" /> Pix
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button
            className={`btn w-100 ${metodo === "boleto" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMetodo("boleto")}
          >
            <RiBankLine size={24} className="me-2" /> Boleto
          </button>
        </div>
        <div className="col-md-12 mb-3">
          <button
            className={`btn w-100 ${metodo === "cartao" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMetodo("cartao")}
          >
            <FaCreditCard size={24} className="me-2" /> Cartão de Crédito
          </button>
        </div>
      </div>

      {metodo === "cartao" && (
        <div className="mt-4">
          <h5>Meus Cartões</h5>
          {cartoes.length === 0 ? (
            <p>Nenhum cartão cadastrado</p>
          ) : (
            cartoes.map((c) => (
              <div key={c.id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cartao"
                  value={c.id}
                  onChange={() => setCartaoSelecionado(c.id)}
                />
                <label className="form-check-label">
                  **** **** **** {c.numero.slice(-4)} - {c.nome_cartao}
                </label>
              </div>
            ))
          )}
          <button
            className="btn btn-outline-secondary mt-3 d-flex align-items-center"
            onClick={() => setNovoCartao(!novoCartao)}
          >
            <FaPlusCircle className="me-2" /> {novoCartao ? "Cancelar" : "Cadastrar Novo Cartão"}
          </button>

          {novoCartao && (
            <div className="mt-3 p-3 border rounded bg-light">
              <div className="mb-3">
                <label className="form-label">Nome no Cartão</label>
                <input
                  type="text"
                  className="form-control"
                  value={formCartao.nome_cartao}
                  onChange={(e) => setFormCartao({ ...formCartao, nome_cartao: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Número do Cartão</label>
                <input
                  type="text"
                  className="form-control"
                  value={formCartao.numero}
                  onChange={(e) => setFormCartao({ ...formCartao, numero: e.target.value })}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Vencimento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/AA"
                    value={formCartao.vencimento}
                    onChange={(e) => setFormCartao({ ...formCartao, vencimento: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formCartao.cvv}
                    onChange={(e) => setFormCartao({ ...formCartao, cvv: e.target.value })}
                  />
                </div>
              </div>
              <button
                className="btn w-100"
                style={{ backgroundColor: "#007bff", borderRadius: "8px", color: "#fff" }}
                onClick={handleCadastrarCartao}
              >
                Salvar Cartão
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-5">
        <button
          className="btn btn-lg w-100"
          style={{ backgroundColor: "#007bff", borderRadius: "8px", color: "#fff" }}
          onClick={confirmarPagamento}
        >
          Finalizar Pagamento
        </button>
      </div>
    </div>
  );
}
