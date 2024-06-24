// Elements
const number = document.querySelector('#number');
const grams = document.querySelector('.grams');
const kilograms = document.querySelector('.kilograms');
const ounces = document.querySelector('.ounces');
const pounds = document.querySelector('.pounds');
const measures = document.querySelectorAll('.card-body');
const measureList = [grams, kilograms, ounces, pounds];
const output = document.querySelector('#output');
output.style.display = 'none';
pounds.parentElement.style.display = 'none';

// Listeners
number.addEventListener('input', convert);
output.addEventListener('click', select);

// Functions
function convert() {
  const measure = this.placeholder;
  output.style.display = 'block';
  if (measure.includes('pounds')) {
    const lbs = this.value;
    grams.innerHTML = `${Math.round(lbs * 453.592)} g`;
    kilograms.innerHTML = `${Math.round((lbs / 2.205) * 100) / 100} kg`;
    ounces.innerHTML = `${Math.round(lbs * 16)} oz`;
  }
  if (measure.includes('grams')) {
    const g = this.value;
    pounds.innerHTML = `${Math.round((g / 453.592) * 1000) / 1000} lbs`;
    kilograms.innerHTML = `${Math.round((g / 1000) * 1000) / 1000} kg`;
    ounces.innerHTML = `${Math.round((g / 28.35) * 1000) / 1000} oz`;
  }
  if (measure.includes('kilograms')) {
    const kg = this.value;
    pounds.innerHTML = `${Math.round((kg / 0.4535) * 100) / 100} lbs`;
    grams.innerHTML = `${Math.round(kg * 1000)} g`;
    ounces.innerHTML = `${Math.round(kg * 35.274)} oz`;
  }
  if (measure.includes('ounces')) {
    const oz = this.value;
    grams.innerHTML = `${Math.round(oz * 28.35)} g`;
    kilograms.innerHTML = `${Math.round((oz / 35.274) * 100) / 100} kg`;
    pounds.innerHTML = `${Math.round(oz / 16)} lbs`;
  }
}

function select(e) {
  const gCard = grams.parentElement;
  if (e.target === gCard || e.target.parentElement === gCard) {
    measures.forEach(m => (m.style.display = 'block'));
    gCard.style.display = 'none';
    changeInput(gCard);
  }
  const kgCard = kilograms.parentElement;
  if (e.target === kgCard || e.target.parentElement === kgCard) {
    measures.forEach(m => (m.style.display = 'block'));
    kgCard.style.display = 'none';
    changeInput(kgCard);
  }
  const ozCard = ounces.parentElement;
  if (e.target === ozCard || e.target.parentElement === ozCard) {
    measures.forEach(m => (m.style.display = 'block'));
    ozCard.style.display = 'none';
    changeInput(ozCard);
  }
  const lbsCard = pounds.parentElement;
  if (e.target === lbsCard || e.target.parentElement === lbsCard) {
    measures.forEach(m => (m.style.display = 'block'));
    lbsCard.style.display = 'none';
    changeInput(lbsCard);
  }
}

function changeInput(input) {
  console.log(input.id);
  if (input.id === 'g') {
    number.setAttribute('placeholder', 'Enter grams...');
    resetValues();
  }
  if (input.id === 'kg') {
    number.setAttribute('placeholder', 'Enter kilograms...');
    resetValues();
  }
  if (input.id === 'oz') {
    number.setAttribute('placeholder', 'Enter ounces...');
    resetValues();
  }
  if (input.id === 'lbs') {
    number.setAttribute('placeholder', 'Enter pounds...');
    resetValues();
  }
}

function resetValues() {
  output.style.display = 'none';
  measureList.forEach(measure => (measure.textContent = ''));
}