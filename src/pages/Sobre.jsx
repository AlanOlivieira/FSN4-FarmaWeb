import React, { useState } from 'react';
import { Container, Row, Col, Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sobre.css';

export default function Sobre() {
  // Estados para a seção de valores
  const [activeValue, setActiveValue] = useState(null);
  
  // Estados para o formulário de contato
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Função para alternar cards de valores
  const toggleValueCard = (index) => {
    setActiveValue(activeValue === index ? null : index);
  };

  // Funções para controlar o modal
  const handleShowContactModal = () => {
    setShowContactModal(true);
    setSubmitStatus(null);
    setFormErrors({});
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\d{10,11})$/;

    if (!formData.name.trim()) {
      errors.name = 'Por favor, insira seu nome';
    } else if (formData.name.length < 3) {
      errors.name = 'O nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'Por favor, insira seu e-mail';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Por favor, insira um e-mail válido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Por favor, insira seu telefone';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Por favor, insira um telefone válido (10 ou 11 dígitos)';
    }

    if (!formData.message.trim()) {
      errors.message = 'Por favor, insira sua mensagem';
    } else if (formData.message.length < 10) {
      errors.message = 'A mensagem deve ter pelo menos 10 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manipulação de mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (digits.length <= 2) {
        formattedValue = digits;
      } else if (digits.length <= 6) {
        formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
      }
      
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulação de chamada API (substitua por sua API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemplo de chamada real (descomente e adapte):
      /*
      const response = await fetch('https://sua-api.com/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Erro ao enviar');
      */
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setShowContactModal(false), 3000);
    } catch (error) {
      console.error('Erro:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sobre-container">
      {/* Imagem de fundo */}
      <div 
        className="fullscreen-background"
        role="img"
        aria-label="Fundo abstrato representando saúde e bem-estar"
      ></div>

      {/* Conteúdo principal */}
      <div className="content-overlay">
        <Container className="py-5">
          {/* Seção cabeçalho */}
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="main-title">SOBRE NÓS</h1>
              <p className="subtitle">Conheça nossa história e nosso compromisso com sua saúde e bem-estar</p>
            </Col>
          </Row>

          {/* Seção estatísticas */}
          <Row className="stats-section py-4 mb-5">
            {[
              { value: '10+', label: 'Anos no mercado' },
              { value: '50K+', label: 'Clientes satisfeitos' },
              { value: '100+', label: 'Parcerias' },
              { value: '24/7', label: 'Atendimento' }
            ].map((stat, index) => (
              <Col md={3} key={index} className="text-center">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </Col>
            ))}
          </Row>

          {/* Seção história */}
          <Row className="mb-5 section-content">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="image-wrapper">
                <img
                  src="public/images/nossaHistoria.jpg"
                  alt="Equipe FarmaWeb atendendo"
                  className="img-fluid rounded-lg shadow"
                  loading="lazy"
                />
              </div>
            </Col>
            <Col md={6}>
              <h2 className="section-header">Nossa História</h2>
              <div className="text-content">
                <p>A Pharma nasceu em 2010 com a missão de fornecer produtos farmacêuticos de qualidade a preços acessíveis. Começamos como uma pequena farmácia de bairro e hoje somos referência no mercado online.</p>
                <p>Nosso compromisso é com a saúde e bem-estar de nossos clientes, oferecendo sempre os melhores produtos e atendimento especializado.</p>
                <p>Em 2015, expandimos para o comércio eletrônico, levando nossa qualidade e atendimento para todo o país. Hoje, contamos com um centro de distribuição moderno e uma equipe altamente qualificada.</p>
              </div>
            </Col>
          </Row>

          {/* Seção time */}
          <Row className="mb-5 section-content">
            <Col className="text-center">
              <h2 className="section-header">Nosso Time</h2>
              <p className="section-description">Profissionais qualificados comprometidos com seu bem-estar</p>
            </Col>
          </Row>

          <Row className="team-gallery">
            {[
              {
                name: 'Dra. Ana Clara Silva',
                role: 'Farmacêutica Chefe',
                image: 'public/images/person_1.jpg',
                bio: 'Formada pela USP com especialização em Farmácia Clínica. 15 anos de experiência.'
              },
              {
                name: 'Carlos Eduardo Lima',
                role: 'Gerente de Atendimento ao Cliente',
                image: 'public/images/person_3.jpg',
                bio: 'Especialista em experiência do cliente com MBA em Gestão de Serviços.'
              },
              {
                name: 'Fernanda Ribeiro',
                role: 'Especialista em Marketing Digital',
                image: 'public/images/person_5.jpg',
                bio: 'Expert em e-commerce farmacêutico e certificada pelo Google Ads.'
              }
            ].map((member, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="team-card">
                  <div className="card-image">
                    <img
                      src={member.image}
                      alt={`Membro da equipe ${member.name}`}
                      className="img-fluid rounded-circle"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-body-title">{member.name}</h4>
                    <p className="card-body-role">{member.role}</p>
                    <div className="card-body-bio">{member.bio}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Seção valores */}
          <Row className="section-content">
            <Col className="text-center">
              <h2 className="section-header">Nossos Valores</h2>
              <div className="values-grid">
                {[
                  { 
                    title: 'Missão', 
                    description: 'Aumentar a acessibilidade de pacientes e profissionais de saúde, a medicamentos genéricos e de marca, com o mais elevado padrão de qualidade.', 
                    className: 'missao',
                    icon: '✓',
                    bgImage: 'public/images/missao.jpg'
                  },
                  { 
                    title: 'Visão', 
                    description: 'Ser a empresa de referência para profissionais de saúde e pacientes em medicamentos genéricos e de marca com alta qualidade.', 
                    className: 'visao',
                    icon: '👁️',
                    bgImage: 'public/images/visao.jpeg'
                  },
                  { 
                    title: 'Valores', 
                    description: 'Nossa empresa possui valores baseados na Qualidade, Integridade, Respeito, Transparência, Colaboração e Criatividade.', 
                    className: 'valores',
                    icon: '❤️',
                    bgImage: 'public/images/valores.jpg'
                  }
                ].map((value, index) => (
                  <div 
                    className={`value-card ${value.className}`} 
                    key={value.title}
                    onClick={() => toggleValueCard(index)}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${value.bgImage})` }}
                  >
                    <div className="value-icon">{value.icon}</div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          {/* Seção serviços */}
          <Row className="mb-5 section-content">
            <Col className="text-center">
              <h2 className="section-header">Nossos Serviços</h2>
              <p className="section-description">Oferecemos uma ampla gama de serviços para atender às suas necessidades de saúde</p>
            </Col>
          </Row>

          <Row className="services-gallery">
            {[
              {
                title: 'Consultoria Farmacêutica',
                description: 'Orientação especializada sobre medicamentos e tratamentos.',
                image: 'public/images/farmaceutico-de-tiro-medio-ajudando-paciente.jpg',
                features: ['Prescrição segura', 'Interações medicamentosas', 'Dosagem personalizada']
              },
              {
                title: 'Entrega Rápida',
                description: 'Receba seus medicamentos no conforto da sua casa.',
                image: 'public/images/entregador-recebendo-o-pacote-para-entrega.jpg',
                features: ['Entrega em até 2h', 'Rastreamento online', 'Embalagem discreta']
              },
              {
                title: 'Acompanhamento de Tratamento',
                description: 'Suporte contínuo para garantir a eficácia do seu tratamento.',
                image: 'public/images/medico-de-tiro-medio-falando-com-o-paciente (1).jpg',
                features: ['Lembretes de medicação', 'Ajuste de dosagem', 'Relatórios periódicos']
              }
            ].map((service, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="service-card">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-fluid rounded-lg"
                    loading="lazy"
                  />
                  <div className="service-card-body">
                    <h4 className="service-title">{service.title}</h4>
                    <p className="service-description">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Seção depoimentos */}
          <Row className="mb-5 section-content">
            <Col className="text-center">
              <h2 className="section-header">Depoimentos</h2>
              <p className="section-description">O que nossos clientes dizem sobre nós</p>
            </Col>
          </Row>

          <Row className="testimonials-gallery">
            {[
              {
                name: 'João da Silva',
                testimonial: 'A Pharma sempre me atendeu com excelência. Quando precisei de um medicamento específico, me orientaram e conseguiram em tempo recorde. Recomendo a todos!',
                image: 'public/images/homem-afro-americano-simpatico-e-simpatico-de-camisa-branca-sorriso-encantador-e-expressao-amigavel.jpg',
                rating: '★★★★★'
              },
              {
                name: 'Maria Oliveira',
                testimonial: 'Ótimo atendimento e entrega rápida. Comprei um medicamento de uso contínuo e chegou antes do previsto, muito bem embalado. Estou muito satisfeita!',
                image: 'public/images/amigavel-sorridente-mulher-morena-pronta-para-ajudar-e-ajudar-de-maos-dadas-e-parecendo-agradavel-de-pe-na-camiseta-contra-o-fundo-branco.jpg',
                rating: '★★★★☆'
              },
              {
                name: 'Carlos Santos',
                testimonial: 'Profissionais competentes e sempre prontos para ajudar. Tive dúvidas sobre interação medicamentosa e me explicaram tudo com paciência e clareza.',
                image: 'public/images/retrato-de-pessoa-sabia.jpg',
                rating: '★★★★★'
              }
            ].map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4 d-flex">
                <div className="testimonial-card w-100">
                  <div className="testimonial-image-container">
                    <img
                      src={testimonial.image}
                      alt={`Depoimento de ${testimonial.name}`}
                      className="img-fluid rounded-circle testimonial-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="testimonial-rating">{testimonial.rating}</div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-text">"{testimonial.testimonial}"</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* CTA Final */}
          <Row className="mb-5 section-content">
            <Col className="text-center">
              <h2 className="section-header">Pronto para cuidar da sua saúde?</h2>
              <p className="section-description mb-4">
                Nossa equipe está pronta para te atender com todo cuidado e profissionalismo
              </p>
              <button 
                className="btn btn-primary btn-lg" 
                onClick={handleShowContactModal}
              >
                Fale Conosco
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal de Fale Conosco */}
      <Modal show={showContactModal} onHide={handleCloseContactModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Fale Conosco</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitStatus === 'success' && (
            <Alert variant="success" className="text-center">
              <Alert.Heading>Mensagem enviada com sucesso!</Alert.Heading>
              <p>Entraremos em contato em breve. Obrigado!</p>
            </Alert>
          )}
          
          {submitStatus === 'error' && (
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Erro ao enviar mensagem</Alert.Heading>
              <p>Por favor, tente novamente mais tarde.</p>
            </Alert>
          )}
          
          {!submitStatus && (
            <Row>
              <Col md={6}>
                <div className="contact-info">
                  <h4>Informações de Contato</h4>
                  <ul className="contact-list">
                    <li>
                      <i className="bi bi-telephone"></i>
                      <span>(85) 99999-9999</span>
                    </li>
                    <li>
                      <i className="bi bi-whatsapp"></i>
                      <span>(11) 98765-4321</span>
                    </li>
                    <li>
                      <i className="bi bi-envelope"></i>
                      <span>contato@pharmaweb.com.br</span>
                    </li>
                    <li>
                      <i className="bi bi-geo-alt"></i>
                      <span>Av. Exemplo, 123, Fortaleza, CE</span>
                    </li>
                  </ul>
                  
                  <div className="social-media mt-4">
                    <h5>Redes Sociais</h5>
                    <div className="social-icons">
                      <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                      <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                      <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                      <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome Completo *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-mail *</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Telefone *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      isInvalid={!!formErrors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Mensagem *</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="ms-2">Enviando...</span>
                        </>
                      ) : 'Enviar Mensagem'}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}