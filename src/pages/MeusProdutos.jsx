import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Modal, Button, Form } from "react-bootstrap";

export default function MeusProdutos() {
  const { currentUser } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    qtd_estoque: "",
    categoria_id: "",
    imagemPrincipal: ""
  });

  useEffect(() => {
    if (!currentUser?.id || currentUser.role !== "vendedor") return;
    carregarProdutos();
  }, [currentUser]);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/produtos`);
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalEdicao = (produto) => {
    setProdutoEditando(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || "",
      preco: produto.preco,
      qtd_estoque: produto.qtd_estoque,
      categoria_id: produto.categoria_id,
      imagemPrincipal: produto.imagemPrincipal || ""
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const salvarProduto = async () => {
    try {
      await api.put(`/produtos/${produtoEditando.id}`, {
        ...formData,
        preco: Number(formData.preco),
        qtd_estoque: Number(formData.qtd_estoque),
        categoria_id: Number(formData.categoria_id)
      });
      setShowModal(false);
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao salvar produto:", err.response?.data || err.message);
    }
  };

  const deletarProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao excluir produto:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="text-center mt-5">Carregando produtos...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Meus Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="row">
          {produtos.map((p) => (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imagemPrincipal}
                  alt={p.nome}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5>{p.nome}</h5>
                  <p className="text-muted">R$ {p.preco.toFixed(2)}</p>
                  <p>Estoque: {p.qtd_estoque}</p>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => abrirModalEdicao(p)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletarProduto(p.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                name="qtd_estoque"
                value={formData.qtd_estoque}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID da Categoria</Form.Label>
              <Form.Control
                type="number"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="text"
                name="imagemPrincipal"
                value={formData.imagemPrincipal}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={salvarProduto}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
