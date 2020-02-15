module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Colaboradores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dataNascimento: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      telefone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      foto: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      chaveAcesso: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Colaboradores');
  }
};