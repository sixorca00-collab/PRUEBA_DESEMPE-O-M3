import { registerUser } from "./register.js";
import { loginUser } from "./login.js";

// Cambiar vistas
const registerView = document.getElementById("registerView");
const loginView = document.getElementById("loginView");

document.getElementById("goLogin").onclick = () => {
  registerView.classList.add("d-none");
  loginView.classList.remove("d-none");
};

document.getElementById("goRegister").onclick = () => {
  loginView.classList.add("d-none");
  registerView.classList.remove("d-none");
};

// Funciones principales
registerUser();
loginUser();
