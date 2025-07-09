import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const anoAtual = new Date().getFullYear();

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
    </footer>
  );
}
