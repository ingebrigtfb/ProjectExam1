// ser om brukeren allerde er logget inn 
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    const userIcon = document.querySelector(".header-btns a[href='./login.html']");

    if (token && userIcon) {
        // hvis den finner token og iconet så oppdateres href pathen
        userIcon.href = "admin.html";
    } 
});


// Add event listener til login formet
const loginForm = document.getElementById("login");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch("https://v2.api.noroff.dev/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            const token = data.data.accessToken;
            const name = data.data.name;
            console.log(data);

            localStorage.setItem("token", token);
            localStorage.setItem("name", name);

            window.location.href = "admin.html";
        } catch (error) {
            console.error("Error:", error);
            alert("Invalid email or password. Please try again.");
        }
    });
}

// Add event listener for logout knappen
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("name");

            // sender bruker til login page
            window.location.href = "/account/login.html";
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const token = localStorage.getItem('token');

    if (token) {
        logoutBtn.style.display = 'block'; // viser log ut knappen hvis det er token 
    } 
});