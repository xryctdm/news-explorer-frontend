export default class Header {
    constructor(user, afterClickLogout) {
      this.user = user;
      this.afterClickLogout = afterClickLogout;

      this.addEvents();
    }

    render() {
      if (!this.user.isGuest()) {
        document.querySelectorAll('.header__nav-item.saved-pages').forEach(function(element) {
          element.classList.remove('header__nav-item_hidden');
        });
        document.querySelectorAll('.header__nav-button.profile').forEach(function(element) {
          element.classList.remove('header__nav-button_hidden');
        });
        document.querySelectorAll('.header__nav-button.auth').forEach(function(element) {
          element.classList.add('header__nav-button_hidden');
        });
        document.querySelectorAll('.header__nav-button-content').forEach((element) => {
          element.textContent = this.user.getName();
        });
    } else {
      document.querySelectorAll('.header__nav-item.saved-pages').forEach(function(element) {
        element.classList.add('header__nav-item_hidden');
      });
      document.querySelectorAll('.header__nav-button.profile').forEach(function(element) {
        element.classList.add('header__nav-button_hidden');
      });
      document.querySelectorAll('.header__nav-button.auth').forEach(function(element) {
        element.classList.remove('header__nav-button_hidden');
      });
      document.querySelectorAll('.header__nav-button-content').forEach((element) => {
        element.textContent = 'Авторизоваться';
      });
    }
  }

  addEvents() {
    document.querySelectorAll('.header__nav-button.profile').forEach((element) => {
        element.addEventListener('click', () => {
          this.user.logout();
          this.render();
          this.afterClickLogout();
        })
      }
    )
  }
}