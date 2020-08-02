export default class MainApi {
  constructor(mainApiUrl, errorMessages) {
    this.mainApiUrl = mainApiUrl;
    this.errorMessages = errorMessages;
  }

  signup(email, password, name) {
    return fetch(this.getUrl('/signup'), {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
    })
    .then(response => {
      return response.ok ? response.json() : this.handleError(response);
    })
  }

  signin(email, password) {
    return fetch(this.getUrl('/signin'), {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
      })
      .then(response => {
        return response.ok ? response.json() : this.handleError(response);
      })

  }

  getUserData(token) {
    return fetch(this.getUrl('/users/me'), {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
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

  getArticles(user) {

    return fetch(this.getUrl('/articles'), {
      headers: {
        authorization: `Bearer ${user.getToken()}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
      window.location.href = "./index.html";
    });
  }

  createArticle (user, newsCard, keyword) {
    return fetch(this.getUrl('/articles'), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${user.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        title: newsCard.getTitle(),
        text: newsCard.getDescription(),
        date: newsCard.getDate(),
        source: newsCard.getSource(),
        image: newsCard.getImage(),
        link: newsCard.getLink(),
      })
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

  removeArticle(user, _id) {
    return fetch(this.getUrl('/articles/'+ _id), {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${user.getToken()}`,
        'Content-Type': 'application/json',
      }
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

  getUrl(path) {
    return this.mainApiUrl + path;
  }

  handleError(response) {
    return response.json().then(json => {
      if (!json.message) {
        json.message = this.errorMessages.unknowError;
      }
      return Promise.reject(json.message)
    })
  }
}