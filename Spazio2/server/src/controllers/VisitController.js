const { Visit, Kid, Parent, Event } = require("../models");

const Op = require('sequelize').Op;

module.exports = {
  async kidBracelet(req, res) {
    var where = {};
    where.id = req.query.id;
    where.timeOut = null;
    await Visit.findOne({ where })
    .then(visit => res.status(201).json({ retorno: 0, mensagem: `Pulseira: ${visit.bracelet}`, bracelet: visit.bracelet }))
    .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async index(req, res) {
    let timeOut = null;
    return await Visit.findAll({
      attributes: ['bracelet', 'timeIn'],
      include: [
        { model: Kid, as: 'Kid', attributes: ['name', 'avatar', 'gender', 'restriction', 'birth'], required: true },
        { model: Event, as: 'Event', attributes: ['id'], required: true },
        { model: Parent, as: 'Parent', attributes: ['name', 'phone', 'phone2'], required: true }],
      order: [['timeIn', 'ASC']], where: { timeOut, timeIn: { [Op.ne]: null } }
    })
    .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: (req.query.total?{}:lista), total:lista.length }))
    .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async wait(req, res) {
    let timeIn = null;
    return await Visit.findAll({
      attributes: ['bracelet'],
      include: [
        { model: Kid, as: 'Kid', attributes: ['name', 'avatar', 'gender', 'restriction', 'birth'], required: true },
        { model: Event, as: 'Event', attributes: ['id'], required: true },
        { model: Parent, as: 'Parent', attributes: ['name', 'phone', 'phone2'], required: true }],
      order: [['bracelet']], where: { timeIn, bracelet: { [Op.ne]: null } }
    })
    .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista, total:lista.length }))
    .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async past(req, res) {
    return await Visit.findAll({
      attributes: ['bracelet', 'timeIn', 'timeOut'],
      include: [
        { model: Kid, as: 'Kid', attributes: ['name', 'avatar', 'gender', 'restriction', 'birth'], required: true },
        { model: Event, as: 'Event', attributes: ['id'], required: true },
        { model: Parent, as: 'Parent', attributes: ['name', 'phone', 'phone2'], required: true }],
      order: [['id', 'DESC']], where: { id: { [Op.gt]: 0}, timeIn: { [Op.ne]: null}, timeOut: { [Op.ne]: null } }
    })
    .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista, total:lista.length }))
    .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async in(req, res) {
    const { bracelet, event } = req.body;
    return Visit.update({ timeIn: new Date().toLocaleTimeString(), collaboratorIn: req.colaborador }, { where: { bracelet, event } })
      .then(visit => {        
          // Anúncio para os apps conectados
          //req.io.emit('in', visit);
          console.log(`Entrada ${bracelet}!`);
          return res.status(201).json({ retorno: 0, mensagem: 'Entrada registrada com sucesso!' });
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar entrada!' }));
  },
  async out(req, res) {    
    const { bracelet, event } = req.body;
    return Visit.update({ timeOut: new Date().toLocaleTimeString(), collaboratorOut: req.colaborador }, { where: { bracelet, event } })
      .then(visit => {
        // Anúncio para os apps conectados
        //req.io.emit('out', visit);

          console.log(`Saída ${bracelet}!`);
          return res.status(201).json({ retorno: 0, mensagem: 'Saída registrada com sucesso!' });
      })
      .catch(err => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!', err }));
  },
  async cancelOut(req, res) {    
    const { bracelet, event } = req.body;
    return Visit.update({ timeOut: null, collaboratorOut: req.colaborador }, { where: { bracelet, event } })
      .then(visit => {
        // Anúncio para os apps conectados
        //req.io.emit('out', visit);

          console.log(`Saída ${bracelet}!`);
          return res.status(201).json({ retorno: 0, mensagem: 'Saída registrada com sucesso!' });
      })
      .catch(err => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!', err }));
  },
  async add(req, res) {
    const { bracelet, comment, parent, kid, event } = req.body;
    

    return Visit.create({ bracelet, comment, parent, collaborator: req.colaborador, kid, event })
      .then(() => {
        console.log(`Visita ${bracelet} adicionada!`);
        res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' })
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
  },
};