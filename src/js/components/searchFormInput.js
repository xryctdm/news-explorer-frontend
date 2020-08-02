export default class SearchFormInput {
  constructor(selector) {
    this.selector = selector;
  }

  getValue() {
    return this.selector.value;
  }
}