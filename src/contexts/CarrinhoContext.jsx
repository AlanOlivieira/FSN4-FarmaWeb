import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const CarrinhoContext = createContext(undefined);

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState(null);
  const [itens, setItens] = useState([]);
  const [usuarioId] = useState(1);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const res = await api.get(`/carrinhos/usuario/${usuarioId}`);
        if (res.data.length > 0) {
          setCarrinho(res.data[0]);
          const itensOrdenados = [...(res.data[0].itenscarrinho || [])].sort((a, b) => a.id - b.id);
          setItens(itensOrdenados);
        } else {
          const novoCarrinho = await api.post("/carrinhos", { usuario_id: usuarioId });
          setCarrinho(novoCarrinho.data);
          setItens([]);
        }
      } catch (err) {
        console.error("Erro ao carregar carrinho:", err);
      }
    }
    carregarCarrinho();
  }, [usuarioId]);

  const adicionarProduto = async (produto) => {
    if (!carrinho) return;
    try {
      await api.post("/itens-carrinho", {
        carrinho_id: carrinho.id,
        produto_id: produto.id,
        quantidade: 1,
      });
      atualizarItens(carrinho.id);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  const removerProduto = async (itemId) => {
    try {
      await api.delete(`/itens-carrinho/${itemId}`);
      atualizarItens(carrinho.id);
    } catch (err) {
      console.error("Erro ao remover produto:", err);
    }
  };

  const diminuirQuantidade = async (item) => {
    try {
      if (item.quantidade === 1) {
        const confirmar = window.confirm("Deseja realmente remover este produto do carrinho?");
        if (!confirmar) return;
        await api.delete(`/itens-carrinho/${item.id}`);
      } else {
        await api.put(`/itens-carrinho/${item.id}/diminuir`);
      }
      atualizarItens(carrinho.id);
    } catch (err) {
      console.error("Erro ao diminuir quantidade:", err);
    }
  };

  const limparCarrinho = async () => {
    try {
      const itensCarrinho = await api.get(`/itens-carrinho/carrinho/${carrinho.id}`);
      for (let item of itensCarrinho.data) {
        await api.delete(`/itens-carrinho/${item.id}`);
      }
      atualizarItens(carrinho.id);
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };

  const finalizarCarrinho = async () => {
    try {
      const res = await api.put(`/carrinhos/${carrinho.id}/finalizar`);
      setCarrinho(res.data);
      setItens([]);
      return res.data;
    } catch (err) {
      console.error("Erro ao finalizar carrinho:", err);
    }
  };

  const atualizarItens = async (carrinhoId) => {
    try {
      const res = await api.get(`/itens-carrinho/carrinho/${carrinhoId}`);
      const itensOrdenados = [...res.data].sort((a, b) => a.id - b.id);
      setItens(itensOrdenados);
    } catch (err) {
      console.error("Erro ao atualizar itens:", err);
    }
  };

  const total = itens.reduce(
    (acc, item) => acc + item.preco_unitario * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        itens,
        adicionarProduto,
        removerProduto,
        diminuirQuantidade,
        limparCarrinho,
        finalizarCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
