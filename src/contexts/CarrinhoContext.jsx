import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarProduto(produto) {
    setCarrinho((prev) => {
      const produtoExistente = prev.find((p) => p.id === produto.id);

      if (produtoExistente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  }

  function removerProduto(id) {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }

  function diminuirQuantidade(id) {
    setCarrinho((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
        )
        .filter((p) => p.quantidade > 0) 
    );
  }

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto,
        diminuirQuantidade,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
