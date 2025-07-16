import React from 'react';
import { Carousel } from 'react-bootstrap';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css'; // Assuming you have a CSS file for custom styles


const MeuCarrossel = () => {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
            className="d-block w-100"
            src="public/img/Carousel (1).png"
            alt="Imagem 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="public/img/Carousel (2).png"
            alt="Imagem 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="public/img/Carousel (3).png"
            alt="Imagem 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="public/img/Carousel (4).png"
            alt="Imagem 4"
          />
        </Carousel.Item>
      </Carousel>
  );
}