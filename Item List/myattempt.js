// Elements
const submit = document.querySelector('input[type="submit"]');
const search = document.querySelector('input[type="text"]')
const searchResult = document.querySelector('#searchResult')
const text = document.querySelector('#item')
const list = document.querySelector('.list-group')
const form = document.querySelector('form')
let itemList = document.querySelectorAll('.list-group .list-group-item')
let deleteBtn = document.querySelectorAll('.btn.btn-danger')


// Listeners
submit.addEventListener('click', addItem);
form.addEventListener('submit', (e)=>{e.preventDefault()})
deleteBtn.forEach(btn => btn.addEventListener('click', deleteItem))
search.addEventListener('input', typeAhead);

// Functions
function addItem(){
    console.log(text.value)
    const newItem = document.createElement('li');
    newItem.classList = "list-group-item"
    newItem.innerHTML = `${text.value} <button class="btn btn-danger float-right">X</button>
    </li>`
    text.value = "";
    list.appendChild(newItem)

    itemList = document.querySelectorAll('.list-group .list-group-item')
    deleteBtn = document.querySelectorAll('.btn.btn-danger')
    deleteBtn.forEach(btn => btn.addEventListener('click', deleteItem))
}

function deleteItem(e){
    e.target.parentElement.remove()
    console.log(`${e.target.previousSibling.textContent} has been removed`)
}

function typeAhead(e){
    if(e.target.value === ''){
        searchResult.innerHTML = ''
        return
    } else {
        searchResult.innerHTML = ''
        itemList = document.querySelectorAll('.list-group .list-group-item')
        let item = e.target.value;
        
        const regex = new RegExp(item, 'gi')
        const itemListArray = [...itemList].filter(e => e.firstChild.textContent.match(regex));
        for(let i = 0; i < itemListArray.length; i++){
            const result = document.createElement('li')
            result.classList = 'list-group-item'
            result.innerHTML = itemListArray[i].firstChild.textContent  // FIRST CHILD SOLVES IT
            searchResult.appendChild(result);
        }
        
        console.log(e.target.value)
        console.log(itemListArray)
    }
}