export default class MainApi {
  constructor(mainApiUrl) {
    this.mainApiUrl = mainApiUrl;
  }

  signup(email, password, name,) {
    fetch(this.getUrl('/users/me'), {
    method: 'GET',
    headers: {
    'Access-Control-Allow-Origin': '*',

    'Content-Type': 'application/json',
    },

    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  signin() {

  }

  getUserData() {

  }

  getArticles() {

  }

  createArticle () {

  }

  removeArticle() {

  }

  getUrl(path) {
    return this.mainApiUrl + path;
  }
}