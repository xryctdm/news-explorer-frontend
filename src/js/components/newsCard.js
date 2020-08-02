import { dateConverter } from "../utils/dateConverter";

export default class NewsCard {

  constructor(cardData, user, searchInput) {
    this.cardData = cardData;
    this.template = document.querySelector('.card__template').cloneNode(true);
    this.user = user;
    this.searchInput = searchInput;

    this.addEvents();
  }

  render() {
    this.template.classList.remove('card__template');
    this.addCardDescription();
    this.addCardImageUrl();
    this.addCardSourceName();
    this.addCardTitle();
    this.addCardDate();
    this.addCardLink();

    if(!this.user.isGuest()) {
      this.template.querySelector('.card__submenu').style.display="none";
    }

    if(this.user.hasFavorites(this)) {
      this.template.querySelector('.card__bookmark-pointer').classList.add('card__bookmark-pointer_marked');
      this.template.querySelector('.card__bookmark-pointer').classList.remove('card__bookmark-pointer_normal');
    }

    return this.template;
  }

  addCardSourceName() {
    const sourceName = this.template.querySelector('.card__source');
    sourceName.textContent = this.cardData.source.name;
  }

  addCardTitle() {
    const title = this.template.querySelector('.card__title');
    if (this.cardData.title.length > 50)
        this.cardData.title = this.cardData.title.substr(0, 50) + '...';
    title.textContent = this.cardData.title;
  }

  addCardDate() {
    const date = this.template.querySelector('.card__date');
    date.textContent = dateConverter(new Date(this.cardData.publishedAt));
  }

  addCardDescription() {
    const description = this.template.querySelector('.card__text');
    if (this.cardData.description.length > 160)
      this.cardData.description = this.cardData.description.substr(0, 160) + '...';
    description.textContent = this.cardData.description;
  }

  addCardImageUrl() {
    const imageUrl = this.template.querySelector('.card__image');
    imageUrl.setAttribute('style', `background-image: url(${this.cardData.urlToImage})`);
  }

  addCardLink() {
    const link = this.template.querySelector('.card__link');
    link.setAttribute('href', `${this.cardData.url}`);
  }

  getSource() {
    return this.cardData.source.name;
  }

  getImage() {
    return this.cardData.urlToImage;
  }

  getLink() {
    return this.cardData.url;
  }

  getDate() {
    return this.cardData.publishedAt;
  }

  getDescription() {
    return this.cardData.description;
  }

  getTitle() {
    if (this.cardData.title.length > 30)
        this.cardData.title = this.cardData.title.substr(0, 30);
    return this.cardData.title;
  }

  addEvents() {
    this.template.querySelector('.card__bookmark-pointer').addEventListener('click', () => {
      if(this.user.hasFavorites(this)) {
        this.template.querySelector('.card__bookmark-pointer').classList.remove('card__bookmark-pointer_marked');
        this.template.querySelector('.card__bookmark-pointer').classList.add('card__bookmark-pointer_normal');
        this.user.removeFromFavorites(this);
      } else {
        this.template.querySelector('.card__bookmark-pointer').classList.add('card__bookmark-pointer_marked');
        this.template.querySelector('.card__bookmark-pointer').classList.remove('card__bookmark-pointer_normal');
        this.user.addToFavorites(this, this.searchInput.getValue());
      }
    })
  }
}