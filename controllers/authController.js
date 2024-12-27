const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const enviarEmail = require("../handlers/email");
const saltRounds = 10;

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
  // Enviar el correo con el token ->
  await enviarEmail.enviar({
    usuario,
    subject: "Password Reset ✔",
    resetUrl,
    archivo: "reestablecerPassword",
  });
  req.flash(
    "correcto",
    "Se envio el correo de reestablecimiento de tu contraseña a tu email"
  );
  res.redirect("/iniciar-sesion");
};

exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });
  // Si no se encuantra al usuario ->
  if (!usuario) {
    req.flash("error", "Token no válido");
    res.redirect("/reestablecer");
  }
  // Formulario para generar la contraseña ->
  res.render("resetPassword", {
    nombrePagina: "Reestablecer contraseña",
  });
};

// Actualizar el password ->
exports.actualizarPassword = async (req, res) => {
  // Verifica el token valido y fecha de expiracion ->
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });
  // Verificar si existe el usuario ->
  if (!usuario) {
    req.flash("error", "Token no válido");
    res.redirect("/reestablecer");
  }
  // Hashear el nuevo password ->
  usuario.password = await bcrypt.hash(req.body.password, saltRounds);
  usuario.token = null;
  usuario.expiracion = null;
  // Guardamos y actualizamos el nuevo password ->
  await usuario.save();
  // Redireccionamos ->
  req.flash("correcto", "¡Contraseña modificada exitosamente!");
  res.redirect("/iniciar-sesion");
};
