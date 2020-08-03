import "./style.css";
import Header from "./js/components/header";
import PopupLogin from "./js/components/popupLogin";
import PopupRegistration from "./js/components/popupRegistration";
import HeaderPopup from "./js/components/headerPopup";
import MainApi from "./js/api/mainApi";
import MAIN_API_URL from "./js/constants/main-api";
import RegistrationForm from "./js/components/registrationForm";
import ERRORS from "./js/constants/errors";
import FormValidator from "./js/utils/formValidator";
import PopupSuccess from "./js/components/popupSuccess";
import LoginForm from "./js/components/loginForm";
import SearchForm from "./js/components/searchForm";
import User from "./js/components/user";
import NewsApi from "./js/api/newsApi";
import newsApiSettings from "./js/constants/news-api";
import NewsCardList from "./js/components/newsCardList";
import NewsCard from "./js/components/newsCard";
import SearchFormInput from "./js/components/searchFormInput";


const mainApi = new MainApi (
  MAIN_API_URL,
  ERRORS,
);

const newsApi = new NewsApi (
  newsApiSettings.url,
  newsApiSettings.key,
  ERRORS,
  );

const user = new User (
  mainApi,
);

const header = new Header (
  user,
  function() {
    document.querySelector(".search-results").style.display="none";
  }
);

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
  document.querySelector('.popup__link.success'),
  headerPopup,
);

const popupRegistration = new PopupRegistration (
  document.querySelector('.popup_registration'),
  document.querySelector('.popup__link.login'),
);

const popupSuccess = new PopupSuccess (
  document.querySelector('.popup_success'),
);

const registrationForm = new RegistrationForm (
  document.querySelector('#registration-form'),
  popupRegistration,
  ERRORS,
  document.querySelector('#registration-button'),
  new FormValidator,
  function(email, password, name) {
    mainApi.signup(email.value, password.value, name.value)
    .then(res => {
      popupRegistration.close();
      popupSuccess.open();
    })
    .catch(res => {
          const errorForm = document.querySelector('#error-registration-form');
          errorForm.textContent = res;
    })
  }
)

const loginForm = new LoginForm (
  document.querySelector('#login-form'),
  popupLogin,
  ERRORS,
  document.querySelector('#login-button'),
  new FormValidator,
  function(email, password) {
    mainApi.signin(email.value, password.value)
    .then(res => {
      popupLogin.close();
      user.login(res.token)
      .then( () => {
        header.render();
      }
      );
    })

    .catch(res => {
          const errorForm = document.querySelector('#error-login-form');
          errorForm.textContent = res;
    })
  },
)

const searchFormInput = new SearchFormInput (
  document.querySelector('#search-input'),
)

const newsCardList = new NewsCardList (
  document.querySelector('.cards-container'),
  function(data) {
    return new NewsCard(data, user, searchFormInput).render();
  }
);

const searchForm = new SearchForm (
  document.querySelector('#search-form'),
  ERRORS,
  document.querySelector('#search-button'),
  function(query) {
    newsCardList.showPreloader();
    newsApi.getNews(query, newsCardList.getCurrentPage())
    .then(res => {
      newsCardList.setTotalResults(res.totalResults);
      newsCardList.hidePreloader();
      newsCardList.render(res.articles);
    })
  }
);

document.querySelector('.search-results__button')
        .addEventListener('click', () => {
          newsCardList.showPreloader();
          newsApi.getNews(searchForm.getInputValue(), newsCardList.getNextPage())
          .then(res => {
            newsCardList.setTotalResults(res.totalResults);
            newsCardList.hidePreloader();
            newsCardList.showMore(res.articles);
            })
        });