// Importação de dependências
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Cedula = require('../models/Cedula');
const Voto = require('../models/Voto');

module.exports = {
  async index(req, res) {
    const cedulas = await Cedula.find().sort('-createdAt');
    return res.json({ retorno: 0, mensagem: `Total de cédulas encontradas: ${cedulas.length}`, cedulas: cedulas });
  },

  async store(req, res) {
    //Cédula
    const { cod, cpf, votoVice, votoSecr, votoTeso, votoExam } = req.body;
    const { filename: image } = req.file;

    //Valida código do membro
    if (cod == null) return res.json({ retorno: 1, mensagem: 'Código de membro ausênte!' });
    //Valida se já votou
    var cedula = await Cedula.findOne({ cod: cod });
    if (cedula != null) return res.json({ retorno: 1, mensagem: 'Voto já computado para este membro!' });

    //Valida os votos e respectivas quantitadas
    var lstVotos = [];
    //Vice Presidencia: 2
    var tmpVotos = votoVice.split(',').filter(Boolean); //divide os votos pelas vírgulas
    if (tmpVotos.length > 2) return res.json({ retorno: 1, mensagem: 'Erro! Escolha até 2 candidatos para a Vice Presidência !' });
    tmpVotos.forEach(v => { lstVotos = [...lstVotos, `${v}:Vice`]; }); //manipula e popula a lista de votos
    //Secretaria: 2
    tmpVotos = votoSecr.split(',').filter(Boolean);
    if (tmpVotos.length > 2) return res.json({ retorno: 1, mensagem: 'Erro! Escolha até 2 candidatos para a Secretaria !' });
    tmpVotos.forEach(v => { lstVotos = [...lstVotos, `${v}:Secretaria`]; });//
    //Tesouraria: 2
    tmpVotos = votoTeso.split(',').filter(Boolean);
    if (tmpVotos.length > 2) return res.json({ retorno: 1, mensagem: 'Erro! Escolha até 2 candidatos para a Tesouraria !' });
    tmpVotos.forEach(v => { lstVotos = [...lstVotos, `${v}:Tesouraria`]; });//
    //Conselho Fiscal: 4
    tmpVotos = votoExam.split(',').filter(Boolean);
    if (tmpVotos.length > 4) return res.json({ retorno: 1, mensagem: 'Erro! Escolha até 4 candidatos para o Exame de Contas !' });
    tmpVotos.forEach(v => { lstVotos = [...lstVotos, `${v}:Exame`]; });//

    //Cédula
    const fileName = `cedula_${cod}.jpg`;
    cedula = await Cedula.create({ cod, cpf, votoVice, votoSecr, votoTeso, votoExam, image: fileName });
    //Foto
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile( path.resolve(req.file.destination, 'resized', fileName) );
    fs.unlinkSync(req.file.path);

    //Salva os votos
    lstVotos.forEach(async v => {
      if (v.trim().length > 3) {
        var [nm, cg] = v.split(':');
        nm = nm.trim();
        var voto = await Voto.findOne({ nome: nm, cargo: cg, });
        if (voto == null) {
          voto = await Voto.create({ nome: nm, cargo: cg, votos: 1 });
        } else {
          voto.votos += 1;
          voto = await voto.save();
        }
      }
    });

    // Anúncio para os apps conectados
    req.io.emit('cedula', cedula);

    return res.json({ retorno: 0, mensagem: 'Cédula cadastrada com sucesso!' });
  },
};