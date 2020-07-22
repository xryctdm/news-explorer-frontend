import "../../style.css";
import Header from "../components/header";
import HeaderPopup from "../components/headerPopup";

const header = new Header ({
  isLoggedIn: true,
  userName: 'Ivan',
  color: ''
});

header.render();

const headerPopup = new HeaderPopup (
  document.querySelector('.header__popup'),
  document.querySelector('.header__menu-icon'),
  document.querySelector('.header__popup-close-button'),
  document.querySelector('.header__nav-item'),
);
