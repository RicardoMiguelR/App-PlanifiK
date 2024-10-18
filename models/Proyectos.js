const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Proyectos = sequelize.define("Proyectos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "http://defaulturl.com",
  },
});

module.exports = Proyectos;
