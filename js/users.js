/*********************************************************
 * USER PANEL LOGIC
 * - Carga productos desde JSON Server
 * - Muestra nombre, precio e imagen
 * - Permite crear pedidos (orders)
 * - Maneja sesión y logout
 *********************************************************/

// URL base de JSON Server
const API_URL = "http://localhost:3000";

// ELEMENTOS DEL DOM
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");


/*********************************************************
 * GUARDIÁN DE RUTA (SOLO USUARIOS)
 *********************************************************/
const isAuth = localStorage.getItem("isAuth");
const role = localStorage.getItem("role");

if (!isAuth || role !== "user") {
  // Si no está autenticado o no es user, vuelve al login
  window.location.href = "../index.html";
}

/*********************************************************
 * LOGOUT
 *********************************************************/
logoutBtn.addEventListener("click", () => {
  // Limpiamos toda la sesión
  localStorage.removeItem("isAuth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

  // Redirigimos al login
  window.location.href = "../index.html";
});

/*********************************************************
 * CARGA DE PRODUCTOS AL ENTRAR
 *********************************************************/
document.addEventListener("DOMContentLoaded", () => {
  loadTask();
});

/*********************************************************
 * FUNCIÓN PARA CARGAR Y MOSTRAR PRODUCTOS
 *********************************************************/
async function loadTask() {
  try {
    // Petición GET a productos
    const res = await fetch(`${API_URL}/task`);
    const task = await res.json();

    // Limpiamos la lista
    taskList.innerHTML = "";

    // Recorremos los productos
    task.forEach(task => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between ";

      li.innerHTML = `

        <strong>${task.name}</strong>
        <p>${task.desc}</p>
        <p>${task.state}</p>
        <p>${task.Ipriority}</p>

        <!-- Botón de pedido -->
        <button class="btn btn-primary btn-sm">
        Edit
        </button>
      `;

      /*********************************************************
       * CREAR ORDER (PEDIDO REAL)
       *********************************************************/
      li.querySelector("button").addEventListener("click", async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("Something went wrong...");
          return;
        }

        // Objeto order (relación user - product)
        const status = {
          userId: userId,
          taskId: task.id,
          taskName: task.name,
          advance: task.desc,
          date: new Date().toLocaleDateString()
        };

        // Guardamos el pedido en JSON Server
        await fetch(`${API_URL}/task`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(status)
        });

        alert("The advance placed successfully");
      });

      // Agregamos el producto al DOM
      taskList.appendChild(li);
    });

  } catch (error) {
    console.error("Error loading task:", error);
  }
}
