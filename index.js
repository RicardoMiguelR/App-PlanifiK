const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

// Helpers con funciones ->
const helpers = require("./helpers");

// Creacion de la conexion a base de datos ->
const sequelize = require("./config/db");
const { vardump } = require("./helpers");

//Importacion de modelos ->
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

async function connectDatabase() {
  try {
    await sequelize.sync();
    console.log("La conexión se ha establecido exitosamente.");
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
}

connectDatabase();

// Creacion de app de express ->
const app = express();

// Importacion de bodyParser para leer datos del formulario ->
app.use(bodyParser.urlencoded({ extended: true }));

// Importacion de los archivos estaticos ->
app.use(express.static("public"));

// Importacion pug ->
app.set("view engine", "pug");

// Añadiendo la carpeta de las vistas ->
app.set("views", path.join(__dirname, "./views"));

// Agregar flash messages ->
app.use(flash());

// Pasar vardump a la app ->
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// Importacion de rutas ->
app.use("/", routes());

// Puerto en el que se ejecutara el servidor ->
app.listen(4000);
