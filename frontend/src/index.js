//Importando o React
import React from 'react';

//Importando o módulo que trabalhe com a árvore de atributos/marcações do HTML
import ReactDOM from 'react-dom';

//Importando o código que irá preencher o HTML
import App from './App';

//Renderizando a aplicação pela função .render (<App/>, [Onde será preenchido o código])
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

