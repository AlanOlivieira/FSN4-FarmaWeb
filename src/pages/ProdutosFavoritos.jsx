import React from "react";
import { useFavoritos } from "../contexts/FavoritosContext";
import ProdutoCard from "../components/ProdutoCard";

export default function ProdutosFavoritos() {
  const { favoritos } = useFavoritos();

  return (
    <div className="container mt-4">
      <h2>Produtos Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Nenhum produto favoritado ainda.</p>
      ) : (
        <div className="row">
          {favoritos.map((produto) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={produto.id}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
