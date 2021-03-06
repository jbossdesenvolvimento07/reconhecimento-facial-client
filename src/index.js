import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Home, Cadastro, Validacao, Portaria, Configuracao, Header, Remocao, Consulta, Dados } from "./components";

ReactDOM.render(
  <>
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dados" element={<Dados />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/validacao" element={<Validacao />} />
        <Route path="/remocao" element={<Remocao />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/portaria" element={<Portaria />} />
        <Route path="/config" element={<Configuracao />} />
      </Routes>
    </Router>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
