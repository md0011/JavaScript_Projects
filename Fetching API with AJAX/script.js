// Elements
const btn = document.querySelector('#btn');
const usersDiv = document.querySelector('#users');

// Listeners
btn.addEventListener('click', getUsers);

// Functions
function getUsers() {
  const response = new XMLHttpRequest();

  // Open
  response.open('GET', 'https://api.github.com/users', true);

  // Onload
  response.onload = () => {
    users = JSON.parse(response.responseText);
    usersDiv.innerHTML = ``;
    users.forEach(user => {
      usersDiv.innerHTML += `
        <div class="user">
        <img src="${user.avatar_url}">
          <div class="user-data">
          ID: ${user.id}<br>
          Login: ${user.login}
          </div>
        </div>`;
    });
  };

  // Send
  response.send();
}