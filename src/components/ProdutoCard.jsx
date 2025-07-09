import React from 'react';
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function ProdutoCard({ produto }) {
  const { adicionarProduto } = useCarrinho(); //aqui eh pro carrinho oook?

  return (
    <div className="col-sm-6 col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text">{produto.descricao}</p>
          <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>
          <button
            className="btn btn-primary"
            onClick={() => adicionarProduto(produto)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
