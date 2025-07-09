import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarProduto(produto) {
    setCarrinho((prev) => [...prev, produto]);
  }

  function removerProduto(id) {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarProduto, removerProduto }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
