import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MenuLateral from '../components/MinhaConta/MenuLateral';
import AbaDados from '../components/MinhaConta/AbaDados';
import AbaHistorico from '../components/MinhaConta/AbaHistorico';
import AbaAcompanhamento from '../components/MinhaConta/AbaAcompanhamento';
import AbaAjuda from '../components/MinhaConta/AbaAjuda';

function MinhaConta() {
  const { currentUser, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dados');
  const [editMode, setEditMode] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [formData, setFormData] = useState({
    nome: currentUser?.nome || '',
    email: currentUser?.email || '',
    telefone: currentUser?.telefone || '',
    dataNascimento: currentUser?.dataNascimento || '',
    cpf: currentUser?.cpf || ''
  });

  // Dados de perguntas frequentes
  const [faqs] = useState([
    {
      pergunta: "Como faço para rastrear meu pedido?",
      resposta: "Você pode rastrear seu pedido nesta mesma página, na aba 'Acompanhamento de Pedidos'. Lá você encontrará o código de rastreio e o status atual da entrega."
    },
    {
      pergunta: "Qual o prazo de entrega?",
      resposta: "O prazo de entrega varia conforme sua localidade. Em geral, as entregas são realizadas em até 7 dias úteis para a maioria das regiões."
    },
    {
      pergunta: "Posso alterar o endereço de entrega?",
      resposta: "Sim, é possível alterar o endereço de entrega desde que o pedido ainda não tenha sido enviado para a transportadora. Entre em contato conosco o mais rápido possível."
    },
    {
      pergunta: "O que fazer se meu pedido não chegou?",
      resposta: "Se o prazo de entrega estiver esgotado, entre em contato conosco pelo e-mail suporte@farmaweb.com.br ou pelo telefone (11) 3333-3333 para investigarmos a situação."
    },
    {
      pergunta: "Como devolver um produto?",
      resposta: "Entre em contato conosco dentro do prazo de 7 dias após o recebimento para solicitar a devolução. O produto deve estar na embalagem original e com nota fiscal."
    },
    {
      pergunta: "Quais as formas de pagamento aceitas?",
      resposta: "Aceitamos cartões de crédito (em até 12x), débito, PIX e boleto bancário."
    }
  ]);

  // Estado para a pergunta selecionada no FAQ
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    // Carregar pedidos do localStorage
    const pedidosSalvos = localStorage.getItem('pedidosUsuario');
    if (pedidosSalvos) {
      try {
        const pedidosData = JSON.parse(pedidosSalvos);
        // Filtrar pedidos apenas do usuário atual
        const usuarioPedidos = pedidosData.filter(pedido => 
          pedido.usuarioId === currentUser.id
        );
        setPedidos(usuarioPedidos);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      nome: currentUser.nome,
      email: currentUser.email,
      telefone: currentUser.telefone || '',
      dataNascimento: currentUser.dataNascimento || '',
      cpf: currentUser.cpf
    });
    setEditMode(false);
  };

  // Função para simular status de entrega (em um sistema real, viria da API)
  const getStatusEntrega = (dataPedido) => {
    const data = new Date(dataPedido);
    const hoje = new Date();
    const diffTime = Math.abs(hoje - data);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays <= 1) return { status: "Processando", texto: "Seu pedido está sendo preparado para envio.", icone: "bi bi-clock-history" };
    if (diffDays <= 3) return { status: "Em trânsito", texto: "Seu pedido saiu para entrega.", icone: "bi bi-truck" };
    if (diffDays <= 5) return { status: "Saiu para entrega", texto: "Seu pedido está a caminho. Aguarde o entregador.", icone: "bi bi-geo-alt" };
    return { status: "Entregue", texto: "Seu pedido foi entregue com sucesso.", icone: "bi bi-check-circle" };
  };

  // Função para gerar código de rastreio fictício
  const gerarCodigoRastreio = (numeroPedido) => {
    return "FW" + numeroPedido.substring(2) + "BR";
  };

  if (!currentUser) {
    return <div>Por favor, faça login para acessar esta página.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <MenuLateral activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
        
        <div className="col-md-9">
          {activeTab === 'dados' && (
            <AbaDados
              currentUser={currentUser}
              editMode={editMode}
              setEditMode={setEditMode}
              formData={formData}
              handleChange={handleChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          )}
          
          {activeTab === 'historico' && (
            <AbaHistorico pedidos={pedidos} />
          )}

          {activeTab === 'acompanhamento' && (
            <AbaAcompanhamento
              pedidos={pedidos}
              getStatusEntrega={getStatusEntrega}
              gerarCodigoRastreio={gerarCodigoRastreio}
            />
          )}

          {activeTab === 'ajuda' && (
            <AbaAjuda
              faqs={faqs}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MinhaConta;