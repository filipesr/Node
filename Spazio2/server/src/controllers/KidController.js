const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Obj = require("../models").Kid;
const { Visit, Parent } = require("../models");

module.exports = {
  async index(req, res) {
    var where = {};
    if(req.query.parent)
      where.parent = req.query.parent;
    if(req.query.id)
      where.id = req.query.id;
    //where.Visit.timeOut = null;
    
    return await Obj.findAll({
      include: [{
        model: Visit,
        where: { timeOut : null },
        required : false
    }], 
      where:where, order: [['name', 'ASC']], attributes: {exclude: ["createdAt", "updatedAt"]} })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch((error) => res.status(400).json({retorno: 1,mensagem: `Erro não identificado: ${error}`}));
},
  async add(req, res) {
    const { name, birth, restriction, gender, bracelet, parent, event, id } = req.body;
    let kid  = id;
    let comment = "";
    
    if(!kid || kid === '0'){
      const fileName = `kid_${new Date().getTime()}.jpg`;
      let obj;
      try {
        //cadastro
        obj = await Obj.create({ name, birth, restriction, gender, collaborator: req.colaborador, parent, avatar: fileName });
      } catch (error) {
        return res.status(400).json({ retorno: 1, mensagem: `Erro ao realizar cadastro!` });
      }
      //Foto
      try {
        await sharp(req.file.path)
        .resize(200)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, fileName));
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.log(`Criança ${obj.name}(${obj.id}) adicionada sem foto!`);
    }
    // Anúncio para os apps conectados
      //req.io.emit('obj', obj);
      
      console.log(`Criança ${obj.name}(${obj.id}) adicionada!`);
      
      kid = obj.id;
      
    }
    if(bracelet){
      return Visit.create({ bracelet, comment, parent, collaborator: req.colaborador, kid, event })
        .then(() => {
          console.log(`Criança ${kid} adicionada com pulseira ${bracelet}!`);
          //console.log(`Visita ${bracelet} adicionada!`);
          res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' })
        })
        .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao realizar cadastro!' }));
    } else return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' })
  },
};