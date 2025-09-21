// contexts/CarrinhoContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarProduto = useCallback((produto) => {
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
  }, []);

  const removerProduto = useCallback((id) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const diminuirQuantidade = useCallback((id) => {
    setCarrinho((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p))
        .filter((p) => p.quantidade > 0)
    );
  }, []);

  const limparCarrinho = useCallback(() => {
    setCarrinho([]);
  }, []);

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
        limparCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
};