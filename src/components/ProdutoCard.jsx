import React from 'react';
import { useCarrinho } from "../contexts/CarrinhoContext";
import BotaoCarrinho from "./BotaoCarrinho";
import BotaoFavorito from "./BotaoFavorito";
import { Link } from "react-router-dom";

export default function ProdutoCard({ produto }) {
  const { adicionarProduto } = useCarrinho();

  return (
    <div className="card h-100 w-100 shadow-sm position-relative">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'contain' }}
      />

      <div
  className="position-absolute d-flex flex-column align-items-center"
  style={{ top: '10px', right: '10px', zIndex: 1, gap: '8px' }}
>
  <BotaoCarrinho onClick={() => adicionarProduto(produto)} />
  <BotaoFavorito produto={produto} />
</div>


      <div className="card-body d-flex flex-column">
        <h5 className="card-title"><strong>{produto.nome}</strong></h5>
        <p className="card-text" style={{ flexGrow: 1 }}>
          {produto.descricao}
        </p>
        <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>
      </div>
    </div>
  );
}
