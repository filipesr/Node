const Obj = require("../models").ContactAttempt;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({ order: [['createdAt', 'DESC']], attributes: {exclude: ["createdAt", "updatedAt"]} })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async add(req, res) {
    const { answered, comment, parent, visit } = req.body;
    return Obj.create({ dateAttempt: new Date().toISOString().replace('T', ' ').replace('\..+', ''), answered, comment, parent, collaborator: req.colaborador, visit })
      .then(() => res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
  },
};