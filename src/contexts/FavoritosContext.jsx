import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const FavoritosContext = createContext(undefined);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [usuarioId] = useState(1);
  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const res = await api.get(`/favoritos/usuario/${usuarioId}`);
        setFavoritos(res.data);
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      }
    }
    carregarFavoritos();
  }, [usuarioId]);

  const adicionarFavorito = async (produto) => {
    try {
      const res = await api.post("/favoritos", {
        usuario_id: usuarioId,
        produto_id: produto.id,
      });
      setFavoritos((prev) => {
        if (prev.some((fav) => fav.produto.id === produto.id)) {
          return prev;
        }
        return [...prev, res.data];
      });
    } catch (err) {
      console.error("Erro ao adicionar favorito:", err);
    }
  };

  const removerFavorito = async (id) => {
    try {
      await api.delete(`/favoritos/${id}`);
      setFavoritos((prev) => prev.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
    }
  };

  return (
    <FavoritosContext.Provider
      value={{ favoritos, adicionarFavorito, removerFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos deve ser usado dentro de um FavoritosProvider");
  }
  return context;
};
