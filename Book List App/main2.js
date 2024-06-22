// Book class - Represents a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  let alertShown;
  // UI class - Handle User Interface Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBook();
      books.forEach(book => {
        UI.addBook(book);
      });
    }
  
    static addBook(book) {
      const list = document.querySelector('.book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
          `;
      list.appendChild(row);
    }
  
    static deleteBook(btn) {
      if (btn.classList.contains('delete')) {
        btn.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      if (alertShown) {
        return;
      }
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const card = document.querySelector('.card');
      const form = document.querySelector('form');
      card.insertBefore(div, form);
      alertShown = true;
      setTimeout(() => {
        alertShown = false;
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#number').value = '';
    }
  }
  
  // Store class - Handles Storage
  class Store {
    static getBook() {
      let books;
      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBook();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static delBook(isbn) {
      const books = Store.getBook();
      books.forEach((book, index) => {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a book
  const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
  
    // Get values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#number').value;
  
    // Instatiate a book
    if (title === '' || author === '' || isbn === '') {
      UI.showAlert('Please fill all fields', 'danger');
    }
    if (number.value.match('[0-9]+') === null) {
      UI.showAlert('Please use a valid ID', 'warning');
    } else {
      const book = new Book(title, author, isbn);
      UI.addBook(book);
      Store.addBook(book);
      UI.showAlert('Book Added!', 'success');
      UI.clearFields();
    }
  });
  
  // Event: Remove a book
  const list = document.querySelector('.book-list');
  list.addEventListener('click', e => {
    UI.showAlert('Book removed.', 'danger');
    UI.deleteBook(e.target);
    console.log(e.target.parentElement.previousElementSibling.textContent);
    Store.delBook(e.target.parentElement.previousElementSibling.textContent);
  });