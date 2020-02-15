const mongoose = require('mongoose');

const VotoScheme = new mongoose.Schema({
    nome: String,
    cargo: String,
    votos: {
        type: Number,
        default: 0,
      },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Voto', VotoScheme);