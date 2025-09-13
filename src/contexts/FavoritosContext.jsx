import React, { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const adicionarFavorito = (produto) => {
    if (!favoritos.some(fav => fav.id === produto.id)) {
      setFavoritos([...favoritos, produto]);
    }
  };

  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(fav => fav.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
