import React from 'react';
import ReactDOM from 'react-dom';// integracao do react com a DOM, a dom é os negocio do html
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,//ta colocando o arquivo App.js em tela
  document.getElementById('root')
);  



