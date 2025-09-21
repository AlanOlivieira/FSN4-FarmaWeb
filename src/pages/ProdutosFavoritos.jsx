import React from "react";
import { useFavoritos } from "../contexts/FavoritosContext";
import ProdutoCard from "../components/ProdutoCard";

export default function ProdutosFavoritos() {
  const { favoritos, removerFavorito } = useFavoritos();

  return (
    <div className="container mt-4">
      <h2>Produtos Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Nenhum produto favoritado ainda.</p>
      ) : (
        <div className="row">
          {favoritos.map((fav) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={fav.id}>
              <div className="card shadow-sm h-100 d-flex flex-column">
                <ProdutoCard produto={fav.produto} />
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={() => removerFavorito(fav.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
