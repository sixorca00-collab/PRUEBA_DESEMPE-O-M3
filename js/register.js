export function registerUser() {
  const btn = document.getElementById("btnRegister");

  btn.addEventListener("click", async () => {
    const username = document.getElementById("rUser").value;
    const password = document.getElementById("rPass").value;
    const Cpassword = document.getElementById("CrPass").value;    
    const role = document.getElementById("rRole").value;
 // Basic validation
    if (!username || !password || !Cpassword) {
      alert("Fill all fields");
      return;
    } 
    else if(password != Cpassword){
      alert("The passwords no same")
      return;
    }
// We checked that the user does not exist.
    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const data = await res.json();

    if (data.length > 0) {
      alert("User already exists");
      return;
    }
// Send user to database
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });

    alert("User registered");
  });
}
