const API_URL = "http://localhost:3000";

const isAuth = localStorage.getItem("isAuth");
const role = localStorage.getItem("role");

if (!isAuth || role !== "admin") {
  // if not is validate
  window.location.href = "../index.html";
}

// Inputs and btn de logout
const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDesc");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");
const profileBtn = document.getElementById("profiletBtn")


// Load task to entry
document.addEventListener("DOMContentLoaded", loadTask);

// FUNCTION FOR LOADING TASK
async function loadTask() {
  taskList.innerHTML = "";

  const res = await fetch(`${API_URL}/task`);
  const taskes = await res.json();

  taskes.forEach(task=> {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
        <strong>${task.name}</strong>
        <p>${task.desc}</p>
        <p>${task.state}</p>
        <p>${task.Ipriority}</p>
      <button class="btn btn-danger btn-sm">Delete</button>
    `;

    // DELETE TASK
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`${API_URL}/task/${task.id}`, {
        method: "DELETE"
      });
      loadTask();
    });

    taskList.appendChild(li);
  });
}

// MAKE TASK
addTaskBtn.addEventListener("click", async () => {
  const name = taskNameInput.value;
  const desc = taskDescInput.value;
  const state = "pending";
  const Ipriority = priority.value

  if (!name || !desc ) {
    alert("Fill all fields");
    return;
  }

  await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      desc,
      state,
      Ipriority
    })
  });

  taskNameInput.value = "";
  taskDescInput.value = "";

  loadTask();
});
logoutBtn.addEventListener("click", () => {
  //DELETE SESSION
  localStorage.removeItem("isAuth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

// Redirect to login
  window.location.href = "../index.html";
});
// PROFILE MODAL 
if (profileBtn) {
  profileBtn.addEventListener("click", () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("No user logged in");
      return;
    }

    document.getElementById("Suser").textContent = currentUser.username;
    document.getElementById("modalprofile").textContent =
      "Role: " + currentUser.role;
    document.getElementById("idUser").textContent =
    "ID:" + currentUser.id

    const profileModal = new bootstrap.Modal(
      document.getElementById("Profile")
    );

    profileModal.show();
  });
}