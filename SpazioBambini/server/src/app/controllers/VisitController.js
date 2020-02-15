const { Visit, Kid, Parent } = require("../models");

const Op = require('sequelize').Op;

module.exports = {
  async index(req, res) {
    let sqlStr = `select vis.bracelet, vis.timeIn, cri.name as criança, cri.avatar, cri.gender, cri.restriction, cri.birth, res.name, res.phone, res.phone2
    from Visits vis
    inner join Kids cri
            on cri.id = vis.kid
    inner join Parents res
            on res.id = vis.parent
    order by vis.timeIn`;
    let timeOut = null;
    return await Visit.findAll({
      attributes: ['bracelet', 'timeIn'],
      include: [
        { model: Kid, as: 'Kid', attributes: ['name', 'avatar', 'gender', 'restriction', 'birth'], required: true },
        { model: Parent, as: 'Parent', attributes: ['name', 'phone', 'phone2'], required: true }],
      order: [['timeIn', 'DESC']], where: { timeOut, timeIn: { [Op.ne]: null } }
    })
      .then(lista => res.render('dashboard', { lista }))
      .catch(() => res.sender('Erro ao buscar lista!' ));
  },
  async in(req, res) {
    const { bracelet, event } = req.body;
    return Visit.update({ timeIn: new Date().toLocaleTimeString() }, { where: { bracelet, event } })
      .then(visit => {
        if (visit > 0) {
          // Anúncio para os apps conectados
          req.io.emit('in', visit);

          return res.status(201).json({ retorno: 0, mensagem: 'Entrada registrada com sucesso!' });
        } else return res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar entrada!' })
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar entrada!' }));
  },
  async out(req, res) {
    const { bracelet, event } = req.body;
    return Visit.update({ timeOut: new Date().toLocaleTimeString() }, { where: { bracelet, event } })
      .then(visit => {
        if (visit > 0) {
          // Anúncio para os apps conectados
          req.io.emit('out', visit);

          return res.status(201).json({ retorno: 0, mensagem: 'Saída registrada com sucesso!' });
        } else return res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!' })
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!' }));
  },
  async add(req, res) {
    const { bracelet, comment, parent, collaborator, visit, event } = req.body;
    console.log(req.body);

    return Visit.create({ bracelet, comment, parent, collaborator, visit, event })
      .then(() => res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
  },
};