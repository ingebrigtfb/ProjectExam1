//Hamburger mny

function hamburgerMenu() {
    const menuBtns = document.querySelectorAll('.hamburger');
    const mobileMenu = document.querySelector('.nav-menu');

    menuBtns.forEach(function (menuBtn) {
        menuBtn.addEventListener('click', function () {
            menuBtn.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
            document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    hamburgerMenu();
});
