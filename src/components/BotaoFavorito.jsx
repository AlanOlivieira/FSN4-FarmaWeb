import React from 'react';
import { useFavoritos } from '../contexts/FavoritosContext';
import { FaHeart } from 'react-icons/fa';
import './BotaoFavorito.css'; 
function BotaoFavorito({ produto }) {
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();

  const isFavorito = !!favoritos.find(fav => fav.id === produto.id);

  const toggleFavorito = (e) => {
    e.stopPropagation(); 
    e.preventDefault();

    if (isFavorito) {
      removerFavorito(produto.id);
    } else {
      adicionarFavorito(produto);
    }
  };

  const classeDoIcone = `coracao-favorito ${isFavorito ? 'ativo' : 'inativo'}`;

  return (
    <button onClick={toggleFavorito} className="botao-favorito-container" aria-label="Adicionar aos Favoritos">
      <FaHeart className={classeDoIcone} />
    </button>
  );
}

export default BotaoFavorito;