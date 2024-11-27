const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proyectos = require("../models/Proyectos");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const Usuarios = sequelize.define(
  "Usuarios",
  {
    id: {
      type: DataTypes.INTEGER(50),
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (usuario) => {
        try {
          // Generar el hash del password y se asigna al usuario ->
          usuario.password = await bcrypt.hash(usuario.password, saltRounds);
        } catch (error) {
          throw new Error("Error al hashear el password: " + error.message);
        }
      },
    },
  }
);
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
