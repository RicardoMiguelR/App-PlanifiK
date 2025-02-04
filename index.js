const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
// Extraer valores de variables . ->
require("dotenv").config({ path: ".env" });

// Helpers con funciones ->
const helpers = require("./helpers");

// Creacion de la conexion a base de datos ->
const sequelize = require("./config/db");
const { vardump } = require("./helpers");

//Importacion de modelos ->
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");
require("./models/associations");

async function connectDatabase() {
  try {
    await sequelize.sync();
    console.log("La conexión se ha establecido exitosamente...");
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
}

connectDatabase();

// Creacion de app de express ->
const app = express();

// Importacion de los archivos estaticos ->
app.use(express.static("public"));

// Importacion pug ->
app.set("view engine", "pug");

// Importacion de bodyParser para leer datos del formulario ->
app.use(bodyParser.urlencoded({ extended: true }));

// Añadiendo la carpeta de las vistas ->
app.set("views", path.join(__dirname, "./views"));

// Agregar flash messages ->
app.use(flash());

// Agregar cookie-parser ->
app.use(cookieParser());

// Agregar express-session, permite navegar por distintas paginas sin autenticarse nuevamente ->
app.use(
  session({
    secret: "superSecreto",
    resave: false,
    saveUninitialized: false,
  })
);

// Agregar passport para autenticacion de usuarios ->
app.use(passport.initialize());
app.use(passport.session());

// Pasar vardump a la app ->
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  // Almacenamos los datos del usuario autenticado ->
  res.locals.usuario = { ...req.user } || null;
  next();
});

// Importacion de rutas ->
app.use("/", routes());

// Servidor y puerto ->
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log("El servidor esta corriendo exitosamente...");
});
