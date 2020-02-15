const mongoose = require('mongoose');

/*
Voto
cod ou cpf
2 vices entre 4
2 secretarios entre 4
2 tesoureiros entre 4
4 examinadores entre 8
 */
const CedulaScheme = new mongoose.Schema({
    cod: String,
    cpf: String,
    votoVice: String,
    votoSecr: String,
    votoTeso: String,
    votoExam: String,
    image: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cedula', CedulaScheme);