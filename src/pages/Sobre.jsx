import React, { useState } from 'react';
import { Container, Row, Col, Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sobre.css';

export default function Sobre() {
  const [activeValue, setActiveValue] = useState(null);
  


  const toggleValueCard = (index) => {
    setActiveValue(activeValue === index ? null : index);
  };



  return (
    <div className="sobre-container">
      <div 
        className="fullscreen-background"
        role="img"
        aria-label="Fundo abstrato representando saúde e bem-estar"
      ></div>

      <div className="content-overlay">
        <Container className="py-5">
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="main-title">SOBRE NÓS</h1>
              <p className="subtitle">Conheça nossa história e nosso compromisso com sua saúde e bem-estar</p>
            </Col>
          </Row>

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
<Row className="section-content">
  <Col className="text-center">
    <h2 className="section-header">Nossos Valores</h2>
    <div className="values-grid">
      {[
        { 
          title: 'Missão', 
          content: 'Aumentar a acessibilidade a medicamentos com o mais elevado padrão de qualidade.',
          icon: '✓',
          bgImage: 'public/images/missao.jpg',
          className: 'missao'
        },
        { 
          title: 'Visão', 
          content: 'Ser a empresa de referência em medicamentos genéricos e de marca com alta qualidade.',
          icon: '👁️',
          bgImage: 'public/images/visao.jpeg',
          className: 'visao'
        },
        { 
          title: 'Valores', 
          content: 'Qualidade, Integridade, Respeito, Transparência, Colaboração e Criatividade.',
          icon: '❤️',
          bgImage: 'public/images/valores.jpg',
          className: 'valores'
        }
      ].map((value, index) => (
        <div 
          className={`value-card ${value.className}`}
          key={index}
          onMouseEnter={() => setActiveValue(index)}
          onMouseLeave={() => setActiveValue(null)}
          style={{ backgroundImage: `url(${value.bgImage})` }}
        >
          {activeValue === index && (
            <div className="value-content">
              <div className="value-icon">{value.icon}</div>
              <h4>{value.title}</h4>
              <p>{value.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </Col>
</Row>

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

        </Container>
      </div>

      
    
    </div>
  );
}