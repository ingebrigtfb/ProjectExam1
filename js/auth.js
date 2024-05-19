//så du ikke kan gå innpå admin uten å ha logget inn

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;
    const token = localStorage.getItem("token");

    if (currentPage.includes("admin.html") && !token) {
        window.location.href = "../account/login.html"; // sender brukeren tilbake til login 
    }
    if (currentPage.includes("make.html") && !token) {
        window.location.href = "../account/login.html"; // sender brukeren tilbake til login 
    }
    if (currentPage.includes("edit.html") && !token) {
        window.location.href = "../account/login.html"; // sender brukeren tilbake til login 
    }
});

// ser om brukeren allerde er logget inn 
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    const userIcon = document.querySelector(".nav-item a[href='./login.html']");

    if (token && userIcon) {
        // hvis den finner token og iconet så oppdateres href pathen
        userIcon.href = "admin.html";
    } 
});




