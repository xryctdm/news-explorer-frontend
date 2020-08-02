import { dateConverter } from "../utils/dateConverter";

export default class SavedNewsCard {
  constructor(cardData, user) {
    this.cardData = cardData;
    this.user = user;
    this.template = document.querySelector('.card__template').cloneNode(true);

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
    this.addCardTag();

    return this.template;
  }

  addCardTag() {
    const tag = this.template.querySelector('.card__tag');
    tag.textContent = this.cardData.keyword;
  }

  addCardSourceName() {
    const sourceName = this.template.querySelector('.card__source');
    sourceName.textContent = this.cardData.source;
  }

  addCardTitle() {
    const title = this.template.querySelector('.card__title');
    if (this.cardData.title.length > 50)
        this.cardData.title = this.cardData.title.substr(0, 50) + '...';
    title.textContent = this.cardData.title;
  }

  addCardDate() {
    const date = this.template.querySelector('.card__date');
    date.textContent = dateConverter(new Date(this.cardData.date));
  }

  addCardDescription() {
    const description = this.template.querySelector('.card__text');
    if (this.cardData.text.length > 160)
      this.cardData.text = this.cardData.text.substr(0, 160) + '...';
    description.textContent = this.cardData.text;
  }

  addCardImageUrl() {
    const imageUrl = this.template.querySelector('.card__image');
    imageUrl.setAttribute('style', `background-image: url(${this.cardData.image})`);
  }

  addCardLink() {
    const link = this.template.querySelector('.card__link');
    link.setAttribute('href', `${this.cardData.link}`);
  }

  getSource() {
    return this.cardData.source;
  }

  getImage() {
    return this.cardData.image;
  }

  getLink() {
    return this.cardData.link;
  }

  getDate() {
    return this.cardData.date;
  }

  getDescription() {
    return this.cardData.text;
  }

  getTitle() {
    if (this.cardData.title.length > 30)
        this.cardData.title = this.cardData.title.substr(0, 30);
    return this.cardData.title;
  }

  addEvents() {
    this.template.querySelector('.card__bookmark-pointer').addEventListener('click', () => {
        this.template.style.display="none";
        this.user.removeFromFavorites(this);
      })
  }
}