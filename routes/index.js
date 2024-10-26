const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Importacion de el controlador ->
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
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
  router.get("/proyectos/:url", proyectosController.proyectoPorUrl);
  router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
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

  return router;
};
