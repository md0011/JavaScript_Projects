// Elements
const searchBar = document.querySelector('#search');
const list = document.querySelector('.card');
const addBtn = document.querySelector('.btn');

// Get Lists
let letters;
if (localStorage.getItem('letters') === null) {
  letters = [];
} else {
  letters = JSON.parse(localStorage.getItem('letters'));
}

let contactList;
if (localStorage.getItem('list') === null) {
  contactList = [];
} else {
  contactList = JSON.parse(localStorage.getItem('list'));
}

// Listeners
updateList();
searchBar.addEventListener('input', searchList);
addBtn.addEventListener('click', () => {
  makeUI('Enter Name...', 'addContact');
});
list.addEventListener('click', confirmDelete);

// Functions
function updateList() {
  // Update searchbar
  searchBar.setAttribute(
    'placeholder',
    `Search ${contactList.length} contacts...`
  );

  // Reset List
  list.innerHTML = '';

  // Update Letter List
  letters.forEach((e, i) => {
    let notIncluded = 0;
    contactList.forEach(contact => {
      if (!contact.charAt(0).includes(letters[i])) {
        notIncluded++;
      }
      if (notIncluded === contactList.length) {
        letters.splice(i, 1);
      }
    });
  })
  if (contactList.length === 0) {
    letters = [];
  }

  // Display Letters
  letters.forEach((e, i) => {
    letters.sort();
    const newLetter = document.createElement('h2');
    newLetter.className = 'border-bottom pb-3';
    newLetter.textContent = letters[i];
    newLetter.id = letters[i];
    list.appendChild(newLetter);
  })

  // Display Contacts
  contactList.forEach((el, i) => {
    const e = contactList.sort().reverse()[i];
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.style.position = 'relative';
    deleteBtn.style.top = '-0.5em';
    deleteBtn.appendChild(document.createTextNode('X'));
    
    const contact = document.createElement('p');
    contact.textContent = e;
    contact.className = 'border-bottom ml-4 mt-1';
    const id = contact.textContent.charAt(0);
    contact.appendChild(deleteBtn);
    
    document.querySelector(`#${id}`).insertAdjacentElement('afterend', contact);
    contacts = document.querySelectorAll('p');
  })
  
  localStorage.setItem('list', JSON.stringify(contactList));
  localStorage.setItem('letters', JSON.stringify(letters));
}

function searchList() {
  const text = this.value.toLowerCase();
  contacts.forEach(e => {
    if (e.textContent.toLowerCase().includes(text)) {
      e.style.display = 'block';
    } else {
      e.style.display = 'none';
    }
  });
}

function makeUI(placeholder, action) {
  // Background
  const uiBg = document.createElement('div');
  uiBg.style.height = '100vh';
  uiBg.style.width = '100vw';
  uiBg.style.position = 'fixed';
  uiBg.style.top = '0';
  uiBg.style.left = '0';
  uiBg.style.backgroundColor = '#33333320';

  // Box
  const ui = document.createElement('div');
  ui.className = 'card card-body w-50';
  ui.style.top = '50%';
  ui.style.left = '50%';
  ui.style.transform = 'translate(-50%, -50%)';

  // Input bar
  const uiInput = document.createElement('input');
  uiInput.className = 'form-control';
  uiInput.setAttribute('placeholder', `${placeholder}`);

  // Form
  const uiForm = document.createElement('form');
  uiForm.id = action;
  uiForm.appendChild(uiInput);
  list.style.position = 'relative';

  ui.appendChild(uiForm);
  uiBg.appendChild(ui);
  list.appendChild(uiBg);

  uiBg.addEventListener('click', e => {
    if (e.target === uiBg) {
      uiBg.remove();
    }
  });
  if (action === 'addContact') {
    uiForm.addEventListener('submit', addContact);
  }
  if (action === 'deleteContact') {
    uiForm.addEventListener('submit', deleteContact);
  }
}

function updateLetters(letter) {
  if (letters.indexOf(letter) === -1) {
    letters.push(letter);
  }
}

function addContact(e) {
  e.preventDefault();
  const contactName = this.querySelector('input').value.replace(/^\w/, c =>
    c.toUpperCase()
  );
  contactList.push(contactName);
  updateLetters(contactName.charAt(0));
  updateList();
  this.parentElement.parentElement.remove();
}

let contactTextContent;
function confirmDelete(e) {
  if (e.target.className.includes('delete')) {
    makeUI('Are you sure?', 'deleteContact');
    contactTextContent = e.target.parentElement.firstChild.textContent;
  }
}

function deleteContact(e) {
  e.preventDefault();
  const answer = this.querySelector('input').value.toLowerCase();
  if (answer === 'yes') {
    contactList.forEach((contact, index) => {
      if (contact === contactTextContent) {
        contactList.splice(index, 1);
        updateList();
      }
    });
  }
  this.parentElement.parentElement.remove();
}