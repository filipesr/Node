const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Obj = require("../models").Parent;

module.exports = {
  async index(req, res) {
    return await Obj.findAll({ order: [['name', 'ASC']], attributes: {exclude: ["createdAt", "updatedAt"]} })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async add(req, res) {
    const { name, phone, phone2, cpf, termAccepted } = req.body;

    const parent = await Obj.create({ name, phone, phone2, cpf, termAccepted, collaborator: req.colaborador })
    .catch (error => {
      return res.status(400).json({ retorno: 1, mensagem: `Erro ao realizar cadastro!` });
    })

    // Anúncio para os apps conectados
    //req.io.emit('parent', parent);

    console.log(`Responsável ${parent.name}(${parent.id}) adicionado!`);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' });
  },
  async add(req, res) {
    const { name, phone, phone2, cpf, termAccepted } = req.body;
    if(!name || !cpf || !phone)
      return res.status(400).json({ retorno: 1, mensagem: `Erro ao realizar cadastro - Campos incompletos!` });
    
    const fileName = (!req.file?"":`parent_${cpf}.jpg`);
    let parent;
    try {
      parent = await Obj.create({ name, phone, phone2, cpf, termAccepted, collaborator: req.colaborador, avatar: fileName });
    } catch (error) {
      return res.status(400).json({ retorno: 1, mensagem: `Erro ao realizar cadastro!` });
    }
    
    //Foto
    if (req.file){
      await sharp(req.file.path)
        .resize(200)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName));
      fs.unlinkSync(req.file.path);
    }
    // Anúncio para os apps conectados
    //req.io.emit('parent', parent);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!', parent: parent.id });
  }
};