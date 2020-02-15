const { Visita, Crianca, Responsavel } = require("../models");

const Op = require('sequelize').Op;

module.exports = {
  async index(req, res) {
    let sqlStr = `select vis.codigoPulseira, vis.horaEntrada, cri.nome as criança, cri.foto, cri.genero, cri.restricaoAcesso, cri.dataNascimento, res.nome, res.telefone, res.telefone2
    from Visitas vis
    inner join Criancas cri
            on cri.id = vis.crianca
    inner join Responsaveis res
            on res.id = vis.responsavel
    order by vis.horaEntrada`;
    let horaSaida = null;
    return await Visita.findAll({
      attributes: ['codigoPulseira', 'horaEntrada'],
      include: [
        { model: Crianca, as: 'Crianca', attributes: ['nome', 'foto', 'genero', 'restricaoAcesso', 'dataNascimento'], required: true },
        { model: Responsavel, as: 'Responsavel', attributes: ['nome', 'telefone', 'telefone2'], required: true }],
      order: [['horaEntrada', 'DESC']], where: { horaSaida, horaEntrada: { [Op.ne]: null } }
    })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async in(req, res) {
    const { codigoPulseira, evento } = req.body;
    return Visita.update({ horaEntrada: new Date().toLocaleTimeString() }, { where: { codigoPulseira, evento } })
      .then(visita => {
        if (visita > 0) {
          // Anúncio para os apps conectados
          req.io.emit('in', visita);

          return res.status(201).json({ retorno: 0, mensagem: 'Entrada registrada com sucesso!' });
        } else return res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar entrada!' })
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar entrada!' }));
  },
  async out(req, res) {
    const { codigoPulseira, evento } = req.body;
    return Visita.update({ horaSaida: new Date().toLocaleTimeString() }, { where: { codigoPulseira, evento } })
      .then(visita => {
        if (visita > 0) {
          // Anúncio para os apps conectados
          req.io.emit('out', visita);

          return res.status(201).json({ retorno: 0, mensagem: 'Saída registrada com sucesso!' });
        } else return res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!' })
      })
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao registrar saída!' }));
  },
  async add(req, res) {
    const { codigoPulseira, comentario, responsavel, colaborador, visita, evento } = req.body;
    console.log(req.body);

    return Visita.create({ codigoPulseira, comentario, responsavel, colaborador, visita, evento })
      .then(() => res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
  },
};