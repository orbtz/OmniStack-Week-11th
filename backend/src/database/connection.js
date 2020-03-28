//Importa módulo do knex, que trata do BD
const knex = require("knex");

//Importa as configs do BD, dentro do arquivo knexfile
const configuration = require("../../knexfile");

// Faz a checagem pra ver se a VARIÁVEL DE AMBIENTE está como test(usa config no bd para test) ou como desenvolvimento (usa config no bd para development) e bota na const
const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;

//Pega a configuração e bota na conexão
const connection = knex(config);

//Exportando este arquivo
module.exports = connection;