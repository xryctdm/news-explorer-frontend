export default class Header {
    constructor(props) {
      this.isLoggedIn  = props.isLoggedIn;
      this.userName = props.userName;
      this.color = props.color;
    }

    render() {
      if (this.isLoggedIn) {
        document.querySelectorAll('.header__nav-item_hidden').forEach(function(element) {
          element.classList.remove('header__nav-item_hidden');
        });
        document.querySelectorAll('.header__nav-button.profile').forEach(function(element) {
          element.classList.remove('header__nav-button_hidden');
        });
        document.querySelectorAll('.header__nav-button.auth').forEach(function(element) {
          element.classList.add('header__nav-button_hidden');
        });
        document.querySelectorAll('.header__nav-button-content').forEach((element) => {
          element.textContent = this.userName;
        });
    }
  }
}