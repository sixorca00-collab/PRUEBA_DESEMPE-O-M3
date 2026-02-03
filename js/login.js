export async function loginUser() {
  const btn = document.getElementById("btnLogin");

  btn.addEventListener("click", async () => {
    const username = document.getElementById("lUser").value;
    const password = document.getElementById("lPass").value;

// Basic validation
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

// Request to the server
    const res = await fetch(
      `http://localhost:3000/users?username=${username}&password=${password}`
    );

    const users = await res.json();

    // If there are no matches, the login is invalid.
    if (users.length === 0) {
      alert("Invalid credentials");
      return;
    }

    // Authenticated user (JSON Server returns array)
    const user = users[0];

  // We save the session (JSON Server does not handle sessions)
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("currentUser", user.username);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user.id);

    // Redirection based on role
    if (user.role === "admin") {
      window.location.href = "./pages/admin.html";
    } else {
      window.location.href = "./pages/task.html";
    }
  });
}
