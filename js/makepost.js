async function makePost(postData) {
    try {
      const response = await fetch('https://v2.api.noroff.dev/blog/posts/<name>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();

      window.location.href = 'admin.html';

      return data;
    } catch (error) {
      console.error('could not create post:', error);
      return null;
    }
  }