//så du ikke kan gå innpå admin uten å ha logget inn

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;
    const token = localStorage.getItem("token");

    if (currentPage.includes("admin.html") && !token) {
        window.location.href = "../account/login.html"; // sender brukeren tilbake til login 
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // ser etter token i local storage
    const token = localStorage.getItem("token");

    // hvis den finner token blir du sendt til admin 
    if (token) {
        const signInLink = document.getElementById("signInLink");
        signInLink.addEventListener("click", function(event) {
            event.preventDefault(); // forhinderer å sende deg til login 
            window.location.href = "../account/admin.html"; // Sender deg til admin 
        });
    }
});


