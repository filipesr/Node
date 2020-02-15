const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Obj = require("../models").OcorrenciaCrianca;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({ order: [['createdAt', 'DESC']] })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async add(req, res) {
    const { comentario, crianca, colaborador, ocorrencia } = req.body;
    const { filename: image } = req.file;
    const fileName = `ocorrenciacrianca_${Date.now().getTime()}.jpg`;
    let ocorrenciacrianca;
    try {
      ocorrenciacrianca = await Obj.create({ dataOcorrencia: new Date().toISOString().replace('T', ' ').replace('\..+', ''), comentario, crianca, colaborador, ocorrencia, foto: fileName });
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
    //req.io.emit('ocorrenciacrianca', ocorrenciacrianca);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' });
  },
};