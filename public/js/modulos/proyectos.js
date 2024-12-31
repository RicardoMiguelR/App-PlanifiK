import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", async (e) => {
    const proyectoUrl = e.target.dataset.proyectoUrl;
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás recuperar este proyecto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminalo!",
    });
    if (result.isConfirmed) {
      // Enviamos peticion axios ->
      const url = `${location.origin}/proyectos/${proyectoUrl}`;
      try {
        const respuesta = await axios.delete(url, { params: { proyectoUrl } });
        if (respuesta.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Proyecto eliminado!",
            text: respuesta.data,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/";
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "¡Hubo un error!",
          text: "No se pudo eliminar el proyecto",
        });
      }
    }
  });
}

export default btnEliminar;
