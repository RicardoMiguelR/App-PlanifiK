const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Importacion de los controladores ->
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");

module.exports = function () {
  // Renderizar proyectos en vista home ->
  router.get("/", proyectosController.proyectosHome);
  // Renderizar formulario para nuevos proyectos ->
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  // Crear un nuevo proyecto ->
  router.post(
    "/nuevo-proyecto",
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
  router.get("/proyectos/:url", proyectosController.proyectoPorUrl);
  // Traemos proyectos mediante id para editar ->
  router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
  // Actualizar proyecto mediante id ->
  router.post(
    "/nuevo-proyecto/:id",
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
  router.delete("/proyectos/:url", proyectosController.eliminarProyecto);
  // Agregar una tarea en proyecto ->
  router.post("/proyectos/:url", tareasController.agregarTarea);
  // Cambiar el estado a completado o no de una tarea ->
  router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);
  // Eliminar una tarea ->
  router.delete("/tareas/:id", tareasController.eliminarTarea);
  // Crear cuenta de usuario ->
  router.get("/crear-cuenta", usuariosController.formularioCrearCuenta);
  router.post("/crear-cuenta", usuariosController.crearCuenta);
  // Iniciar sesion ->
  router.get("/iniciar-sesion", usuariosController.formularioIniciarSesion);

  return router;
};
