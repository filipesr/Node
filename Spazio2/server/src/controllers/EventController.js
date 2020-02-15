const {Event} = require("../models");

module.exports = {
  async index(req, res) {
    return await Event.findAll({ order: [['createdAt', 'DESC']], attributes: {exclude: ["createdAt", "updatedAt"]} })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async add(req, res) {
    const { name, dateEvent, duration, capacity } = req.body;
    return Event.create({ name, dateEvent, duration, capacity })
      .then(() => res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
  },
};