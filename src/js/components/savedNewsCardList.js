export default class SavedNewsCardList {
  constructor(containerClass, onCreateCardHandler) {
    this.containerClass = containerClass;
    this.onCreateCardHandler = onCreateCardHandler;
  }

  render(cardData) {
    for (let i = 0; i < cardData.length; i++) {
      this.containerClass.appendChild(this.onCreateCardHandler(cardData[i]));
    }
  }

    addCard(card) {
      this.containerClass.appendChild(card);
  }
}
