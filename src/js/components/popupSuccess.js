export default class PopupSuccess {
  constructor(elem, openLink) {
    this.elem = elem;

    this.addEvents();
  }

  open() {
    this.elem.classList.remove('popup_success');
  }

  close() {
    this.elem.classList.add('popup_success');
  }

  addEvents() {

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