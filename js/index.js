let slideInterval;

// FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
  const outElement = document.getElementById("slideshowContainer", "allBlogPosts");
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

// funksjon for å vise de 3 siste bildene i carousel
function displayCarouselPosts(posts) {
  const slideshowContainer = document.getElementById("slideshowContainer");
  const dotsContainer = document.getElementById("slideshowDots");

  slideshowContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  slideIndex = 1;

  let loadCount = 0; 
  const slides = [];

  posts.slice(0, 3).forEach((post, index) => {
    const slide = document.createElement("div");
    slide.classList.add("apiSlides");

    const slideContent = document.createElement("div");
    slideContent.classList.add("slide-content");

    const words = post.title.split(" ");
    let longestWordIndex = 0;

    //finner det lengste ordet 
    for (let i = 1; i < words.length; i++) {
      if (words[i].length > words[longestWordIndex].length) {
        longestWordIndex = i;
      }
    }
    //setter gulfarge på lengste ordet 
    const longestWord = words[longestWordIndex];
    const yellowColor = "#FFE500";
    const coloredTitle = post.title.replace(
      longestWord,
      `<span style="color: ${yellowColor};">${longestWord}</span>`
    );

    const img = new Image();  
    img.src = post.media.url;
    img.alt = post.media.alt;
    img.onload = imageLoaded;  

    slide.innerHTML = `
      <div class="slide-content-inner">
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a> 
          <div class="background-container"> 
          <h2 class="post-title">${coloredTitle}</h2>
          <a class="more-btn" href="./post/spesific-post.html?postId=${post.id}">READ MORE</a>
      </div>
      </div>
    `;
    slide.querySelector(".slide-content-inner").insertBefore(img, slide.querySelector(".prev")); 
    slide.appendChild(slideContent);
    slides.push(slide);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => currentSlide(index + 1);
    dotsContainer.appendChild(dot);
  });

  function imageLoaded() {
    loadCount++;
    if (loadCount === slides.length) {  //ser om alle bildene er lastet inn
      slides.forEach(slide => slideshowContainer.appendChild(slide));
      showSlides(slideIndex);

      slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
      }, 5000);
    }
  }
}

function plusSlides(n) {
  clearInterval(slideInterval);
  slideIndex += n;
  showSlides(slideIndex);
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  slideIndex = n;
  showSlides(slideIndex);
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("apiSlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
    dots[i].style.backgroundColor = "white";
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].style.backgroundColor = "black";
}

// function for å vise alle postsa
function displayAllPosts(posts) {
  const allBlogPosts = document.getElementById("allBlogPosts");
  allBlogPosts.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("a");
    postElement.href = `./post/spesific-post.html?postId=${post.id}`;
    postElement.classList.add("post");

    const words = post.title.split(" ");
    let longestWordIndex = 0;

    for (let i = 1; i < words.length; i++) {
      if (words[i].length > words[longestWordIndex].length) {
        longestWordIndex = i;
      }
    }
    const longestWord = words[longestWordIndex];
    const yellowColor = "#FFE500";
    const coloredTitle = post.title.replace(
      longestWord,
      `<span style="color: ${yellowColor};">${longestWord}</span>`
    );

    if (post.media && post.media.url && post.media.alt) {
      const imageElement = document.createElement("img");
      imageElement.src = post.media.url;
      imageElement.alt = post.media.alt;
      postElement.appendChild(imageElement);
    }

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = coloredTitle;

    const readMoreBtn = document.createElement("a");
    readMoreBtn.textContent = "READ MORE";
    readMoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = `./post/spesific-post.html?postId=${post.id}`;
    });

    postElement.appendChild(titleElement);
    postElement.appendChild(readMoreBtn);
    allBlogPosts.appendChild(postElement);
  });
}

let slideshowContainer = document.getElementById("slideshowContainer");

slideshowContainer.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

slideshowContainer.addEventListener("mouseleave", () => {
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
});

window.onload = fetchDisplayPosts;
