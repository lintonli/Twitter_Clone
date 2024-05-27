const userUrl = "https://jsonplaceholder.typicode.com/users/";
const postUrl = "https://jsonplaceholder.typicode.com/posts/";
const commentUrl = "https://jsonplaceholder.typicode.com/comments/";
const userSelect = document.getElementById("userSelect");

const main = document.querySelector(".info");
const content = document.querySelector(".content");

async function getUserId(userId) {
  const response = await fetch(userUrl + userId);
  const res = await response.json();
  console.log(res);

  return res;
}
getUserId();

async function getUsers() {
  let user = await fetch(userUrl);
  let res = await user.json();
  //   displayUsers(res);
  populateUserDropdown(res);
  //   console.log(res);
}
getUsers();

async function displayUsers(userId) {
  let html = "";
  const item = await getUserId(userId);
  // item.forEach((item) => {
  if (item) {
    html += `<div class ="userinfo">
        <h1>${item.name}</h1>
        <h2>${item.username}</h2>
        <p>${item.email}
        </div>
        `;
  }

  main.innerHTML = html;
  // });
}

async function displayPosts(userId) {
  const item = await getPosts(userId);
  let html = "<h1>POST</h1>";
  item.forEach((item) => {
    html += `<div class ="Postinfo">
     
        <h2>${item.title}</h2>
        <p>${item.body}</p>
        </div>
        <button class="comm" onclick="displayComments(${item.id})">Comment</button>
        <div id="commentsid-${item.id}" class="comments"></div>
        `;
  });
  content.innerHTML = html;
}
async function displayComments(postId) {
  const contentcomment = document.getElementById(`commentsid-${postId}`);
  if (!contentcomment) {
    console.error(
      "Failed to find the comments container:",
      `comments-${postId}`
    );
    return;
  }

  if (contentcomment.style.display === "block") {
    contentcomment.style.display = "none";
  } else {
    if (contentcomment.innerHTML === "") {
      const item = await getComments(postId);
      let html = "<h2>Comments</h2>";
      if (item.length > 0) {
        item.forEach((item) => {
          html += `<div class="commentinfo">
  <h2>${item.name}</h2>
  <h4>${item.email}</h4>
  <p>${item.body}</p>
  </div>`;
        });
      } else {
        html = "<p> No comments for this post</p>";
      }

      contentcomment.innerHTML = html;
    } else {
      contentcomment.style.display = "block";
    }
  }
}

async function getPosts(userId) {
  let res = await fetch(`${postUrl}?userId=${userId}`);
  let post = await res.json();
  console.log(post);
  return post;
}
getPosts();

async function getComments(postId) {
  let res = await fetch(`${commentUrl}?postId=${postId}`);
  let comments = await res.json();

  console.log(comments);
  return comments;
}
getComments();

function populateUserDropdown(res) {
  userSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a user";
  defaultOption.value = "";
  userSelect.appendChild(defaultOption);

  res.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
}

userSelect.addEventListener("change", async function () {
  const userId = this.value;
  if (userId) {
    await displayUsers(userId);
    await displayPosts(userId);
    // await displayComments(postId);
  }
});
