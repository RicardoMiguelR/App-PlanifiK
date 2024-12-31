const Proyectos = require("./Proyectos");
const Tareas = require("./Tareas");

// Configuración de asociaciones entre modelos ->
Tareas.belongsTo(Proyectos, {
  onDelete: "CASCADE",
  hooks: true,
});
Proyectos.hasMany(Tareas, {
  onDelete: "CASCADE",
  hooks: true,
});

module.exports = { Proyectos, Tareas };
