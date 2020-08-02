import "../../style.css";
import Header from "../components/header";
import HeaderPopup from "../components/headerPopup";
import User from "../components/user";
import MainApi from "../api/mainApi";
import NewsApi from "../api/newsApi";
import MAIN_API_URL from "../constants/main-api";
import ERRORS from "../constants/errors";
import SavedCardsResume from "../components/savedCardsResume";
import SavedNewsCardList from "../components/savedNewsCardList";
import SavedNewsCard from "../components/savedNewsCard";


const mainApi = new MainApi (
  MAIN_API_URL,
  ERRORS,
);

const user = new User (
  mainApi,
);

const header = new Header (
  user,
);

header.render();

const headerPopup = new HeaderPopup (
  document.querySelector('.header__popup'),
  document.querySelector('.header__menu-icon'),
  document.querySelector('.header__popup-close-button'),
  document.querySelector('.header__nav-item'),
);

const savedCardsResume = new SavedCardsResume (
  document.querySelector('.search-resume'),
  user,
  mainApi,
)

savedCardsResume.setName();




const savedNewsCardList = new SavedNewsCardList (
  document.querySelector('.cards-container'),
  function(data) {
    return new SavedNewsCard(data, user).render();
  }
)
mainApi.getArticles(user)
.then(res => {
  savedNewsCardList.render(res.data);
  savedCardsResume.setQuantity(res.data.length);
  savedCardsResume.setTags(res.data);
});


