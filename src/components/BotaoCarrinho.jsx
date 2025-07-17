import React from 'react';

export default function BotaoCarrinho({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#003366',
        border: 'none',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'white',
        fontSize: '22px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#002244'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#003366'}
      aria-label="Adicionar à cesta"
    >
      <i className="bi bi-cart-plus"></i>
    </button>
  );
}
