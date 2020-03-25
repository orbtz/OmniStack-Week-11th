//Importa módulo do knex, que trata do BD
const knex = require("knex");

//Importa as configs do BD, dentro do arquivo knexfile
const configuration = require("../../knexfile");

//Pega a configuração de desenvolvimento
const connection = knex(configuration.development);

//Exportando este arquivo
module.exports = connection;