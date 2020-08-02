export default class NewsCardList {

  constructor(containerClass, onCreateCardHandler) {
      this.containerClass = containerClass;
      this.onCreateCardHandler = onCreateCardHandler;
      this.totalResults = 0;
      this.currentPage = 1;
  }

  render(cardData) {
      this.clearResults();
      this.hideEmptyResults();
      this.hideResults();
      if (cardData.length == 0) {
        this.showEmptyResults();
      } else {
        for (let i = 0; i < cardData.length; i++) {
          this.containerClass.appendChild(this.onCreateCardHandler(cardData[i]));
        }
      this.showResults();
      }
  }

  setTotalResults(totalResults) {
    this.totalResults = totalResults;
    if(this.isLastPage()) {
      this.hideMoreButton();
    } else {
      this.showMoreButton();
    }
  }

  isLastPage() {
    if ((this.totalResults - (this.currentPage*3))>0) {
      return false;
    }
    return true;
  }

  getNextPage() {
    this.currentPage++;
    return this.currentPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  showMoreButton() {
    document.querySelector(".search-results__button").style.display="block";
  }

  hideMoreButton() {
    document.querySelector(".search-results__button").style.display="none";
  }


  showEmptyResults() {
    document.querySelector(".no-results").style.display="block";
  }

  hideEmptyResults() {
    document.querySelector(".no-results").style.display="none";
  }

  showResults() {
    document.querySelector(".search-results").style.display="flex";
  }

  hideResults() {
    document.querySelector(".search-results").style.display="none";
  }

  clearResults() {
    this.containerClass.innerHTML = '';
  }

  showPreloader() {
    document.querySelector(".preloader").style.display="block";
  }

  hidePreloader() {
    document.querySelector(".preloader").style.display="none";
  }

  showMore(cardData) {
        for (let i = 0; i < cardData.length; i++) {
          this.containerClass.appendChild(this.onCreateCardHandler(cardData[i]));
        }
  }

  addCard(card) {
      this.containerClass.appendChild(card);
  }


}