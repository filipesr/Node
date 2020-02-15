const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Obj = require("../models").Parent;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({ order: [['nsme', 'ASC']] })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async add(req, res) {
    const { nsme, phone, phone2, cpf, termAccepted, collaborator } = req.body;
    const { filename: image } = req.file;
    const fileName = `parent_${cpf}.jpg`;
    let parent;
    try {
      parent = await Obj.create({ nsme, phone, phone2, cpf, termAccepted, collaborator, avatar: fileName });
    } catch (error) {
      return res.status(400).json({ retorno: 1, mensagem: `Erro ao realizar cadastro!` });
    }
    //Foto
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));
    fs.unlinkSync(req.file.path);

    // Anúncio para os apps conectados
    req.io.emit('parent', parent);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' });
  },
  async add(req, res) {
    const { cpf, password } = req.body;
    if (!req.file) {
      req.flash('error', 'Nenhuma foto enviada!');
      return res.redirect('/app/responsaveis/new');
    }

    const { filename: avatar } = req.file;

    if (!cpf || !password) {
      req.flash('error', 'CPF e Senha são campos obrigatórios!');
      return res.redirect('/app/responsaveis/new');
    }

    try {
      const collaborator = await Collaborator.findOne({ where: { cpf } });

      if (collaborator) {
        req.flash('error', 'CPF já cadastrado!');
        return res.redirect('/app/responsaveis/new');
      }

      await Collaborator.create({ ...req.body, avatar });
    } catch (error) {
      req.flash('error', `Erro não identificado: ${error}`);
      return res.redirect('/app/responsaveis/new');
    }
    // Anúncio para os apps conectados
    //req.io.emit('collaborator', collaborator);

    req.flash('success', 'Cadastrado realizado com sucesso!');
    return res.redirect('/app/responsaveis');
  },
};