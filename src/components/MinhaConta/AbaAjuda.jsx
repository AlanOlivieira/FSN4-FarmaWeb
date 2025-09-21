import React from 'react';

const AbaAjuda = ({ faqs, activeQuestion, setActiveQuestion }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Central de Ajuda</h5>
      </div>
      <div className="card-body">
        <div className="accordion" id="accordionAjuda">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${activeQuestion === index ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  {faq.pergunta}
                </button>
              </h2>
              <div 
                id={`collapse${index}`} 
                className={`accordion-collapse collapse ${activeQuestion === index ? 'show' : ''}`}
              >
                <div className="accordion-body">
                  {faq.resposta}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-light rounded">
          <h5>Não encontrou o que procurava?</h5>
          <p>Entre em contato conosco pelos seguintes canais:</p>
          
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope me-3 text-primary fs-4"></i>
                <div>
                  <h6 className="mb-0">E-mail</h6>
                  <p className="mb-0">suporte@farmaweb.com.br</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-telephone me-3 text-primary fs-4"></i>
                <div>
                  <h6 className="mb-0">Telefone</h6>
                  <p className="mb-0">(11) 3333-3333</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-whatsapp me-3 text-primary fs-4"></i>
                <div>
                  <h6 className="mb-0">WhatsApp</h6>
                  <p className="mb-0">(11) 99999-9999</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-clock me-3 text-primary fs-4"></i>
                <div>
                  <h6 className="mb-0">Horário de atendimento</h6>
                  <p className="mb-0">Segunda a sexta, das 8h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbaAjuda;