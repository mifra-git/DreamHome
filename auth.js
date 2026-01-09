const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// Toggle to Register
showRegister.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

// Toggle to Login
showLogin.addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// TODO: Add form submit handlers here
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login submitted! (Backend integration coming next)");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Register submitted! (Backend integration coming next)");
});
// REGISTER
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&email=${email}&password=${password}`
    })
    .then(res => res.text())
    .then(data => {
        if (data === "success") alert("Registered successfully! Please login.");
        else if (data === "exists") alert("Email already exists.");
        else alert("Error occurred.");
    });
});

// LOGIN
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${email}&password=${password}`
    })
    .then(res => res.text())
    .then(data => {
        if (data === "success") window.location.href = "index.html";
        else alert("Invalid email or password");
    });
});
