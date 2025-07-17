import ProdutoCard from '../components/ProdutoCard';
import produtosDestaque from '../data/produtosDestaque';
import MeuCarrossel from '../components/Carousel';

export default function Home() {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <MeuCarrossel />

      <main className="container mt-4">
        <h2>Produtos em destaque</h2>
        <div className="row">
          {produtosDestaque.map((produto) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={produto.id}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
