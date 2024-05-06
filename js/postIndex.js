
//FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
    const outElement = document.getElementById("postsContainer");
  if (outElement !== "none") {
    outElement.innerHTML = `<div class="loading">Loading...</div>`;
  }
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
        readMoreBtn.textContent = 'READ MORE';

        readMoreBtn.addEventListener('click', function(event){
            event.preventDefault();
            window.location.href = `./spesific-post.html?postId=${post.id}`;
        });

        postElement.appendChild(titleElement);
        postElement.appendChild(readMoreBtn);
        postsContainer.appendChild(postElement);
    });

}

window.onload = fetchDisplayPosts;

