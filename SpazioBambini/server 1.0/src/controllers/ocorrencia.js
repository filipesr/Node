const Obj = require("../models").Ocorrencia;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({order: [['createdAt', 'DESC']]})
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async add(req, res) {
    const { nome, gravidade, resposta } = req.body;
    return Obj.create({ nome, gravidade, resposta })
      .then(() => res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!'}))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!'}));
  },
};