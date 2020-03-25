// Utilizado para criptografias. Neste caso, vamos gerar um hash para o id da ong
const crypto = require("crypto");

// Importando o arquivo de conexão ao BD
const connection = require("../database/connection");

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
        const id = crypto.randomBytes(4).toString("HEX");
    
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