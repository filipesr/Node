// Importação de dependências
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const colaborador = require('./controllers/colaborador');
const crianca = require('./controllers/crianca');
const evento = require('./controllers/evento');
const ocorrencia = require('./controllers/ocorrencia');
const ocorrenciacrianca = require('./controllers/ocorrenciacrianca');
const responsavel = require('./controllers/responsavel');
const tentativacontato = require('./controllers/tentativacontato');
const visita = require('./controllers/visita');

const routes = new express.Router();
const validarJWT = require('./validarJWT');

// Configuração do multer que traduz os dados enviados em objeto
const upload = multer(uploadConfig);

// Criação das rotas
routes.route('/login')
    .post(colaborador.login);
routes.route('/colaborador')
    .post(validarJWT, upload.single('image'), colaborador.add)
    .get(validarJWT, colaborador.index);
routes.route('/crianca')
    .post(validarJWT, upload.single('image'), crianca.add)
    .get(validarJWT, crianca.index);
routes.route('/evento')
    .post(validarJWT, evento.add)
    .get(validarJWT, evento.index);
routes.route('/ocorrencia')
    .post(validarJWT, ocorrencia.add)
    .get(validarJWT, ocorrencia.index);
routes.route('/ocorrenciacrianca')
    .post(validarJWT, upload.single('image'), ocorrenciacrianca.add)
    .get(validarJWT, ocorrenciacrianca.index);
routes.route('/responsavel')
    .post(validarJWT, upload.single('image'), responsavel.add)
    .get(validarJWT, responsavel.index);
routes.route('/tentativacontato')
    .post(validarJWT, tentativacontato.add)
    .get(validarJWT, tentativacontato.index);
routes.route('/visita')
    .post(validarJWT, visita.add)
    .get(visita.index);
//Ações
routes.route('/entrada')
    .post(visita.in);
routes.route('/saida')
    .post(visita.out);

module.exports = routes;
