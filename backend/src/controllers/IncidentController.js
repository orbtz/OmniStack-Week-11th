// Importando o arquivo de conexão ao BD
const connection = require("../database/connection");

module.exports = {
    // Rota e método para LISTAR os casos
    async index (request, response) {
        // Arrumando a variável para a paginaçaõ dos elementos
        // Por padrão ele coloca paga como 1
        const { page = 1 } = request.query;

        // Pegar a contagem de dados. Dento das chaves para garantir que vai trazer um valor, e não array 
        const [count] = await connection('incidents')
            .count();

        response.header('X-Total-Count', count['count(*)']);

        // Vai fazer o select no BD. Esperar ele fazer a requisição antes de continuar
        // Limitar 5 elementos por vez, e "pular" os dados a cada 5 itens
        // Vai dar join na tabela de ongs, para que seja possível mostrar dados da ong para cada incident
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page-1) * 5 )
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);

        //Retorna a lista de casos
        return response.json(incidents);
    },

    // Rota e método para CRIAR os casos
    async create (request, response) {

        // Vai pegar a request body do post
        const {title, description, value } = request.body;
        //Se pega o ong_id, que é passado na header da request. Estes dados geralmente são mandados nas headers mesmo
        const ong_id = request.headers.authorization;

        //Fazendo o insert dos dados na tabela indidents.
        //Vai criar na variável id_caso o id do elemento, pois está referindo à posição 0
        const [id_caso] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        // Retorno pro front-end
        return response.json({ id_caso });

    },

    // Rota para DELETAR um caso
    async delete (request, response) {
        // Pera qual o ID baseado no route params
        const {id} = request.params;
        // Se pega o ong_id, que é passado na header da request. Estes dados geralmente são mandados nas headers mesmo
        const header_ong_id = request.headers.authorization;

        //QUery no BD. Procura na tabela incidents se existe o id requisitado, e retorna o hash com a ong que a criou
        const incident = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first();

        // Se o ong_id do select for diferente do ong_id mandado na request, muda o status para não autorizado
        if (incident.ong_id != header_ong_id){
            return response.status(401).json({erro: 'Operation not permitted.'});
        }

        // Se der certo, vai fazer o delete no BD
        await connection("incidents").where("id", id).delete();
        // Retorna que deu certo, mas não tem nenhuma corpo/conteúdo
        return response.status(204).send();
    }
}