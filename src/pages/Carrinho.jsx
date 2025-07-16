import React, { useState } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Carrinho() {
  const {
    carrinho,
    adicionarProduto,
    diminuirQuantidade,
    removerProduto,
    total,
  } = useCarrinho();

  
  const [hoverRemoverId, setHoverRemoverId] = useState(null);
  const [hoverFinalizar, setHoverFinalizar] = useState(false);

  if (carrinho.length === 0) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Carrinho de Compras</h1>
        <div className="alert alert-info">Seu carrinho está vazio!</div>
        <Link to="/" className="btn btn-primary mt-3">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Carrinho de Compras</h1>

      <div className="row">
        <div className="col-lg-8">
          {carrinho.map((produto) => (
            <div key={produto.id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={produto.imagem}
                    className="img-fluid rounded-start"
                    alt={produto.nome}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text mb-1">
                      Preço unitário: <strong>R$ {produto.preco.toFixed(2)}</strong>
                    </p>
                    <p className="card-text mb-1">
                      Subtotal: <strong>R$ {(produto.preco * produto.quantidade).toFixed(2)}</strong>
                    </p>
                    <div className="d-flex align-items-center mt-3">
                      <button
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                        onClick={() => diminuirQuantidade(produto.id)}
                      >
                        -
                      </button>

                      <span
                        style={{
                          minWidth: '32px',
                          textAlign: 'center',
                          fontSize: '16px',
                          display: 'inline-block'
                        }}
                      >
                        {produto.quantidade}
                      </span>

                      <button
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginLeft: '8px'
                        }}
                        onClick={() =>
                          adicionarProduto({
                            id: produto.id,
                            nome: produto.nome,
                            preco: produto.preco,
                            imagem: produto.imagem,
                            descricao: produto.descricao,
                          })
                        }
                      >
                        +
                      </button>

                      <button
                        onClick={() => removerProduto(produto.id)}
                        onMouseEnter={() => setHoverRemoverId(produto.id)}
                        onMouseLeave={() => setHoverRemoverId(null)}
                        style={{
                          backgroundColor: hoverRemoverId === produto.id ? '#fff' : '#e0181f',
                          color: hoverRemoverId === produto.id ? '#e0181f' : '#fff',
                          border: '2px solid #e0181f',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          marginLeft: '16px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Resumo da Compra</h4>
              <hr />
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.nome} x {item.quantidade}
                  </span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>R$ {total.toFixed(2)}</strong>
              </div>
              <button
                onMouseEnter={() => setHoverFinalizar(true)}
                onMouseLeave={() => setHoverFinalizar(false)}
                style={{
                  backgroundColor: hoverFinalizar ? "#fff" : "#0052b4",
                  color: hoverFinalizar ? "#0052b4" : "#fff",
                  border: "2px solid #0052b4",
                  padding: "10px 16px",
                  width: "100%",
                  fontSize: "16px",
                  borderRadius: "6px",
                  marginTop: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
