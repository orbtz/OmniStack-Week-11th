// Importando o arquivo de conexão ao BD
const connection = require("../database/connection");

module.exports = {
    async create (request, response) {
        //Armazena o ID da ong mandada pela request
        const {id} = request.body;

        //Faz a consulta deste ID na tabela de ongs no BD
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        // Se a ong NÃO existir, retorna BAD REQUEST e a mensagem de erro
        if (!ong){
            return response.status(400).json( {error: "No ONG found with this ID."} );
        }

        // Se der certo, retorna a ong
        return response.json(ong);
    }
}