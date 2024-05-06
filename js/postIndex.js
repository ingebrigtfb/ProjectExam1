//FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
  const outElement = document.getElementById("allBlogPosts");
  if (outElement !== null) {
    outElement.innerHTML = `<div class="loading">Loading...</div>`;
  }

  const url = "https://v2.api.noroff.dev/blog/posts/ingebrigt_fb";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const postData = await response.json();
      if (postData.data.length > 0) {
        displayAllPosts(postData.data);
      } else {
        outElement.innerHTML = `<div class="loading">No posts made :)</div>`;
      }
    } else {
      console.error("Could not fetch posts", response.statusText);
    }
  } catch (error) {
    outElement.innerHTML = `<div class="loading">Error fetching the posts. Please try again later.</div>`;
    console.error("Error fetching the posts", error);
  }
}

//funksjon for å vise alle post på public side i spesifikt oppsett
function displayAllPosts(posts) {
  const allBlogPosts = document.getElementById("allBlogPosts");

  allBlogPosts.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    if (post.media && post.media.url) {
      const imageElement = document.createElement("img");
      imageElement.src = post.media.url;
      postElement.appendChild(imageElement);
    }

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;

    const readMoreBtn = document.createElement("a");
    readMoreBtn.textContent = "READ MORE";

    readMoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = `./spesific-post.html?postId=${post.id}`;
    });

    postElement.appendChild(titleElement);
    postElement.appendChild(readMoreBtn);
    allBlogPosts.appendChild(postElement);
  });
}

window.onload = fetchDisplayPosts;
