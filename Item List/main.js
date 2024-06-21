// Elements
const form = document.querySelector('form')
const item = document.querySelector('#item')
const search = document.querySelector('input[type="text"]')
const list = document.querySelector('.list-group')
let itemList = [...document.querySelectorAll('.list-group .list-group-item')]


// Listeners
form.addEventListener('submit', addItem);
list.addEventListener('click', removeItem);
search.addEventListener('input', filterItems)

// Functions
function addItem(e){
    e.preventDefault();
    
    // Create list item
    const li = document.createElement('li');
    li.className = "list-group-item";
    const textNode = document.createTextNode(item.value);
    li.appendChild(textNode)

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger float-right';
    deleteBtn.appendChild(document.createTextNode('X'));

    // Pass in Button to List
    li.appendChild(deleteBtn)

    list.appendChild(li)
    item.value = '';
}

function removeItem(e){
    if(e.target.classList.contains('btn-danger')){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove()
        }
    }
}

function filterItems(e){
    const text = e.target.value.toLowerCase();
    itemList.forEach(item =>{
        const itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}