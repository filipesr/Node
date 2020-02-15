const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Obj = require("../models").Crianca;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({ order: [['nome', 'ASC']] })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async add(req, res) {
    const { nome, dataNascimento, restricaoAcesso, genero, colaborador } = req.body;
    const { filename: image } = req.file;
    const fileName = `crianca_${Date.now().getTime()}.jpg`;
    let crianca;
    try {
      crianca = await Obj.create({ nome, dataNascimento, restricaoAcesso, genero, colaborador, foto: fileName });
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
    req.io.emit('crianca', crianca);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' });
  },
};