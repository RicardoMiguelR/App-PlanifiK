const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Importar el controlador ->
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    // body("nombre").not().isEmpty().trim().escape(),
    // proyectosController.nuevoProyecto
    [
      body("nombre")
        .notEmpty()
        .withMessage("¡Debes incluir un nombre a tu proyecto!")
        .trim()
        .escape(),
    ],
    proyectosController.nuevoProyecto
  );

  return router;
};
