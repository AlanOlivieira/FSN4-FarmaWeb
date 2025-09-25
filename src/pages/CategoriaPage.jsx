import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function CategoriaPage() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/categorias/slug/${slug}`)
      .then(res => setCategoria(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (!categoria) return <div className="container mt-4">Categoria não encontrada</div>;

  return (
    <div className="container mt-4">
      <h2>{categoria.nome}</h2>
      <div className="row">
        {categoria.produtos.map((p) => (
          <div key={p.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={p.imagemPrincipal || "/images/placeholder.png"} className="card-img-top" alt={p.nome} />
              <div className="card-body">
                <h5 className="card-title">{p.nome}</h5>
                <p className="card-text">{p.descricao}</p>
                <strong>R$ {Number(p.preco).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))}
        {categoria.produtos.length === 0 && <p>Nenhum produto nesta categoria.</p>}
      </div>
    </div>
  );
}
