import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Sobre.css';

export default function Sobre() {
  return (
    <div className="sobre-container">
      {/* Imagem de fundo fullscreen */}
      <div className="fullscreen-background"></div>

      {/* Overlay escuro para legibilidade */}
      <div className="content-overlay">
        <Container className="py-5">
          {/* Cabeçalho */}
          <Row className="mb-5 text-center">
            <Col>

              <h1 className="main-title">SOBRE NÓS</h1>
              <p className="subtitle">Conheça nossa história e nosso compromisso com sua saúde e bem-estar</p>
            </Col>
          </Row>

          {/* Seção História */}
          <Row className="mb-5 section-content">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="image-wrapper">
                <img
                  src="public/images/—Pngtree—pharmacy themed white pill bottle_13358042.jpg"
                  alt="Equipe FarmaWeb atendendo"
                  className="img-fluid rounded-lg shadow"
                />
              </div>
            </Col>
            <Col md={6}>
              <h2 className="section-header">Nossa História</h2>
              <div className="text-content">
                <p>
                  A Pharma nasceu em 2010 com a missão de fornecer produtos farmacêuticos de qualidade a preços acessíveis. Começamos como uma pequena farmácia de bairro e hoje somos referência no mercado online.
                </p>
                <p>
                  Nosso compromisso é com a saúde e bem-estar de nossos clientes, oferecendo sempre os melhores produtos e atendimento especializado.
                </p>
              </div>
            </Col>
          </Row>

          {/* Seção Time */}
          <Row className="mb-5 section-content">
            <Col className="text-center">
              <h2 className="section-header">Nosso Time</h2>
              <p className="section-description">
                Profissionais qualificados comprometidos com seu bem-estar
              </p>
            </Col>
          </Row>

          <Row className="team-gallery">
            {[
              {
                name: 'Dra. Ana Clara Silva',
                role: 'Farmacêutica Chefe',
                image: 'https://placehold.co/300x300?text=Ana+Clara'
              },
              {
                name: 'Carlos Eduardo Lima',
                role: 'Gerente de Atendimento ao Cliente',
                image: 'https://placehold.co/300x300?text=Carlos'
              },
              {
                name: 'Fernanda Ribeiro',
                role: 'Especialista em Marketing Digital',
                image: 'https://placehold.co/300x300?text=Fernanda'
              }
            ].map((member, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="team-card">
                  <div className="card-image">
                    <img
                      src={member.image}
                      alt={`Membro da equipe ${member.name}`}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-body-title">{member.name}</h4>
                    <p className="card-body-title">{member.role}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>


          {/* Seção Valores */}
          {/* Seção Valores */}
          <Row className="section-content">
            <Col className="text-center">
              <h2 className="section-header">Nossos Valores</h2>
              <div className="values-grid">
                {[
                  { title: 'Missão', description: 'Aumentar a acessibilidade de pacientes e profissionais de saúde, a medicamentos genéricos e de marca, com o mais elevado padrão de qualidade.', className: 'missao' },
                  { title: 'Visão', description: 'Ser a empresa de referência para profissionais de saúde e pacientes em medicamentos genéricos e de marca com alta qualidade.', className: 'visao' },
                  { title: 'Valores', description: 'Nossa empresa possui valores baseados na Qualidade, Integridade, Respeito, Transparência, Colaboração e Criatividade.', className: 'valores' }
                ].map((value) => (
                  <div className={`value-card ${value.className}`} key={value.title}>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>




        </Container>
      </div>
    </div>
  );
}
