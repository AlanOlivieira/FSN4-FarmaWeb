import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarrinhoProvider>
  </React.StrictMode>
);
