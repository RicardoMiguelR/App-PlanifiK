const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");

// Crear la conexion a base de datos ->
const sequelize = require("./config/db");

require("./models/Proyectos");

async function connectDatabase() {
  try {
    await sequelize.sync();
    console.log("La conexión se ha establecido exitosamente.");
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
}

connectDatabase();

// Crear app de express ->
const app = express();

// Importar los archivos estaticos
app.use(express.static("public"));

// Importar pug ->
app.set("view engine", "pug");

// Añadir la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

// Importar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Importacion de rutas
app.use("/", routes());

// Indicar el puerto en el que se ejecutara el servidor ->
app.listen(4000);
