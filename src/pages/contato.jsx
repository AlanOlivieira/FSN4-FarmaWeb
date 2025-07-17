import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Contato() {
  return (
    <div className="py-5">
      <Container>
        {/* Seção principal de contato */}
        <Row className="mb-5">
          <Col>
            <h1 className="text-center mb-4">Entre em Contato Conosco</h1>
            <p className="text-center">
              Tem dúvidas ou precisa de ajuda? Nossa equipe está pronta para te atender.
            </p>
          </Col>
        </Row>

        {/* Seção CTA no final */}
        <Row className="mb-5 section-content bg-light p-5 rounded">
          <Col className="text-center">
            <h2 className="section-header">Pronto para cuidar da sua saúde?</h2>
            <p className="section-description mb-4">
              Nossa equipe está pronta para te atender com todo cuidado e profissionalismo
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              Fale Conosco Agora
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contato;