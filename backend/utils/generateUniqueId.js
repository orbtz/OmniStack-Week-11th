// Utilizado para criptografias. Neste caso, vamos gerar um hash para o id da ong
const crypto = require("crypto");

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString("HEX");
}