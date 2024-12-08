const passport = require("passport");

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
