document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        if(data === "success"){
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Registration failed");
        }
    });
});
