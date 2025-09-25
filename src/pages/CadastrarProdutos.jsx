import { useState, useEffect } from "react";
import api from "../services/api";
import "./CadastrarProdutos.css";

export default function CadastroProduto() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    qtd_estoque: "",
    categoria_id: "",
    data_validade: "",
    prescricao: false,
    imagemPrincipal: "",
    imagensGaleria: "",
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await api.get("/categorias");
        setCategorias(res.data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    }
    fetchCategorias();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        nome: form.nome,
        descricao: form.descricao,
        preco: parseFloat(form.preco),
        qtd_estoque: parseInt(form.qtd_estoque),
        categoria_id: parseInt(form.categoria_id),
        data_validade: form.data_validade || null,
        prescricao: form.prescricao,
        imagemPrincipal: form.imagemPrincipal || null,
        imagensGaleria: form.imagensGaleria
          ? form.imagensGaleria.split(",").map((url) => url.trim())
          : [],
      };

      const res = await api.post("/produtos", payload);
      console.log("Produto cadastrado:", res.data);
      alert("Produto cadastrado com sucesso");

      setForm({
        nome: "",
        descricao: "",
        preco: "",
        qtd_estoque: "",
        categoria_id: "",
        data_validade: "",
        prescricao: false,
        imagemPrincipal: "",
        imagensGaleria: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
      alert("Erro ao cadastrar produto.");
    }
  }

  return (
    <div className="cp-container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit} className="cp-form">
        <div className="cp-form-group">
          <label>Nome</label>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
        </div>

        <div className="cp-form-group">
          <label>Descrição</label>
          <textarea name="descricao" value={form.descricao} onChange={handleChange} />
        </div>

        <div className="cp-form-group">
          <label>Preço</label>
          <input type="number" step="0.01" name="preco" value={form.preco} onChange={handleChange} required />
        </div>

        <div className="cp-form-group">
          <label>Qtd. Estoque</label>
          <input type="number" name="qtd_estoque" value={form.qtd_estoque} onChange={handleChange} required />
        </div>

        <div className="cp-form-group">
          <label>Categoria</label>
          <select name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="cp-form-group">
          <label>Data de Validade</label>
          <input type="date" name="data_validade" value={form.data_validade} onChange={handleChange} />
        </div>

        <div className="cp-form-group">
          <label>Imagem Principal (URL)</label>
          <input type="text" name="imagemPrincipal" value={form.imagemPrincipal} onChange={handleChange} />
        </div>

        <div className="cp-form-group">
          <label>Imagens da Galeria (URLs separadas por vírgula)</label>
          <input type="text" name="imagensGaleria" value={form.imagensGaleria} onChange={handleChange} />
        </div>

        <div className="cp-form-group cp-checkbox-group">
          <input type="checkbox" name="prescricao" checked={form.prescricao} onChange={handleChange} />
          <label>Requer Prescrição?</label>
        </div>

        <button type="submit" className="cp-btn-submit">Cadastrar Produto</button>
      </form>
    </div>
  );
}
