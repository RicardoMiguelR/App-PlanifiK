const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tareas = sequelize.define("Tareas", {
  id: {
    type: DataTypes.INTEGER(12),
    autoIncrement: true,
    primaryKey: true,
  },
  tarea: {
    type: DataTypes.STRING(250),
  },
  estado: {
    type: DataTypes.INTEGER(1),
  },
});

module.exports = Tareas;
