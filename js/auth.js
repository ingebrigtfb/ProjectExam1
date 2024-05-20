//så du ikke kan gå innpå admin uten å ha logget inn

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;
    const token = localStorage.getItem("token");

    //Sender brukeren tilbake til login hvis man ikke har token
    if ((currentPage.endsWith("/admin") || currentPage.endsWith("/admin.html")) && !token) {
        window.location.href = "../account/login.html"; 
    }
    if ((currentPage.endsWith("/make") || currentPage.endsWith("/make.html")) && !token) {
        window.location.href = "../account/login.html";
    }
    if ((currentPage.endsWith("/edit") || currentPage.endsWith("/edit.html")) && !token) {
        window.location.href = "../account/login.html"; 
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


