import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProdutoCard from '../components/ProdutoCard';
import produtosObjeto from '../data/produtos';

export default function PaginaDePesquisa() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const todosOsProdutos = Object.values(produtosObjeto).flat();

    if (query) {
      const produtosFiltrados = todosOsProdutos.filter((produto) =>
        produto.nome.toLowerCase().includes(query.toLowerCase())
      );
      setResultados(produtosFiltrados);
    } else {
      setResultados([]);
    }
  }, [query]);

  return (
    <div className="container my-5 search-results-container">
      <h2 className="mb-4">
        Resultados da busca por: <span className="text-primary">"{query}"</span>
      </h2>

      {resultados.length > 0 ? (
        <div className="row">
          {resultados.map((produto) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={produto.id}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado para esta busca.</p>
      )}
    </div>
  );
}