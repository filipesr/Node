const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'www.fsrezende.com.br';

const Obj = require("../models").Colaborador;

module.exports = {
  async login(req, res) {
    var cpf = req.body.cpf || req.params.cpf || '';
    var senha = req.body.senha || req.params.senha || '';
    
    if (!cpf || !senha) return res.status(400).json({ retorno: 1, mensagem: 'Login incorreto 1!' });

    //1
    return await Obj.findOne({ where: { cpf } })
      .then(user => {
        //2
        if (!user || user.verificaSenha(senha)) throw new Error('Senha incorreta!');
        //3
        var expires = moment().add(1, 'days');
        var token = jwt.encode({
          iss: user.id,
          exp: expires.valueOf()
        }, secretKey);
        //4

        // Anúncio para os apps conectados
        req.io.emit('login', user);

        return res.status(201).json({
          retorno: 0,
          mensagem: `Login efetuado com sucesso!`,
          token: token,
          expires: expires.format('HH:mm:ss DD/MM/YYYY')
        });
      })
      .catch(err => res.status(400).json({ retorno: 1, mensagem: `Login incorreto! ${err}` }));
  },
  async index(req, res) {
    return await Obj.findAll({ order: [['nome', 'ASC']] })
      .then(lista => res.status(201).json({ retorno: 0, mensagem: `Total: ${lista.length}`, lista: lista }))
      .catch(() => res.status(400).json({ retorno: 1, mensagem: 'Erro ao buscar lista!' }));
  },
  async add(req, res) {
    var { nome, cpf, senha, dataNascimento, telefone } = req.body;

    bcrypt.genSalt(5, function (err, salt) {
      if (err) return res.status(400).json({ retorno: 1, mensagem: `Erro: Criptografia!` });;
      bcrypt.hash(senha, salt, null, function (err, hash) {
        if (err) return res.status(400).json({ retorno: 1, mensagem: `Erro: Criptografia 2!` });;
        senha = hash;
      });
    });

    const { filename: image } = req.file;
    const fileName = `colaborador_${cpf}.jpg`;
    try {
      await Obj.create({ nome, cpf, senha, dataNascimento, telefone, foto: fileName });
    } catch (error) {
      return res.status(400).json({ retorno: 1, mensagem: `Erro: CPF já cadastrado!` });
    }
    //Foto
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));
    fs.unlinkSync(req.file.path);

    // Anúncio para os apps conectados
    //req.io.emit('colaborador', colaborador);

    return res.status(201).json({ retorno: 0, mensagem: 'Cadastrado realizado com sucesso!' });
  },
};