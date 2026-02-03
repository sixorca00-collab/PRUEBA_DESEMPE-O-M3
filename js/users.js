// USER PANEL LOGI
const API_URL = "http://localhost:3000";
// DOM ELEMENTS
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");

// MODAL STATE
let selectedTaskId = null;
let modalInstance = null;


 //ROUTE GUARD

const isAuth = localStorage.getItem("isAuth");
const role = localStorage.getItem("role");

if (!isAuth || role !== "user") {
  window.location.href = "../index.html";
}


 // LOGOUT

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  window.location.href = "../index.html";
});


 // LOAD TASKS

document.addEventListener("DOMContentLoaded", loadTask);


 // FETCH AND RENDER TASKS

async function loadTask() {
  try {
    const res = await fetch(`${API_URL}/task`);
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">

          <div class="flex-fill">${task.name}</div>
          <div class="flex-fill">${task.desc}</div>
          <div class="flex-fill">${task.state}</div>
          <div class="flex-fill">${task.Ipriority}</div>

          <div class="flex-fill text-end">
            <button class="btn btn-primary btn-sm edit-btn">
              Edit
            </button>
          </div>

        </div>
      `;

      li.querySelector(".edit-btn").addEventListener("click", () => {
        selectedTaskId = task.id;

        document.getElementById("modalTaskName").textContent = task.name;
        document.getElementById("modalTaskState").value = task.state;

        const modalEl = document.getElementById("editTaskModal");
        modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();
      });

      taskList.appendChild(li);
    });

  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

//SAVE TASK STATE FROM MODAL

document
  .getElementById("saveTaskStateBtn")
  .addEventListener("click", async () => {

    const newState = document.getElementById("modalTaskState").value;
    if (!selectedTaskId) return;

    try {
      const res = await fetch(`${API_URL}/task/${selectedTaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ state: newState })
      });

      if (!res.ok) throw new Error("Update failed");

      modalInstance.hide();
      selectedTaskId = null;
      loadTask();
      alert("Task updated successfully ");

    } catch (error) {
      console.error(error);
      alert("Error updating task ");
    }
  });
