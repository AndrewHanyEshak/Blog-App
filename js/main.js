"use strict";
let postsContainer = document.querySelector("#main-section .container .posts");
let addPost = document.querySelector("#main-section .container .add-post");
let addForm = document.getElementById("add-form");
let titleInput = document.getElementById("title");
let bodyInput = document.getElementById("body");
let addPostButton = document.getElementById("add-button");

(function () {
  if (localStorage.getItem("posts")) {
    displayPosts(JSON.parse(localStorage.getItem("posts")));
  } else {
    getPosts();
  }
  addPost.addEventListener("click", displayForm);
  document.addEventListener("keyup", (e) => {
    keyHandle(e.key);
  });
  addForm.addEventListener("click", (e) => {
    if (e.target.id === "add-form") {
      unDisplayForm();
      clrInputs();
    }
  });
  addPostButton.addEventListener("click", addNewPost);
})();

async function getPosts() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await response.json();
    saveLocalStorage(posts);
  } catch (error) {
    console.log(error);
  }
}

function saveLocalStorage(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
  console.log("Posts saved to local storage");

  displayPosts(posts);
}

function displayPosts(posts) {
  let postsHTML = "";
  posts.forEach((post) => {
    postsHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;
  });
  postsContainer.innerHTML = postsHTML;
}

function displayForm() {
  addForm.style.display = "flex";
}

function unDisplayForm() {
  addForm.style.display = "none";
}

function keyHandle(key) {
  if (key === "Escape") {
    unDisplayForm();
    clrInputs();
  }
}

function clrInputs() {
  titleInput.value = "";
  bodyInput.value = "";
}

function addNewPost() {
  let newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts.unshift(newPost);
  saveLocalStorage(posts);
  unDisplayForm();
}
