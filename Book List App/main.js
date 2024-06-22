// Elements
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const number = document.querySelector('#number');
const form = document.querySelector('form');
const success = document.querySelector('.alert.bg-success');
const remove = document.querySelector('#remove');
const alert = document.querySelector('.alert.bg-danger');
const alert2 = document.querySelector('.alert.bg-warning');
const table = document.querySelector('table');

// On load
alert.style.display = 'none';
remove.style.display = 'none';
alert2.style.display = 'none';
success.style.display = 'none';

// Listeners
form.addEventListener('submit', addBook);
table.addEventListener('click', removeBook);

// Functions
function addBook(e) {
  e.preventDefault();
  if (title.value === '' || author.value === '' || number.value === '') {
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
    return;
  }
  if (number.value.match('[0-9]+') === null) {
    alert2.style.display = 'block';
    setTimeout(() => {
      alert2.style.display = 'none';
    }, 2000);
  } else {
    success.style.display = 'block';
    setTimeout(() => {
      success.style.display = 'none';
    }, 2000);
    const newBook = document.createElement('tbody');
    newBook.className = 'text-center';
    newBook.innerHTML = `<td>${title.value}</td><td>${author.value}</td><td>${number.value}</td><td><div class="btn btn-danger btn-sm">X</div></td>`;
    table.appendChild(newBook);
    [title.value, author.value, number.value] = ['', '', ''];
  }
}

function removeBook(e) {
  if (e.target.className.includes('btn btn-danger')) {
    e.target.parentElement.remove();
    remove.style.display = 'block';
    setInterval(() => {
      remove.style.display = 'none';
    }, 3000);
  }
}