// Elements
const form = document.querySelector('form');
const output = document.querySelector('.output');
const input = document.querySelector('.zip');
// Listeners
form.addEventListener('submit', displayInfo);

// Functions
async function displayInfo(e) {
  e.preventDefault();
  const zipCode = input.value;
  const res = await fetch(`http://api.zippopotam.us/in/${zipCode}`);
  if (res.status == 200) {
    const data = await res.json();
    console.log(data.places[0]);
    output.innerHTML = `
    <article class="message is-primary" style="width: 25em;">
    <div class="message-header">
    <p>Location Info:</p>
    <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    <p><strong>City:</strong> ${data.places[0]['place name']}</p>
    <p><strong>State:</strong> ${data.places[0].state}</p>
    <p><strong>Longitud:</strong> ${data.places[0].longitude}</p>
    <p><strong>Latitud:</strong> ${data.places[0].latitude}</p>
    </div>
    </article>
    `;
    const exit = document.querySelector('.message');
    exit.addEventListener('click', () => exit.remove());
  } else {
    output.innerHTML = `
      <article class="message is-danger" style="width: 25em;">
        <div class="message-header">
          <p>Error:</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <p>Please enter a valid Zip Code.</p>
        </div>
      </article>
      `;
    const exit = document.querySelector('.message');
    exit.addEventListener('click', () => exit.remove());
  }
}