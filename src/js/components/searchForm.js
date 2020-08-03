export default class SearchForm {
  constructor(selector, validationMessage, searchButton, afterValidationEvent) {
    this.selector = selector;
    this.validationMessage = validationMessage;
    this.searchButton = searchButton;
    this.afterValidationEvent = afterValidationEvent;

    this.addEvents();
  }

  getInputValue() {
    return document.querySelector('#search-input').value;
  }

  isValidInput() {
    if (this.getInputValue().length === 0) {
      return this.validationMessage.needKeyWord;
    }
    return null;
  }

  validate() {
    if (this.isValidInput() !== null) {
      this.setInputError();
        } else {
          this.removeInputError();
          this.search();
        }
  }

  setInputError() {
    const errorInput = document.querySelector('#error-search');;
    errorInput.textContent = this.isValidInput();
  }

  removeInputError() {
    const errorInput = document.querySelector('#error-search');;
    errorInput.textContent = null;
  }

  search() {
    this.afterValidationEvent(this.getInputValue());
  }

  addEvents() {
    this.searchButton.addEventListener('click', (event) => { this.validate(event) });
  }
}