import React from "react";
import { useParams } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import produtos from "../data/produtos"; //
import BotaoCarrinho from "../components/BotaoCarrinho";

export default function DetalheProduto() {
  const { id } = useParams();
  const { adicionarProduto } = useCarrinho();

  const produto = produtos.medicamentos.find(p => p.id === parseInt(id));

  if (!produto) {
    return <p className="text-center mt-5">Produto não encontrado</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-start">
        <div className="col-md-5 text-center">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="img-fluid"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-7">
          <h2>{produto.nome}</h2>
          <p className="text-muted">{produto.descricao}</p>
          <h4 className="text-primary">R$ {produto.preco.toFixed(2)}</h4>

          <div className="mt-4">
            <BotaoCarrinho onClick={() => adicionarProduto(produto)} />
          </div>
        </div>
      </div>
    </div>
  );
}
