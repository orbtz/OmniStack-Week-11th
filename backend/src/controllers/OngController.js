// Importando o arquivo de conexão ao BD
const connection = require("../database/connection");

// Importando o módulo que trata a geração de IDs
const generateUniqueId = require ('../../utils/generateUniqueId');

// Exporta toda este módulo das rotas
module.exports = {
    // Rota e método para LISTAR as ongs
    async index (request, response) {

        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    
    },

    // Rota e método para CRIAR uma ong
    async create (request, response) {
        // Vai pegar a request body do post
        const {name, email, whatsapp, city, uf } = request.body;
    
        // Cria-se um hash com 4 caracteres randons, converte para string do tipo HEX
        const id = generateUniqueId();
    
        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        //Informação retornada ao client. Get
        return response.json({ id });
    }
};