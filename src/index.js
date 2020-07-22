import "./style.css";
import Header from "./js/components/header";
import PopupLogin from "./js/components/popupLogin";
import PopupRegistration from "./js/components/popupRegistration";
import HeaderPopup from "./js/components/headerPopup";
import MainApi from "./js/components/mainApi";
import MAIN_API_URL from "./js/constants/main-api";

const header = new Header ({
  isLoggedIn: false,
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

const popupLogin = new PopupLogin (
  document.querySelector('.popup_login'),
  document.querySelectorAll('.header__nav-button.auth'),
  document.querySelector('.popup__link.reg'),
  headerPopup,
);

const popupRegistration = new PopupRegistration (
  document.querySelector('.popup_registration'),
  document.querySelector('.popup__link'),
);

const mainApi = new MainApi (
  MAIN_API_URL,
);

document.querySelector('.search__button').addEventListener('click', (event) =>{
  mainApi.signup('eedf@eus.ru', 'Reviewer1234!', 'wefwe')
});


