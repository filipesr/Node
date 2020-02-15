'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
    var Colaborador = sequelize.define('Colaborador', {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        senha: DataTypes.STRING,
        dataNascimento: DataTypes.DATE,
        telefone: DataTypes.STRING,
        foto: DataTypes.STRING,
        chaveAcesso: DataTypes.STRING,
    }, {
            tableName: 'Colaboradores'
        });
    Colaborador.prototype.verificaSenha = function (password) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            return !err && isMatch;
        });
    };

    Colaborador.associate = function (models) {
        Colaborador.hasMany(models.Crianca, { as: 'Criancas', foreignKey: 'colaborador' });
        Colaborador.hasMany(models.OcorrenciaCrianca, { as: 'OcorrenciasCrianca', foreignKey: 'colaborador' });
        Colaborador.hasMany(models.Responsavel, { as: 'Responsaveis', foreignKey: 'colaborador' });
        Colaborador.hasMany(models.TentativaContato, { as: 'TentativasContato', foreignKey: 'colaborador' });
        Colaborador.hasMany(models.Visita, { as: 'Visitas', foreignKey: 'colaborador' });
    };
    return Colaborador;
}