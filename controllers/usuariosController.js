const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handlers/email");

exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta",
  });
};

exports.formularioIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar sesion",
    error,
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
    // Crear una url de confirmacion ->
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
    // Crear el objeto de usuario ->
    const usuario = { email };
    // Enviar el email ->
    await enviarEmail.enviar({
      usuario,
      subject: "Confirma tu cuenta de Planifi-K ✔",
      confirmarUrl,
      archivo: "confirmarCuenta",
    });
    // Redirigir al usuario ->
    req.flash("correcto", "Te enviamos un correo, confirma tu cuenta");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crea tu cuenta",
      email,
      password,
    });
  }
};

exports.formularioReestablecerContraseña = (req, res) => {
  res.render("reestablecer", {
    nombrePagina: "Reestablece tu contraseña",
  });
};

// Cambiar el estado de una cuenta ->
exports.confirmarCuenta = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      email: req.params.email,
    },
  });
  // Si no existe el usuario ->
  if (!usuario) {
    req.flash("error", "No válido");
    res.redirect("/crear-cuenta");
  }
  usuario.activo = 1;
  await usuario.save();
  req.flash("correcto", "¡Haz activado tu cuenta satisfactoriamente!");
  res.redirect("/iniciar-sesion");
};
