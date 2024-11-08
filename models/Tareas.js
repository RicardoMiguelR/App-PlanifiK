const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proyectos = require("./Proyectos");

const Tareas = sequelize.define("Tareas", {
  id: {
    type: DataTypes.INTEGER(12),
    autoIncrement: true,
    primaryKey: true,
  },
  tarea: {
    type: DataTypes.STRING(100),
  },
  estado: {
    type: DataTypes.INTEGER(1),
  },
});
Tareas.belongsTo(Proyectos);

module.exports = Tareas;
