import React from 'react';
import { Carousel } from 'react-bootstrap';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';

const MeuCarrossel = () => {
  return (
    <div style={{ width: '100vw', margin: 0, padding: 0 }}>
      <Carousel fade interval={3000} indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrossel1.jpeg"
          alt="Imagem 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrossel2.jpeg"
          alt="Imagem 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrosel3.jpeg"
          alt="Imagem 3"
        />
      </Carousel.Item>
      
    </Carousel>
     </div>
  );
};

export default MeuCarrossel;
