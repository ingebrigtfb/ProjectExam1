let slideInterval;

window.onload = fetchDisplayPosts;

//FUNCTION FOR Å HENTE FREM POSTSA
async function fetchDisplayPosts() {
  const outElement = document.getElementById(
    "slideshowContainer",
    "allBlogPosts"
  );
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

    const words = post.title.split(" ");
    let longestWordIndex = 0; 

    // finner det lengeste ordet
    for (let i = 1; i < words.length; i++) {
      if (words[i].length > words[longestWordIndex].length) {
        longestWordIndex = i;
      }
    }

    const longestWord = words[longestWordIndex];

    // gul farge
    const yellowColor = "#FFE500";

    // Setter color span på lengste ordet
    const coloredTitle = post.title.replace(
      longestWord,
      `<span style="color: ${yellowColor};">${longestWord}</span>`
    );

    slide.innerHTML = `
        </div>
        <div class="slide-content-inner">
            <img src="${post.media.url}" alt="${post.media.alt}">
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a> 
            <div class="background-container"> 
            <h2 class="post-title">${coloredTitle}</h2>
            <a class="more-btn" href="./post/spesific-post.html?postId=${post.id}">READ MORE</a>
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

  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
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

  // legger til en active class og gjør den som er active til svart
  dots[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].style.backgroundColor = "black";
}

//funksjon for å vise alle post på side i spesifikt oppsett
function displayAllPosts(posts) {
  const allBlogPosts = document.getElementById("allBlogPosts");

  allBlogPosts.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("a");
    postElement.href = `./post/spesific-post.html?postId=${post.id}`;
    postElement.classList.add("post");

    const words = post.title.split(" ");
    let longestWordIndex = 0; 

    // finner det lengeste ordet
    for (let i = 1; i < words.length; i++) {
      if (words[i].length > words[longestWordIndex].length) {
        longestWordIndex = i;
      }
    }
    const longestWord = words[longestWordIndex];

    //farge for tittel
    const yellowColor = "#FFE500";

    //setter en span rundt randomword
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
