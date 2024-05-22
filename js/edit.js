//FOR Å REDIGERE POSTSA
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

  
    const editPostForm = document.getElementById("editPostForm"); 
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    const mediaUrlInput = document.getElementById("mediaUrl");
    const mediaAltInput = document.getElementById("mediaAlt");

    

    fetch(`https://v2.api.noroff.dev/blog/posts/ingebrigt_fb/${postId}`)
    .then((response) => {
        if (!response.ok){
            throw new Error (`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((responseData) => {
        const postData = responseData.data;
        //console.log("postData:", postData);
    
        //console.log("titleInput:", titleInput);
        //console.log("bodyInput:", bodyInput);
        //console.log("mediaUrlInput:", mediaUrlInput);
    
        //console.log("postData.title:", postData.title);
        //console.log("postData.body:", postData.body);
        //console.log("postData.media.url:", postData.media && postData.media.url);
    
            titleInput.value = postData.title;
            bodyInput.value = postData.body;

        if (postData.media && postData.media.url && postData.media.alt ) {
            mediaUrlInput.value = postData.media.url;
            mediaAltInput.value = postData.media.alt;
        }
    })
    
    .catch((error) => {
        console.error("Error fetching the post data", error);
    });
    
    editPostForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Henter form dataen inn i eventlistneren
      const title = titleInput.value;
      const body = bodyInput.value;
      const mediaUrl = mediaUrlInput.value;
      const mediaAlt = mediaAltInput.value
  
      //Sjekker om token eksisterer
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Bearer token not found in localStorage");
        return;
      }
  
      // Hvordan postdata opbjektet skal se ut
      const postData = {
        title: title,
        body: body,
        media: {
          url: mediaUrl,
          alt: mediaAlt,
        },
      };
  
      //  PUT forespørsel for å oppdatere posten
      fetch(`https://v2.api.noroff.dev/blog/posts/ingebrigt_fb/${postId}`, {
        method: "PUT",
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
          //console.log("Post edited successfully:", responseData);
          window.location.href = "../account/admin.html"; // sender deg tilbake til admin når ferdig oppdatert
          window.alert("Post is edited");
        })
        .catch((error) => {
          console.error("Error editing post:", error);
          window.alert("URL not valid")
        });
  
      });
    });

  

