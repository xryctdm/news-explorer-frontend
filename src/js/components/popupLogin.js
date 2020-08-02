export default class PopupLogin {
  constructor(elem, openButton, openLink, successOpenLink, headerPopup) {
    this.elem = elem;
    this.openButton = openButton;
    this.openLink = openLink;
    this.headerPopup = headerPopup;
    this.successOpenLink = successOpenLink;

    this.addEvents();
}

open() {
    this.elem.classList.remove('popup_login');
    this.headerPopup.close();
}

close() {
    this.elem.classList.add('popup_login');
}

addEvents() {
    this.openButton.forEach((element) => {
      element.addEventListener('click', (event) =>{this.open(event)});
    });
    this.openLink.addEventListener('click', (event) =>{this.open(event)});
    this.successOpenLink.addEventListener('click', (event) =>{this.open(event)});

    this.elem.querySelector('.popup__close').addEventListener('click', () =>{this.close()});
    this.elem.addEventListener('click', (event) =>{
      if (event.target.classList.contains('popup')||event.target.classList.contains('popup__link')) {
        this.close();
      }
    });
  }
}