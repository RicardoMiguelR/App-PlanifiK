const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proyectos = require("../models/Proyectos");

const Usuarios = sequelize.define("Usuarios", {
  id: {
    type: DataTypes.INTEGER(12),
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
