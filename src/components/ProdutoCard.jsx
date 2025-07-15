import React from 'react';
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function ProdutoCard({ produto }) {
  const { adicionarProduto } = useCarrinho(); //aqui eh pro carrinho oook?

  return (
    // <div className="col-sm-6 col-md-4 mb-4">
      <div className="card h-100 w-100 shadow-sm">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body text-left">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text">{produto.descricao}</p>
          <div className="d-flex flex-row align-items-center justify-content-between"> 
            <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>
            <button
              className="btn btn-primary btn-sm h-25 w-25 rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => adicionarProduto(produto)}
            >
              <i class="bi bi-bag-plus fs-4"></i>
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}
