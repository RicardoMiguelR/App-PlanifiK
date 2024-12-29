const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Referenciar el modelo donde se va a autenticar ->
const Usuarios = require("../models/Usuarios");

// Local strategy - Login con credenciales propias (usuario y password) ->
passport.use(
  new LocalStrategy(
    // Por default passport ya espera un usuario y un password ->
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {
            email,
            activo: 1,
          },
        });
        // El usuario existe, password incorrecto ->
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: "¡Contraseña incorrecta!",
          });
        }
        // El mail existe y el password es correcto ->
        return done(null, usuario);
      } catch (error) {
        // Este usuario no existe ->
        return done(null, false, {
          message: "¡Esta cuenta no existe!",
        });
      }
    }
  )
);

// Serialzar el usuario ->
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

// Deserializar el usuario ->
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
