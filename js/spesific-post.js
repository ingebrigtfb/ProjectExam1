window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    fetchPostById(postId);
};

async function fetchPostById(postId) {
    const url = `https://v2.api.noroff.dev/blog/posts/ingebrigt_fb/${postId}`;
    try {
        const response = await fetch(url);

        if (response.ok) {
            const postData = await response.json();
            displayPostById(postData.data);
        } else {
            console.error('Could not fetch post', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching the post', error);
    }
}

function displayPostById(post) {
    const idPostContainer = document.getElementById('idPostContainer');
    idPostContainer.innerHTML = '';
    console.log(post)

    const postElement = document.createElement('div');
    postElement.classList.add('spesPost');

    if (post.media && post.media.url) {
        const imageElement = document.createElement('img');
        imageElement.src = post.media.url;
        postElement.appendChild(imageElement);
    }

    var writtenBy = "Written by: "
    const authorElement = document.createElement('p');
    authorElement.textContent = writtenBy + post.author.name;

    var lastUpdated = "Last updated : "
    const dateElement = document.createElement('p');
    dateElement.textContent = lastUpdated + post.updated;

    const titleElement = document.createElement('h2');
    titleElement.textContent = post.title;

    const bodyElement = document.createElement('p'); 
    bodyElement.textContent = post.body;

    postElement.appendChild(authorElement);
    postElement.appendChild(dateElement)
    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);
    idPostContainer.appendChild(postElement);
}
