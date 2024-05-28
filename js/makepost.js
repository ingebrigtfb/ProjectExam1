//FUNKSJON FOR Å LAGE POSTS
document.addEventListener("DOMContentLoaded", function () {
  const makePostForm = document.getElementById("makePostForm"); //hente inn id fra form

  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("body");
  const titleCounter = document.getElementById("titleCounter");
  const bodyCounter = document.getElementById("bodyCounter");

  // title tekst counter
  titleInput.addEventListener('input', () => {
    const currentLength = titleInput.value.length;
    titleCounter.textContent = `${currentLength}/70`;
  });

  // body tekst counter
  bodyInput.addEventListener('input', () => {
    const currentLength = bodyInput.value.length;
    bodyCounter.textContent = `${currentLength}/2000`;
  });

  makePostForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // HENTE INN FORM data
    const title = titleInput.value;
    const body = bodyInput.value;
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;

    

    // se om det er noen token
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Bearer token not found in localStorage");
      return;
    }

    const postData = {
      title: title,
      body: body,
      media: {
        url: mediaUrl,
        alt: mediaAlt,
      },
    };

    // GJØRE EN POST REQUEST
    fetch("https://v2.api.noroff.dev/blog/posts/ingebrigt_fb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        //console.log("Post created successfully:", responseData);
        window.location.href = "../account/admin.html"; //sender deg tilbake til admin etter posten er laget
        window.alert("Post is made");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        window.alert("URL not valid")
      });
  });
});


