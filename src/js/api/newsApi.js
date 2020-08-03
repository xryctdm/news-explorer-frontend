export default class NewsApi {
  constructor(newsApiUrl, key, errorMessages) {
    this.newsApiUrl = newsApiUrl;
    this.key = key;
    this.errorMessages = errorMessages;
  }

  getNews(query, page) {
    return fetch(this.getUrl({
      apiKey: this.key,
      q: query,
      page: page,
      pageSize: 3,
    }), {
      headers: {
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

  getUrl(params) {
    let parameters = new URLSearchParams();
      Object.keys(params).forEach(function (parameterName) {
      parameters.append(parameterName, params[parameterName]);
    });
    return this.newsApiUrl + '?' + parameters.toString();
  }
}