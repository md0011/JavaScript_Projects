// Constructor
class TypeWritter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.isDeleting = false;
      this.type();
    }
  
    type() {
      // Current index of word
      let current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Speed
      let typeSpeed = 200;
      // Check if deleting
      if (this.isDeleting) {
        // Remove a char
        typeSpeed /= 3;
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        if (this.txt.length === 0) {
          this.wordIndex++;
          this.isDeleting = false;
        }
      } else {
        // Add a char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        if (this.txt === fullTxt) {
          this.isDeleting = true;
          typeSpeed = 1000;
        }
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `${this.txt}`;
      console.log(current);
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Listener
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    const txtElement = document.querySelector('span');
    const words = ['Developer', 'Designer', 'Creator'];
    const wait = 3000;
    // Init TypeWritter
    new TypeWritter(txtElement, words, wait);
  }