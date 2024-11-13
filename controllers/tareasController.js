const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
  //Obtencion del proyecto actual ->
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

  // Leer el valor del input ->
  const { tarea } = req.body;

  // Estado 0 = incompleto y ID del proyecto ->
  const estado = 0;
  const ProyectoId = proyecto.id;

  // Agregar a la base de datos ->
  const resultado = await Tareas.create({ tarea, estado, ProyectoId });

  if (!resultado) {
    return next();
  }

  res.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id } });
  // Cambio del estado de la tarea ->
  let estado = 0;
  if (tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;
  const resultado = await tarea.save();
  if (!resultado) {
    return next();
  }
  res.status(200).send("¡Estado actualizado!");
};

exports.eliminarTarea = async (req, res, next) => {
  const { id } = req.params;
  const resultado = await Tareas.destroy({ where: { id } });
  if (!resultado) {
    return next();
  }
  res.status(200).send("¡Tarea eliminada!");
};
