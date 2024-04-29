//Vise brukernavn ved innlogging til admin 

var usernameData = localStorage.getItem('name');

if(usernameData) {
    document.getElementById('userName').innerText = usernameData;
} else {
    document.getElementById('userName').innerText = 'No data'
}

//HVORDAN POSTENE SKAL SE UT PÅ ADMIN SIDEN
function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('postAdmin');
        
        if (post.media && post.media.url) {
            const imageElement = document.createElement('img');
            imageElement.src = post.media.url;
            postElement.appendChild(imageElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deletePost(post.id);
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', function() {
            window.location.href = `/post/edit.html?postId=${post.id}`;
        });

        postElement.appendChild(titleElement);
        postElement.appendChild(deleteBtn);
        postElement.appendChild(editBtn);
        postsContainer.appendChild(postElement);
    });

}


//FUNCTION FOR Å SLETTE POSTSA
async function deletePost(postId) {
    const url = `https://v2.api.noroff.dev/blog/posts/ingebrigt_fb/${postId}`;
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Bearer token not found in localStorage');
        return;
      } else {
        //console.log('token found')
      }

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log('Post deleted successfully');
            
            fetchDisplayPosts();
        } else {
            console.error('Failed to delete post:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}



window.onload = fetchDisplayPosts;


