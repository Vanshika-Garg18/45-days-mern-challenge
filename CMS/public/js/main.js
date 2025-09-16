// --- Users ---
function fetchUsers() {
  fetch("/api/auth/users")
    .then(res => res.json())
    .then(users => {
      const container = document.getElementById("usersContainer");
      container.innerHTML = "";
      users.forEach(user => {
        container.innerHTML += `<div>${user.username} - ${user.email}</div>`;
      });
    });
}

function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json())
  .then(() => fetchUsers());
}

// --- Posts ---
function fetchPosts() {
  fetch("/api/posts")
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("postsContainer");
      container.innerHTML = "";
      posts.forEach(post => {
        container.innerHTML += `
          <div id="post-${post._id}">
            <strong>${post.title}</strong> - ${post.desc}
            <button onclick="editPost('${post._id}')">Edit</button>
            <button onclick="deletePost('${post._id}')">Delete</button>
          </div>
        `;
      });
    });
}

function addPost() {
  const title = document.getElementById("postTitle").value;
  const desc = document.getElementById("postDesc").value;

  fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, desc })
  })
  .then(res => res.json())
  .then(() => fetchPosts());
}

function editPost(id) {
  const newTitle = prompt("Enter new title:");
  const newDesc = prompt("Enter new description:");

  fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, desc: newDesc })
  })
  .then(res => res.json())
  .then(() => fetchPosts());
}

function deletePost(id) {
  fetch(`/api/posts/${id}`, { method: "DELETE" })
    .then(() => fetchPosts());
}

// --- Load on page load ---
window.onload = () => {
  fetchUsers();
  fetchPosts();
};
