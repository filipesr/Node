const model = require("./models").Colaborador;
const jwt = require('jwt-simple');
const segredo = 'www.fsrezende.com.br';

module.exports = async function (req, res, next) {
    try {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        //1
        if (!token)
            throw new Error('Token não encontrado, faça login novamente');

        var decoded = jwt.decode(token, segredo);
        //2
        if (decoded.exp <= Date.now()) {
            throw new Error('Acesso Expirado, faça login novamente');
        }
        //3
        await model.findOne({ where: { id: decoded.iss } })
            .then(user => {
                req.user = user;
                return next();
            })
            .catch(err => {
                throw new Error('Token inválido');
            });
        //4
    } catch (err) {
        return res.status(400).json({ retorno: 1, mensagem: `Token inválido: ${err.message}` });
    }
};