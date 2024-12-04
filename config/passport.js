const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Referenciar el modelo donde se va a autenticar ->
const Usuarios = require("../models/Usuarios");
const { where } = require("sequelize");

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
        const usuario = await Usuarios.find({
          where: { email: email },
        });
      } catch (error) {
        // Este usuario no existe ->
        return done(null, false, {
          message: "Esta cuenta no existe",
        });
      }
    }
  )
);
