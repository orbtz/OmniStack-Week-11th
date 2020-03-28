// Importanto o pacote que vai tratar as rotas do projeto
const express = require('express');

// Importa o módulo de seguranã, que vai dizer quem pode acessar a aplicação
const cors = require('cors');

// Módulo que trata validações de dados. Usando em específico o que trata os erros
const {errors} = require('celebrate')

// Vai buscar o módulo de rotas no arquivo routes.js. Se utiliza ./ pois mostra que ele não é um
// pacote, e sim um arquivo
const routes = require("./routes");

// Criando aplicação, ouve Express
const app = express();

// Permite que programa use o módulo. Módulo vai deixar que as aplicações front end tenham acesso ao backend
app.use(cors( {} ));

// Permite que o programa leia as requisições json
app.use(express.json());

// Lê e se utiliza das rotas criadas na pasta routes.js
app.use(routes);

// Trata os erros, retorno de forma mais agradável
app.use(errors());

// Deixando ele a ser exportado para outros arquivos
module.exports = app;