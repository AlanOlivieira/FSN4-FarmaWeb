import "./pagination.css";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ProdutoCard from "../components/ProdutoCard";
import api from "../services/api";

export default function Nutricao() {
  const [produtos, setProdutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    api.get("/produtos")
      .then((res) => {
        const filtrados = res.data.filter(
          (p) => p.categoria?.nome?.toLowerCase() === "nutrição"
        );
        setProdutos(filtrados);
      })
      .catch((err) => console.error("Erro ao carregar produtos", err));
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentData = produtos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(produtos.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <main className="container mt-4">
      <h2>Dieta & Nutrição</h2>
      <div className="row">
        {currentData.map((produto) => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={produto.id}>
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </main>
  );
}
