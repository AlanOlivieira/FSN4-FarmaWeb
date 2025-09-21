import { useState } from "react";
import './CadastrarProdutos.css';

export default function CadastroProduto() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
    validade: "",
    prescricao: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Produto cadastrado:", form);
    // aqui entra a lógica de salvar no banco
  }

  return (
    <div className="cp-container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit} className="cp-form">
        
        <div className="cp-form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="cp-form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        
        <div className="cp-form-group">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="cp-form-group">
          <label htmlFor="estoque">Qtd. Estoque</label>
          <input
            type="number"
            id="estoque"
            name="estoque"
            value={form.estoque}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="cp-form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="medicamento">Medicamentos e Saúde</option>
            <option value="suplementos">Suplementos</option>
            <option value="vitaminas">Vitaminas</option>
            <option value="dieta">Dieta e Nutrição</option>
            <option value="beleza">Cuidados e Beleza</option>
            <option value="bebe">Cuidados para Bebês</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        
        <div className="cp-form-group">
          <label htmlFor="validade">Data de Validade</label>
          <input
            type="date"
            id="validade"
            name="validade"
            value={form.validade}
            onChange={handleChange}            
          />
        </div>

        
        <div className="cp-form-group cp-checkbox-group">
          <input
            type="checkbox"
            id="prescricao"
            name="prescricao"
            checked={form.prescricao}
            onChange={handleChange}
          />
          <label htmlFor="prescricao">Requer Prescrição?</label>
        </div>

        
        <button type="submit" className="cp-btn-submit">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
