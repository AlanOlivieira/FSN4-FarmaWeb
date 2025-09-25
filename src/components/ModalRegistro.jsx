import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ModalRegistro({ show, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    nome: '', 
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      complemento: '' 
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.endereco) {
      setFormData(prev => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    try {
      setError('');
      setLoading(true);
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      onClose();
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: 'white', padding: '25px', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', position: 'relative', overflowY: 'auto', maxHeight: '90vh' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}>×</button>

        <h2 style={{ marginBottom: '20px', color: '#003366' }}>Criar uma Conta</h2>

        {error && <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Nome Completo *</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Telefone *</label>
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Rua *</label>
          <input type="text" name="rua" value={formData.endereco.rua} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Número *</label>
          <input type="text" name="numero" value={formData.endereco.numero} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Bairro *</label>
          <input type="text" name="bairro" value={formData.endereco.bairro} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Cidade *</label>
          <input type="text" name="cidade" value={formData.endereco.cidade} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Estado *</label>
          <input type="text" name="estado" value={formData.endereco.estado} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>CEP *</label>
          <input type="text" name="cep" value={formData.endereco.cep} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Complemento</label>
          <input type="text" name="complemento" value={formData.endereco.complemento} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }} />

          <label>Senha *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />

          <label>Confirmar Senha *</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={{ width: '100%', marginBottom: '15px' }} />

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: '4px' }}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p>Já tem uma conta? <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: '#0052b4', cursor: 'pointer', textDecoration: 'underline' }}>Fazer login</button></p>
        </div>
      </div>
    </div>
  );
}

export default ModalRegistro;
