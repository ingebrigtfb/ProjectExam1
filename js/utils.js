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




//FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
    const url = 'https://v2.api.noroff.dev/blog/posts/ingebrigt_fb';

    try {
        const response = await fetch(url);

        if (response.ok) {
            const postData = await response.json();
            displayPosts(postData.data);
        } else {
            console.error('Could not fetch posts', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching the posts', error)
    }
}