const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Importacion dinamica de nanoid ->
const nanoid = async () => {
  const { nanoid } = await import("nanoid");
  return nanoid(8);
};

const Proyectos = sequelize.define(
  "Proyectos",
  {
    id: {
      type: DataTypes.INTEGER(20),
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(100),
    },
  },
  {
    // Se crea la url dinamico con id mediante el hook ->
    hooks: {
      beforeCreate: async (proyecto) => {
        const id = await nanoid();
        proyecto.url = `${proyecto.nombre
          .toLowerCase()
          .replace(/ /g, "-")}-${id}`;
      },
    },
  }
);

module.exports = Proyectos;
