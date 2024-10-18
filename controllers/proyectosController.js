const Proyectos = require("../models/Proyectos");
const { validationResult } = require("express-validator");
// const slug = require("slug");

exports.proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo proyecto",
  });
};

exports.nuevoProyecto = async (req, res) => {
  // Vereficamos si hay errores de validacion ->
  const errores = validationResult(req);
  // Si hay errores, renderizamos el formulario de nuevo con los mensajes de erorr ->
  if (!errores.isEmpty()) {
    return res.render("nuevoProyecto", {
      nombrePagina: "Nuevo proyecto",
      errores: errores.array(),
    });
  }
  // Si no hay errores, se agrega el proyecto ->
  const { nombre } = req.body;
  try {
    // const url = slug(nombre).toLowerCase();
    await Proyectos.create({ nombre });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  //   // Validar que tengamos algo en el input ->
  //   const { nombre } = req.body;
  //   let errores = [];

  //   if (!nombre) {
  //     errores.push({ texto: "Agrega un nombre al proyecto" });
  //   } else if (errores.length > 0) {
  //     res.render("nuevoProyecto", {
  //       nombrePagina: "Nuevo proyecto",
  //       errores,
  //     });
  //   } else {
  //     const proyecto = await Proyectos.create({ nombre });
  //     res.redirect("/");
  //   }
};
