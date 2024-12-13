const passport = require("passport");

const Usuarios = require("../models/Usuarios");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "¡Aun no has agregado nada en los campos!",
});

exports.usuarioAutenticado = (req, res, next) => {
  // Si el usuario esta autenticado, adelante ->
  if (req.isAuthenticated()) {
    return next();
  }
  // Si no esta autenticado, redirigir ->
  return res.redirect("/iniciar-sesion");
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

// Generar un token si el usuario es valido ->
exports.enviarToken = async (req, res) => {
  // Verificar que el usuario exista ->
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });
  // Si no existe el usuario... ->
  if (!usuario) {
    req.flash("error", "¡La cuenta que ingresaste no existe!");
    res.render("reestablecer", {
      nombrePagina: "Reestablece tu contraseña",
      mensajes: req.flash(),
    });
  }
};
