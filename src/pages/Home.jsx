import { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";
import MeuCarrossel from "../components/Carousel";
import api from "../services/api";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/produtos")
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => console.error("Erro ao carregar produtos", err));
  }, []);

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <MeuCarrossel />

      <main className="container mt-4">
        <h2>Produtos em destaque</h2>
        <div className="row">
          {produtos.map((produto) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={produto.id}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
