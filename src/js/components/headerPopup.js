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
    document.addEventListener('keyup', (event) => {
      if(event.key === 'Escape') {
        this.close();
      }
    });
    this.elem.addEventListener('click', (event) => {
      if (!event.target.classList.contains('header__popup-content')) {
        this.close();
      }
    });
  }
}