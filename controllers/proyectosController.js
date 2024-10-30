const Proyectos = require("../models/Proyectos");
const { validationResult } = require("express-validator");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  // Vereficamos si hay errores de validacion ->
  const errores = validationResult(req);
  // Si hay errores, renderizamos el formulario de nuevo con los mensajes de erorr ->
  if (!errores.isEmpty()) {
    return res.render("nuevoProyecto", {
      nombrePagina: "Nuevo proyecto",
      errores: errores.array(),
      proyectos,
    });
  }
  // Si no hay errores, se agrega el proyecto ->
  const { nombre } = req.body;
  try {
    await Proyectos.create({ nombre });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  if (!proyecto) return next();
  // Render a la vista ->
  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
  });
};

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  // Render a la vista ->
  res.render("nuevoProyecto", {
    nombrePagina: "Editar proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  // Vereficamos si hay errores de validacion ->
  const errores = validationResult(req);
  // Si hay errores, renderizamos el formulario de nuevo con los mensajes de erorr ->
  if (!errores.isEmpty()) {
    return res.render("nuevoProyecto", {
      nombrePagina: "Nuevo proyecto",
      errores: errores.array(),
      proyectos,
    });
  }
  // Si no hay errores, se actualiza el proyecto ->
  const { nombre } = req.body;
  try {
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  // req, query o params ->
  const { proyectoUrl } = req.query;
  const resultado = await Proyectos.destroy({ where: { url: proyectoUrl } });
  if (!resultado) {
    return next();
  }
  res.status(200).send("Proyecto eliminado correctamente");
};
