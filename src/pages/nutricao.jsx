import produtos from '../data/produtos';
import ProdutoCard from '../components/ProdutoCard';

export default function Nutricao() {
  return (
    <main className="container mt-4">
      <h2>Dieta & Nutrição</h2>
      <div className="row">
        {produtos.nutricao.map((produto) => (
          <div className="col-6 col-md-4 col-lg-3  mb-4" key={produto.id}>
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
    </main>
  );
}
