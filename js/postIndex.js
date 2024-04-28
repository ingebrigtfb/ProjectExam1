
//funksjon for å vise alle post på public side i spesifikt oppsett
function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        if (post.media && post.media.url) {
            const imageElement = document.createElement('img');
            imageElement.src = post.media.url;
            postElement.appendChild(imageElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const readMoreBtn = document.createElement('a');
        readMoreBtn.textContent = 'Read more';
        readMoreBtn.href = '#'

        readMoreBtn.addEventListener('click', function(event){
            event.preventDefault();
        });

        postElement.appendChild(titleElement);
        postElement.appendChild(readMoreBtn);
        postsContainer.appendChild(postElement);
    });

}

window.onload = fetchDisplayPosts;








//const bodyElement = document.createElement('p');
        //bodyElement.textContent = post.body;


        //postElement.appendChild(bodyElement);