const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");
const { validationResult } = require("express-validator");

exports.proyectosHome = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });
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
    const UsuarioId = res.locals.usuario.id;
    await Proyectos.create({ nombre, UsuarioId });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const UsuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { UsuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
      UsuarioId,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  if (!proyecto) {
    return next();
  }

  // consultamos tareas de proyecto actual
  const tareas = await Tareas.findAll({
    where: {
      ProyectoId: proyecto.id,
    },
    include: [{ model: Proyectos }],
  });

  // Render a la vista ->
  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
    tareas,
  });
};

exports.formularioEditar = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { UsuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
      UsuarioId,
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
  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });
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

// **** Bug pendiente, se elimina proyecto y no se actualiza ni se redirige a vista sin proyecto eliminado **** --->
exports.eliminarProyecto = async (req, res, next) => {
  // req, query o params ->
  const { proyectoUrl } = req.query;
  const resultado = await Proyectos.destroy({ where: { url: proyectoUrl } });
  if (!resultado) {
    return next();
  }
  res.status(200).send("Proyecto eliminado correctamente");
};
