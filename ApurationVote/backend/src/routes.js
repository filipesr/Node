// Importação de dependências
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const CedulaController = require('./controllers/CedulaController');
const VotoController = require('./controllers/VotosController');

const routes = new express.Router();
// Configuração do multer que traduz os dados enviados em objeto
const upload = multer(uploadConfig);

// Criação das rotas
routes.get('/votos', VotoController.index);
routes.get('/votos/:cargo', VotoController.index);
routes.get('/cedulas', CedulaController.index);
routes.post('/cedula', upload.single('image'), CedulaController.store);

module.exports = routes;
