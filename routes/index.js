const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Importacion de los controladores ->
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
  // Renderizar proyectos en vista home ->
  router.get(
    "/",
    authController.usuarioAutenticado,
    proyectosController.proyectosHome
  );

  // Renderizar formulario para nuevos proyectos ->
  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto
  );

  // Crear un nuevo proyecto ->
  router.post(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    [
      body("nombre")
        .notEmpty()
        .withMessage("¡Debes incluir un nombre a tu proyecto!")
        .trim()
        .escape(),
    ],
    proyectosController.nuevoProyecto
  );

  // Traemos proyectos mediante la url ->
  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl
  );

  // Traemos proyectos mediante id para editar ->
  router.get(
    "/proyecto/editar/:id",
    authController.usuarioAutenticado,
    proyectosController.formularioEditar
  );

  // Actualizar proyecto mediante id ->
  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    [
      body("nombre")
        .notEmpty()
        .withMessage("¡Debes actualizar el nombre de tu proyecto!")
        .trim()
        .escape(),
    ],
    proyectosController.actualizarProyecto
  );

  // Eliminar un proyecto ->
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto
  );

  // Agregar una tarea en proyecto ->
  router.post(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    tareasController.agregarTarea
  );

  // Cambiar el estado a completado o no de una tarea ->
  router.patch(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );

  // Eliminar una tarea ->
  router.delete(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
  );

  // Crear cuenta de usuario ->
  router.get("/crear-cuenta", usuariosController.formularioCrearCuenta);
  router.post("/crear-cuenta", usuariosController.crearCuenta);

  // Iniciar sesion ->
  router.get("/iniciar-sesion", usuariosController.formularioIniciarSesion);
  router.post("/iniciar-sesion", authController.autenticarUsuario);

  // Cerrar sesion ->
  router.get("/cerrar-sesion", authController.cerrarSesion);

  // Reestablecer contraseña ->
  router.get(
    "/reestablecer",
    usuariosController.formularioReestablecerContraseña
  );
  router.post("/reestablecer", authController.enviarToken);
  router.get("/reestablecer/:token", authController.validarToken);
  router.post("/reestablecer/:token", authController.actualizarPassword);

  return router;
};
