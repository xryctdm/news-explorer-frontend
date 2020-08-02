export default class SavedCardsResume {
  constructor(selector, user, mainApi) {
    this.selector = selector;
    this.user = user;
    this.mainApi = mainApi;
  }

  setName() {
    const user = document.querySelector('#resume-name');
    user.textContent = this.user.getName();
  }

  setQuantity(value) {
    const quantity = document.querySelector('#resume-quantity');
    quantity.textContent = value;
  }

  setTags(cardData) {
    let tags = {};
    let result = '';

    cardData.forEach(element => {
      if(tags[element.keyword]) {
        tags[element.keyword] = tags[element.keyword] + 1;
      } else {
        tags[element.keyword] = 1;
      }
    });
    tags = Object.keys(tags).sort(function(a,b){return tags[b]-tags[a]});

    for(let i = 0; i < 2 && i != tags.length; i++) {
      result += tags[i] + ', ';
    }
    tags.splice(0,2);

    result = result.substring(0, result.length - 2);

    document.querySelector('#tags').textContent = result;

    if(tags.length==0) {
      document.querySelector('#tags-and').style.display="none";
      document.querySelector('#tags-more').style.display="none";
    } else {
      document.querySelector('#tags-more').textContent = tags.length + ' другим';
    }

    return tags;
  }
}