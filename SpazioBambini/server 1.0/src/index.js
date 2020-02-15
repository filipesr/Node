// Importação de dependências
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));

// Suporte HTTP e Socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

app.get('*', (req, res) => res.status(200).send({
  message: 'Bem vindo ao server Spazio Bambini.',
}));

server.listen(3333);
