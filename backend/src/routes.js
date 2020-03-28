// Importando o módulo que trata as rotas
const express = require("express");

// Importanto o módulo que irá tratar a validação de dados
const { celebrate, Segments, Joi } = require('celebrate');

// Importando o arquivo com o controlador das rotas da ong
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

// Desacoplando o módulos de rotas do express
const routes = express.Router();

// Configurando as rotas
//Sessão/Login
routes.post('/sessions', SessionController.create)

//Listar Ongs
routes.get('/ongs', OngController.index );

//Criar Ong
//Ordem das rotas -> Pega o endereço, passa pela validação, vai criar o registro
routes.post('/ongs', celebrate({
    //Validando os dados recebidos na BODY
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

//Listar Incidents por Ong
routes.get('/profile',  celebrate({
    //Usado o unknown pois, apesar de montar e validar apenas um Header, são enviados vários Headers diferentes, e não sabemos quais são os outros
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),       
    }).unknown()
}), ProfileController.index);

//Listar todos os Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

//Criar Incident
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),       
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(4),
        description: Joi.string().required().min(10),
        value: Joi.number().required(),
    })
}), IncidentController.create);

//Deletar Incident
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

// Exportando toda este arquivo de rotas
module.exports = routes;