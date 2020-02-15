const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const secret = "FSRezende.com.br";
const jwt = require("jsonwebtoken");

const { Collaborator } = require("../models");

module.exports = {
  async logged(req, res, next) {
    var token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).send({ auth: false, mensagem: "Acesso negado!" });
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, mensagem: "Acesso negado!" });

        // se tudo estiver ok, salva no request para uso posterior
        req.cpf = decoded.cpf;
        req.colaborador = decoded.colaborador;
        
        next();
      });
    }
    //return res.status(403).json({retorno: 1,mensagem: "Acesso negado!"});
  },
  async isADM(req, res, next) {
    if (!req.cpf) return res.status(401).send({ auth: false, mensagem: "Acesso negado!" });

    if (req.cpf != "05371020780") return res.status(500).send({ auth: false, mensagem: "Acesso negado!" });

    next();
  },
  async login(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    const { cpf, password } = req.body;

    if (!cpf || !password)
      return res
        .status(400)
        .json({
          retorno: 1,
          mensagem: "Os campos CPF e Senha devem ser preenchidos!"
        });

    //1
    const collaborator = await Collaborator.findOne({ where: { cpf } });

    if (!collaborator)
      return res
        .status(400)
        .json({ retorno: 1, mensagem: "Usuário inválido!" });

    if (!(await collaborator.checkPassword(password)))
      return res.status(400).json({ retorno: 1, mensagem: "Senha inválida!" });

    const token = jwt.sign({ cpf, colaborador: collaborator.id }, secret, {
      expiresIn: 3600*8 // expires in 8h
    });
    console.log(`${collaborator.name} logado!`);
    
    return res
      .status(200)
      .json({ retorno: 1, mensagem: "", auth: true, token });
  },
  async index(req, res) {
    return await Collaborator.findAll({
      order: [["name", "ASC"]],
      attributes: { exclude: ["cpf", "passwordHash", "createdAt", "updatedAt"] }
    })
      .then(lista =>
        res
          .status(201)
          .json({
            retorno: 0,
            mensagem: `Total: ${lista.length}`,
            lista: lista
          })
      )
      .catch(error =>
        res
          .status(400)
          .json({ retorno: 1, mensagem: `Erro não identificado: ${error}` })
      );
  },
  async add(req, res) {
    const { name, birth, phone, cpf, password } = req.body;
    if (!req.file)
      return res
        .status(400)
        .json({ retorno: 1, mensagem: "Nenhuma foto enviada!" });

    const fileName = `col_${new Date().getTime()}.jpg`;

    if (!cpf || !password)
      return res
        .status(400)
        .json({ retorno: 1, mensagem: "CPF e Senha são campos obrigatórios!" });

    try {
      const collaborator = await Collaborator.findOne({ where: { cpf } });

      if (collaborator)
        return res
          .status(400)
          .json({ retorno: 1, mensagem: "CPF já cadastrado!" });

      await Collaborator.create({ name, birth, phone, cpf, password, collaborator: req.colaborador, avatar: fileName });
    } catch (error) {
      return res
        .status(400)
        .json({ retorno: 1, mensagem: `Erro não identificado: ${error}` });
    }
    //Foto
    await sharp(req.file.path)
      .resize(200)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, fileName));
    fs.unlinkSync(req.file.path);

    // Anúncio para os apps conectados
    //req.io.emit('collaborator', collaborator);

    return res
      .status(200)
      .json({ retorno: 0, mensagem: "Cadastrado realizado com sucesso!" });
  }
};
