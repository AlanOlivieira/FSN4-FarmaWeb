import React from 'react';
import produtos from '../data/produtos';
import ProdutoCard from '../components/ProdutoCard';

export default function Home() {
  return (
    <main className="container mt-4">
      <h2>Produtos em destaque</h2>
      <div className="row">
        {produtos.map((produto) => (
          <div className="col-md-4 mb-4" key={produto.id}>
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
    </main>
  );
}
