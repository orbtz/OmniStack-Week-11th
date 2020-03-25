// Importando o arquivo de conexão ao BD
const connection = require("../database/connection");

// Exportando o módulo das rotas
module.exports = {
    async index (request, response){
        const header_ong_id = request.headers.authorization;
        
        const incidents = await connection("incidents")
            .where("ong_id", header_ong_id)
            .select("*");

        return response.json(incidents);
    }
}