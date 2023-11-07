class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this.moviesData = null;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    if (this.moviesData) { // Если данные фильмов уже загружены, возвращаем их
      return Promise.resolve(this.moviesData);
    }
    return fetch(`${this._url}`, { headers: this._headers })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        this.moviesData = data; // Сохраняем данные фильмов
        return data;
      });
  }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});