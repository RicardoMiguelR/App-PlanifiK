const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");

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
    res.redirect("/reestablecer");
  }
  // El usuario existe ->
  usuario.token = crypto.randomBytes(20).toString("hex");
  // expiracion de token ->
  usuario.expiracion = Date.now() + 3600000;
  // Almacenar en BD ->
  await usuario.save();
  // Generar url de reset ->
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
  console.log(resetUrl);
};

exports.resetPassword = async (req, res) => {
  res.json(req.params.token);
};
