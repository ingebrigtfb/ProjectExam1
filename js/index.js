let slideInterval;

window.onload = fetchDisplayPosts;

//FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
  const outElement = document.getElementById("slideshowContainer");
  if (outElement !== null) {
    outElement.innerHTML = `<div class="loading">Loading...</div>`;
  }

  const url = "https://v2.api.noroff.dev/blog/posts/ingebrigt_fb";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const postData = await response.json();
      if (postData.data.length > 0) {
        displayPosts(postData.data);
        displayCarouselPosts(postData.data);
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

//funksjon for å vise 3 nyeste postsa i carusel
function displayCarouselPosts(posts) {
  //console.log("displayCarouselPosts");
  const slideshowContainer = document.getElementById("slideshowContainer");
  const dotsContainer = document.getElementById("slideshowDots");

  slideshowContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  slideIndex = 1;

  posts.slice(0, 3).forEach((post, index) => {
    const slide = document.createElement("div");
    slide.classList.add("apiSlides");
    const slideContent = document.createElement("div");
    slideContent.classList.add("slide-content");
    slide.innerHTML = `
        <div class="numbertext">${index + 1} / ${Math.min(
      3,
      posts.length
    )}</div>
        <div class="slide-content-inner"> 
            <img src="${post.media.url}">
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
            <div class="background-container"> 
            <h2 class="post-title">${post.title}</h2>
            <a class="more-btn" href="./post/spesific-post.html?postId=${
              post.id
            }">READ MORE</a>
        </div>
        </div>
        `;
    slide.appendChild(slideContent);

    slideshowContainer.appendChild(slide);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => currentSlide(index + 1);
    dotsContainer.appendChild(dot);
  });

  showSlides(slideIndex);

  setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function plusSlides(n) {
  clearInterval(slideInterval);
  showSlides((slideIndex += n));
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides((slideIndex = n));
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("apiSlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//funksjon for å vise 4 posts under carousel
function displayPosts(posts) {
  const postsContainer = document.getElementById("postContIndex");
  console.log(posts);

  postsContainer.innerHTML = "";

  //viser de 4,5,6,7 nyeste postsa
  for (let i = 3; i < Math.min(posts.length, 7); i++) {
    const post = posts[i];
    console.log(i);
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
      window.location.href = `./post/spesific-post.html?postId=${post.id}`;
    });

    postElement.appendChild(titleElement);
    postElement.appendChild(readMoreBtn);
    postsContainer.appendChild(postElement);
  }
}
