//funksjon for å fetche poster 

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


//funksjon for å vise posts på siden 
function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = post.body;

        postElement.appendChild(titleElement);
        postElement.appendChild(bodyElement);

        if (post.media && post.media.url) {
            const imageElement = document.createElement('img');
            imageElement.src = post.media.url;
            postElement.appendChild(imageElement);
        }

        postsContainer.appendChild(postElement);
    });

}

window.onload = fetchDisplayPosts;



