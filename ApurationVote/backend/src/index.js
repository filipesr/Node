// Importação de dependências
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Suporte HTTP e Socket
const server = require('http').Server(app);
const io = require('socket.io')(server);


// Conexão com SGDB
mongoose.connect('mongodb+srv://semana:semana@cluster0-hlbpp.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Repasse do req.io para todas as rotas
app.use((req, res, next) => {
  req.io = io;

  next();
});
// Permite que diferentes urls acessem o backEnd
app.use(cors());
// Rota de acesso de arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
// Declaração de rotas da aplicação
app.use(require('./routes'));

server.listen(3333);
