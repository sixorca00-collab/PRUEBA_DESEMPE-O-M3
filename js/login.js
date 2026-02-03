// LOGIN USER
export function loginUser() {
  const btn = document.getElementById("btnLogin");

  if (!btn) return;

  btn.addEventListener("click", async () => {

    const username = document.getElementById("lUser").value;
    const password = document.getElementById("lPass").value;

    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:3000/users?username=${username}&password=${password}`
      );

      const users = await res.json();

      if (users.length === 0) {
        alert("Invalid credentials");
        return;
      }

      const user = users[0];

      // SAVE SESSION
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      // REDIRECT
      if (user.role === "admin") {
        window.location.href = "./pages/admin.html";
      } else {
        window.location.href = "./pages/task.html";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }

  });
}