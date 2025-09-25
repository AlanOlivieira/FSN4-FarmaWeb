import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaHome, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EnderecoPage() {
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    carregarEnderecos();
  }, []);

  const carregarEnderecos = async () => {
    try {
      const res = await api.get("/enderecos");
      setEnderecos(res.data);
    } catch (err) {
      console.error("Erro ao carregar endereços", err);
    }
  };

  const handleSelecionarEndereco = (id) => {
    setEnderecoSelecionado(id);
  };

  const handleCadastrarEndereco = async (e) => {
    e.preventDefault();
    try {
      await api.post("/enderecos", novoEndereco);
      setShowForm(false);
      setNovoEndereco({
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      });
      carregarEnderecos();
    } catch (err) {
      console.error("Erro ao cadastrar endereço", err);
    }
  };

  const handleContinuar = () => {
    if (!enderecoSelecionado) {
      alert("Selecione um endereço para prosseguir.");
      return;
    }
    navigate("/pagamentos", { state: { enderecoId: enderecoSelecionado } });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary d-flex align-items-center gap-2">
        <FaMapMarkerAlt /> Escolha o Endereço de Entrega
      </h2>

      <div className="row">
        {enderecos.map((end) => (
          <div key={end.id} className="col-md-6 mb-4">
            <div
              className={`card shadow-sm ${
                enderecoSelecionado === end.id ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelecionarEndereco(end.id)}
            >
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2">
                  <FaHome /> {end.rua}, {end.numero}
                </h5>
                <p className="card-text mb-1">
                  {end.bairro} - {end.cidade}/{end.estado}
                </p>
                <p className="card-text">
                  CEP: <strong>{end.cep}</strong>
                </p>
                {end.complemento && (
                  <p className="card-text text-muted">
                    Complemento: {end.complemento}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-outline-primary d-flex align-items-center gap-2 mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        <FaPlus /> Cadastrar novo endereço
      </button>

      {showForm && (
        <form
          className="card shadow-sm p-4 mb-4"
          onSubmit={handleCadastrarEndereco}
        >
          <h5 className="mb-3 text-primary">Novo Endereço</h5>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label className="form-label">Rua</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.rua}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, rua: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Número</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.numero}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, numero: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Bairro</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.bairro}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, bairro: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Complemento</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.complemento}
                onChange={(e) =>
                  setNovoEndereco({
                    ...novoEndereco,
                    complemento: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Cidade</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.cidade}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, cidade: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Estado</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.estado}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, estado: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">CEP</label>
              <input
                type="text"
                className="form-control"
                value={novoEndereco.cep}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, cep: e.target.value })
                }
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Salvar Endereço
          </button>
        </form>
      )}

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleContinuar}
          disabled={!enderecoSelecionado}
        >
          Continuar para Pagamento →
        </button>
      </div>
    </div>
  );
}
