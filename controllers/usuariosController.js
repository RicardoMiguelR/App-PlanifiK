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
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear cuenta en Uptask",
    });
  }
};
