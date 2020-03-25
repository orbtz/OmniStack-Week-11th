// Importando o módulo que trata as rotas
const express = require("express");

// Importando o arquivo com o controlador das rotas da ong
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

// Desacoplando o módulos de rotas do express
const routes = express.Router();

// Configurando as rotas
routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index );
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Exportando toda este arquivo de rotas
module.exports = routes;