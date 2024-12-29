const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proyectos = require("../models/Proyectos");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Usuarios = sequelize.define(
  "Usuarios",
  {
    id: {
      type: DataTypes.INTEGER(20),
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: {
        args: true,
        msg: "Usuario ya registrado",
      },
      validate: {
        isEmail: {
          msg: "Agrega un correo válido",
        },
        notEmpty: {
          msg: "Agrega un correo en el campo",
        },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Agrega una contraseña en el campo",
        },
      },
    },
    activo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    token: DataTypes.STRING,
    expiracion: DataTypes.DATE,
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

// Metodos personalizados ->
Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
