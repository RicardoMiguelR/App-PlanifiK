const Usuarios = require("../models/Usuarios");

exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en Uptask",
  });
};

exports.crearCuenta = (req, res) => {
  // Leer los datos ->
  const { email, password } = req.body;
  // Enviar el formulario ->
  Usuarios.create({
    email,
    password,
  }).then(() => {
    res.redirect("/iniciar-sesion");
  });
};
