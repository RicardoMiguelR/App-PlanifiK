import Swal from "sweetalert2";

export const actualizarAvance = () => {
  // Seleccionar las tareas existentes ->
  const tareas = document.querySelectorAll("li.tarea");
  if (tareas.length) {
    // Seleccionar las tareas completadas ->
    const tareasCompletas = document.querySelectorAll("i.completo");
    // Calcular el avance ->
    const tareasAvance = Math.round(
      (tareasCompletas.length / tareas.length) * 100
    );
    // Mostrar el avance ->
    const porcentaje = document.querySelector("#porcentaje");
    porcentaje.style.width = `${tareasAvance}%`;
    porcentaje.textContent = `${tareasAvance}%`;

    // Alerta por tareas completas ->
    if (tareasAvance === 100) {
      Swal.fire({
        html: `
            <div style="align-items: center; justify-content: center; gap: 10px;">
              <img 
                src="https://media.tenor.com/TM0Xkja0docAAAAj/cr7-si.gif" 
                alt="CR7 Siu" 
                style="width: 80px; height: auto; display: inline-block;" />
              <div style="text-align: center;">
                <h2 style="margin: 0; color: #823bb1a9;">¡Bien hecho, haz completado todas las tareas del proyecto!</h2>
              </div>
            </div>
          `,
        width: 600,
        padding: "2em",
        color: "#823bb1a9",
        backdrop: `
            url("https://i.pinimg.com/originals/1e/bd/62/1ebd62592ece9c36f32347098a8ddb21.gif")
            center center
            /cover
            no-repeat
          `,
        confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> ¡Grandioso!
          `,
      });
    }
  }
};
