import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function TelaVendas() {
  const [dadosVendas, setDadosVendas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [vendedor, setVendedor] = useState({
    nome: "",
    email: "",
    password: "",
    telefone: ""
  });
  const [mensagem, setMensagem] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    setDadosVendas([
      { mes: "Jan", vendas: 120, cancelamentos: 15 },
      { mes: "Fev", vendas: 200, cancelamentos: 30 },
      { mes: "Mar", vendas: 150, cancelamentos: 25 },
      { mes: "Abr", vendas: 180, cancelamentos: 10 },
      { mes: "Mai", vendas: 220, cancelamentos: 35 },
    ]);

    setFavoritos([
      { nome: "Dipirona", favoritos: 45 },
      { nome: "Paracetamol", favoritos: 30 },
      { nome: "Ibuprofeno", favoritos: 60 },
      { nome: "Omeprazol", favoritos: 25 },
      { nome: "Vitamina C", favoritos: 40 },
    ]);
  }, []);

  const cores = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

  const handleChange = (e) => {
    setVendedor({ ...vendedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/cadastro-vendedor", vendedor);
      setMensagem("Vendedor cadastrado com sucesso");
      setVendedor({ nome: "", email: "", password: "", telefone: "" });
    } catch (err) {
      setMensagem("Erro ao cadastrar vendedor" + (err.response?.data?.error || err.message));
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
    return <h3>Acesso negado. Apenas administradores podem ver esta página.</h3>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Painel do Administrador</h2>

      <Tabs defaultActiveKey="vendas" id="dashboard-tabs" className="mb-3">
        <Tab eventKey="vendas" title="Vendas x Cancelamentos">
          <BarChart width={700} height={350} data={dadosVendas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendas" fill="#28a745" name="Vendas" />
            <Bar dataKey="cancelamentos" fill="#dc3545" name="Cancelamentos" />
          </BarChart>
        </Tab>

        <Tab eventKey="tendencia" title="Tendência de Vendas">
          <LineChart width={700} height={300} data={dadosVendas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="vendas" stroke="#007bff" name="Vendas" />
            <Line type="monotone" dataKey="cancelamentos" stroke="#ff5733" name="Cancelamentos" />
          </LineChart>
        </Tab>

        <Tab eventKey="favoritos" title="Produtos Favoritados">
          <PieChart width={600} height={400}>
            <Pie
              data={favoritos}
              dataKey="favoritos"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {favoritos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Tab>

        <Tab eventKey="cadastro" title="Cadastrar Vendedor">
          <form onSubmit={handleSubmit} style={{ maxWidth: "500px", marginTop: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label>Nome</label>
              <input type="text" name="nome" value={vendedor.nome} onChange={handleChange} required className="form-control" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Email</label>
              <input type="email" name="email" value={vendedor.email} onChange={handleChange} required className="form-control" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Telefone</label>
              <input type="text" name="telefone" value={vendedor.telefone} onChange={handleChange} required className="form-control" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Senha</label>
              <input type="password" name="password" value={vendedor.password} onChange={handleChange} required className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
          {mensagem && <p style={{ marginTop: "10px" }}>{mensagem}</p>}
        </Tab>
      </Tabs>
    </div>
  );
}
