export default class User {
  constructor(mainApi) {
    this.mainApi = mainApi;
    if(this.isGuest()) {
      this.articles = [];
    } else {
      this.articles = this.getArticles();
    };

  }

  login(token) {
    localStorage.setItem('token', token);
    return this.mainApi.getUserData(token)
    .then(res => {
      localStorage.setItem('name', res.name);
      this.getArticles();
    })
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      window.location.href = "./index.html";
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getName() {
    return localStorage.getItem('name');
  }

  isGuest() {
    if (this.getName() == null) {
      return true;
    }
    return false;
  }

  addToFavorites(newsCard, keyword) {
    this.mainApi.createArticle(this, newsCard, keyword)
    .then(res => {
      this.getArticles();
    });
  }

  removeFromFavorites(newsCard) {
    const element = this.articles.find((article) => {
      if(article.link === newsCard.getLink())
       return true;
     });
    this.mainApi.removeArticle(this, element._id)
    .then(res => {
      this.getArticles();
    });
  }

  getArticles() {
    this.mainApi.getArticles(this)
    .then(res => {
      this.articles = res.data;

    })
  }

  hasFavorites(newsCard) {
    return this.articles.filter(e => e.link === newsCard.getLink()).length > 0
  }
}