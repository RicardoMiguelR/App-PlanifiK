import axios from "axios";
const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      // request hacia "/tareas/:id" ->
      const url = `${location.origin}/tareas/${idTarea}`;
      try {
        const respuesta = await axios.patch(url, { idTarea });
        if (respuesta.status === 200) {
          icono.classList.toggle("completo");
        }
        console.log(respuesta);
      } catch (error) {
        console.error("¡Error al actualizar el estado de la tarea!", error);
      }
    }
  });
}

export default tareas;
