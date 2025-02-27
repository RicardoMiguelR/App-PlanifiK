const { Sequelize } = require("sequelize");
// Extraer valores de variables .env ->
require("dotenv").config({ path: ".env" });

const sequelize = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    dialect: "mysql",
    port: process.env.BD_PORT,
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
