const newPostForm = document.getElementById("new-post");
const titleInput = document.getElementById("title-post");
const bodyInput = document.getElementById("text-post");

let postsList = [];

newPostForm.addEventListener("submit", onSubmit);

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((json) => {
    postsList = json.slice(0, 5);
    renderPost(postsList);
  });

function renderPost(postArray) {
  let html = "";
  postArray.forEach((post) => {
    html += `<div class="post">
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-post">${post.body}</p>
          </div>
        `;
    document.getElementById("container").innerHTML = html;
  });
}

function onSubmit(e) {
  e.preventDefault();
  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .then((data) => {
      postsList.unshift(data);
      renderPost(postsList);
    });
  newPostForm.reset();
}
