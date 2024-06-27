// Elements
const btnText = document.querySelector('#getText');
const btnUsers = document.querySelector('#getUsers');
const btnPosts = document.querySelector('#getPosts');
const output = document.querySelector('#output');
const form = document.querySelector('#addPost');

// Listeners
btnText.addEventListener('click', getText);
btnUsers.addEventListener('click', getUsers);
btnPosts.addEventListener('click', getPosts);
form.addEventListener('submit', addPost);

// Functions
async function getText() {
  const res = await fetch('sample.txt');
  const data = await res.text();
  output.innerHTML = `
  <h3>Text File:</h3>
  <p class="text-left">${data}</p>
  `;
}

async function getUsers() {
  const res = await fetch('users.json');
  const users = await res.json();
  output.innerHTML = '<h2>Users</h2>';
  users.forEach(user => {
    output.innerHTML += `
    <ul class="list-group mb-3 text-left">
      <p class="list-group-item">ID: ${user.id}</p>
      <p class="list-group-item">Name: ${user.name}</p>
      <p class="list-group-item">Email: ${user.email}</p>
    </ul>`;
  });
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  output.innerHTML = '<h2>Posts</h2>';
  posts.forEach(post => {
    output.innerHTML += `
    <ul class="list-group mb-3 text-left">
      <h3 class="list-group-item">${post.title}</h3>
      <p class="list-group-item">${post.body}</p>
    </ul>`;
  });
}

async function addPost(e) {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  });
  const data = await res.text();
  const status = await res.status;
  console.log(data);

  if (status > 200 && status < 400) {
    output.innerHTML = `
      <h3 class="text-center text-success">Success!</h3>
      <p class="text-center">connection ended with response status: <span class="text-success">${status}</span></p>`;
  }
  if (status > 400) {
    output.innerHTML = `
      <h3 class="text-center text-danger">Error.</h3>
      <p class="text-center">connection ended with response status: <span class="text-danger">${status}</span></p>`;
  }
}
