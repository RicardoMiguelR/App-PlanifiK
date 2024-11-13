import axios from "axios";
import Swal from "sweetalert2";
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
    if (e.target.classList.contains("fa-trash")) {
      const tareaHtml = e.target.parentElement.parentElement;
      const idTarea = tareaHtml.dataset.tarea;
      const result = await Swal.fire({
        title: "¿Seguro quieres borrar esta tarea?",
        text: "¡No la podrás recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "¡Si, eliminala!",
      });
      if (result.isConfirmed) {
        const url = `${location.origin}/tareas/${idTarea}`;
        try {
          const respuesta = await axios.delete(url, { params: { idTarea } });
          if (respuesta.status === 200) {
            tareaHtml.parentElement.removeChild(tareaHtml);
            Swal.fire({
              title: "¡Tarea eliminada exitosamente!",
              text: respuesta.data,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            //   setTimeout(() => {
            //     window.location.href = "/";
            //   }, 2000);
          }
          console.log(respuesta);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Hubo un error!",
            text: "No se pudo eliminar el proyecto",
          });
        }
      }
    }
  });
}

export default tareas;
