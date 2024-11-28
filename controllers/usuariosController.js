const Usuarios = require("../models/Usuarios");

exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en Uptask",
  });
};

exports.crearCuenta = async (req, res) => {
  // Leer los datos ->
  const { email, password } = req.body;
  try {
    // Enviar el formulario ->
    await Usuarios.create({
      email,
      password,
    });
    res.redirect("/iniciar-sesion");
  } catch (error) {
    res.render("crearCuenta", {
      error: error.errors,
      nombrePagina: "Crear cuenta en Uptask",
    });
  }
};
