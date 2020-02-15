//Importação de dependências
const Voto = require('../models/Voto');

module.exports = {
    async index(req, res) {
        if(req.params.cargo != null){
            const votosCargo = await Voto.find({cargo: req.params.cargo}).sort('-createdAt');
            return res.json({retorno: 0, mensagem: `Votos de votos para o cargo ${req.params.cargo}!` , votos: votosCargo});
        }
        const votos = await Voto.find().sort('-createdAt');
        return res.json({retorno: 0, mensagem: 'Lista de votos!' , votos: votos});
    }
};