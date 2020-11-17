export default class PopupRegistration {
  constructor(elem, openLink) {
    this.elem = elem;
    this.openLink = openLink;

    this.addEvents();
  }

  open() {
    this.elem.classList.remove('popup_registration');
  }

  close() {
    this.elem.classList.add('popup_registration');
  }

  addEvents() {

    this.openLink.addEventListener('click', (event) =>{this.open(event)});

    this.elem.querySelector('.popup__close').addEventListener('click', () =>{this.close()});
    this.elem.addEventListener('click', (event) =>{
      if (event.target.classList.contains('popup')||event.target.classList.contains('popup__link')) {
        this.close();
      }
    });
    document.addEventListener('keyup', (event) => {
      if(event.key === 'Escape') {
        this.close();
      }
    });
  }
}

