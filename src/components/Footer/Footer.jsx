import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const anoAtual = new Date().getFullYear();
  
  // Estados para o modal de Fale Conosco
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setSubmitStatus(null);
    setFormErrors({});
  };

  const handleShowContactModal = () => setShowContactModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'E-mail inválido';
    }
    if (!formData.phone.trim()) errors.phone = 'Telefone é obrigatório';
    if (!formData.message.trim()) errors.message = 'Mensagem é obrigatória';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulando envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Limpar o formulário após o envio
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Fechar o modal automaticamente após 3 segundos
      setTimeout(() => {
        handleCloseContactModal();
      }, 3000);
    }, 1500);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="block-7">
              <h3 className="footer-heading mb-4">Sobre Nós</h3>
              <p>
                Somos uma farmácia online comprometida com sua saúde e
                bem-estar, oferecendo produtos de qualidade com os melhores
                preços.
              </p>
            </div>
          </div>
          <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
            <h3 className="footer-heading mb-4">Links Rápidos</h3>
            <ul className="list-unstyled">
              <li><Link to="/suplementos">Suplementos</Link></li>
              <li><Link to="/vitaminas">Vitaminas</Link></li>
              <li><Link to="/dieta-nutricao">Dieta & Nutrição</Link></li>
              <li><Link to="/beleza">Cuidados e beleza</Link></li>
              <li><Link to="/baby">Cuidados para bebês</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-5 mb-5">
              <h3 className="footer-heading mb-4">Informações de Contato</h3>
              <ul className="list-unstyled">
                <li className="address">Av. Exemplo, 123, Fortaleza, CE</li>
                <li className="phone">
                  <a href="tel://85999999999">(85) 99999-9999</a>
                </li>
                <li className="email">contato@pharma.com.br</li>
                <li>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleShowContactModal}
                    className="mt-3"
                  >
                    Fale Conosco
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <p>
              Copyright &copy; {anoAtual} Todos os direitos reservados | Este
              template foi feito com{" "}
              <i className="icon-heart" aria-hidden="true"></i> por{" "}
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                Colorlib
              </a>
            </p>
          </div>
        </div>
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
                      <span>contato@pharma.com.br</span>
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
    </footer>
  );
}