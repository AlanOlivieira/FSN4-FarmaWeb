import "./pagination.css"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import produtos from '../data/produtos';
import ProdutoCard from '../components/ProdutoCard';


export default function Beleza() {
const [currentPage, setCurrentPage] = useState(0)
  const data = produtos.beleza
  const itemsPerPage = 10

  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
  }

  const offset = currentPage * itemsPerPage
  const currentData = data.slice(offset, offset + itemsPerPage)

  const pageCount = Math.ceil(data.length / itemsPerPage)


  return (
    <main className="container mt-4">
      <h2>Cuidados e Beleza</h2>
      <div className="mb-4">
        <img
          src="/images/promosj.jpeg"
          alt="Anúncio Cuidados e Beleza"
          className="img-fluid"
          style={{
          display: 'block',   
          margin: '0 auto',      
          width: '100%',          
          maxWidth: '900px',     
         height: 'auto',         
       }}
        />
      </div>
      <div className="row">
        {currentData.map((produto) => (
          <div className="col-6 col-md-4 col-lg-3  mb-4" key={produto.id}>
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Proximo"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </main>
  );
}
