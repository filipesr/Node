const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const { Collaborator } = require("../models");

module.exports = {
  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root');
      return res.redirect('/');
    })
  },
  async login(req, res) {
    const { cpf, password } = req.body;

    // if (!cpf || !password) return res.status(400).json({ retorno: 1, mensagem: 'Os campos CPF e Senha devem ser preenchidos!' });
    if (!cpf || !password) {
      req.flash('error', 'CPF e Senha obrigatório');
      return res.redirect('/');
    }

    //1
    const collaborator = await Collaborator.findOne({ where: { cpf } });

    // if (!user) throw res.status(400).json({ retorno: 1, mensagem: 'Colaborador não encontrado!' });
    if (!collaborator) {
      req.flash('error', 'Colaborador não encontrado');
      return res.redirect('/');
    }

    if (!await collaborator.checkPassword(password)) {
      req.flash('error', 'Senha inválida');
      return res.redirect('/');
    }

    req.session.collaborator = collaborator;

    if(cpf == "05371020780")
      return res.redirect('/app/colaboradores');
    else
      return res.redirect('/app/dashboard');
  },
  async index(req, res) {
    return await Collaborator.findAll({ order: [['name', 'ASC']] })
      .then(colaboradores => res.render('colaboradores', { colaboradores }))
      .catch(() => res.render('colaboradores'));
  },
  async add(req, res) {
    const { cpf, password } = req.body;
    if (!req.file) {
      req.flash('error', 'Nenhuma foto enviada!');
      return res.redirect('/app/colaboradores/new');
    }

    const { filename: avatar } = req.file;

    if (!cpf || !password) {
      req.flash('error', 'CPF e Senha são campos obrigatórios!');
      return res.redirect('/app/colaboradores/new');
    }

    try {
      const collaborator = await Collaborator.findOne({ where: { cpf } });

      if (collaborator) {
        req.flash('error', 'CPF já cadastrado!');
        return res.redirect('/app/colaboradores/new');
      }

      await Collaborator.create({ ...req.body, avatar });
    } catch (error) {
      req.flash('error', `Erro não identificado: ${error}`);
      return res.redirect('/app/colaboradores/new');
    }
    // Anúncio para os apps conectados
    //req.io.emit('collaborator', collaborator);

    req.flash('success', 'Cadastrado realizado com sucesso!');
    return res.redirect('/app/colaboradores');
  },
};