export default class HeaderPopup {
  constructor(elem, openButton, closeButton, savedCards) {
    this.elem = elem;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.savedCards = savedCards;

    this.addEvents();
  }

  open() {
    this.elem.classList.remove('header__popup_close-state');
  }

  close() {
    this.elem.classList.add('header__popup_close-state');
  }

  addEvents() {
    this.openButton.addEventListener('click', (event) =>{this.open(event)});
    this.closeButton.addEventListener('click', (event) =>{this.close(event)});
  }
}