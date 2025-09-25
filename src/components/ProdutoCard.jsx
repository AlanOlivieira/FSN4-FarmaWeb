import React from 'react';
import { Link } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useFavoritos } from "../contexts/FavoritosContext";
import { FaHeart } from "react-icons/fa";
import BotaoCarrinho from "./BotaoCarrinho";

export default function ProdutoCard({ produto }) {
  const { adicionarProduto } = useCarrinho();
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();
  const isFavorito = favoritos.some(fav => fav.id === produto.id);

  return (
    <div className="card h-100 w-100 shadow-sm position-relative">
      <Link to={`/produto/${produto.id}`}>
        <img
          src={produto.imagemPrincipal || "/images/produto-placeholder.png"}
          alt={produto.nome}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'contain' }}
        />
      </Link>

      <div
        className="position-absolute d-flex flex-column align-items-center"
        style={{ top: '10px', right: '10px', zIndex: 1, gap: '8px' }}
      >
        <BotaoCarrinho onClick={() => adicionarProduto(produto)} />
        <button
          className="btn btn-link p-0"
          onClick={() =>
            isFavorito ? removerFavorito(produto.id) : adicionarFavorito(produto)
          }
        >
          <FaHeart color={isFavorito ? "red" : "gray"} size={20} />
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <Link to={`/produto/${produto.id}`} className="text-decoration-none text-dark">
          <h5 className="card-title"><strong>{produto.nome}</strong></h5>
        </Link>

        <p className="card-text" style={{ flexGrow: 1 }}>
          {produto.descricao || "Sem descrição disponível"}
        </p>
        <p className="card-text fw-bold">R$ {produto.preco?.toFixed(2) || "0,00"}</p>
      </div>
    </div>
  );
}
