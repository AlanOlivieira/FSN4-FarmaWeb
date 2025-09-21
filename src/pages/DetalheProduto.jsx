import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useFavoritos } from "../contexts/FavoritosContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Button, Form, Card } from "react-bootstrap";
import api from "../services/api";
import { useEffect } from "react";

export default function DetalheProduto() {
  const { id } = useParams();
  const { adicionarProduto } = useCarrinho();
  const { adicionarFavorito } = useFavoritos();
  const [produto, setProduto] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [cep, setCep] = useState("");

  useEffect(() => {
    async function carregarProduto() {
      try {
        const res = await api.get(`/produtos/${id}`);
        setProduto(res.data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      }
    }
    carregarProduto();
  }, [id]);

  if (!produto) {
    return <p className="text-center mt-5">Carregando produto...</p>;
  }

  const imagens = [
    produto.imagemPrincipal,
    ...(produto.imagensGaleria?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="me-3 d-flex flex-column align-items-center">
              {imagens.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={produto.nome}
                  className="img-thumbnail mb-2"
                  style={{
                    cursor: "pointer",
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                  onClick={() => setImagemSelecionada(img)}
                />
              ))}
            </div>
            <div className="flex-grow-1 text-center p-3 bg-white border rounded">
              <img
                src={imagemSelecionada || produto.imagemPrincipal}
                alt={produto.nome}
                className="img-fluid"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white border rounded">
              <h5 className="text-muted">{produto.marca || "Marca"}</h5>
              <h2 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>
                {produto.nome}
              </h2>

              <h3 className="text-primary fw-bold mb-4">
                R$ {produto.preco.toFixed(2)}
              </h3>

              <div className="d-flex align-items-center gap-3 mb-4">
                <Button
                  className="px-4 py-2 fw-bold"
                  style={{
                    backgroundColor: "#0056b3",
                    borderRadius: "30px",
                    border: "none",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => adicionarProduto(produto)}
                >
                  <i className="bi bi-cart3 me-2"></i> Adicionar
                </Button>
                <Button
                  variant="outline-danger"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                  onClick={() => adicionarFavorito(produto)}
                >
                  <i className="bi bi-heart fs-4"></i>
                </Button>
              </div>

              <div>
                <h6 className="fw-bold">Informações de entrega</h6>
                <Form.Label>Calcular frete</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    style={{ maxWidth: "200px" }}
                  />
                  <Button
                    variant="outline-secondary"
                    style={{
                      borderRadius: "20px",
                      padding: "0 20px",
                      fontWeight: "bold",
                    }}
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="p-4 bg-white border rounded">
              <h4 className="fw-bold">Descrição</h4>
              <p className="text-muted">
                {produto.descricao || "Informações detalhadas do produto em breve."}
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h4 className="fw-bold mb-3">Produtos relacionados</h4>
            <div className="d-flex overflow-auto gap-3">
              {produto.categoria?.produtos
                ?.filter((p) => p.id !== produto.id)
                .slice(0, 6)
                .map((p) => (
                  <Card key={p.id} style={{ minWidth: "200px" }}>
                    <Card.Img
                      variant="top"
                      src={p.imagemPrincipal || "/images/produto-placeholder.png"}
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title className="fs-6">{p.nome}</Card.Title>
                      <Card.Text className="fw-bold text-primary">
                        R$ {p.preco.toFixed(2)}
                      </Card.Text>
                      <Button
                        variant="outline-primary"
                        href={`/produto/${p.id}`}
                        className="w-100"
                      >
                        Ver Produto
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
