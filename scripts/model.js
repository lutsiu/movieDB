import {key, url} from './config.js'; 
import AJAX from './requests.js';

export default class Model {
  constructor() {
    this.state = {
      movie: {},
      search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: 4,
      },
      favMovies: [],
    };
  }

  createMovieObj(data) {
    return {
      id: data.id,
      title: data.title,
      poster: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
      release: data.release_date.slice(0,4),
      rate: data.vote_average.toFixed(2),
      overview: data.overview,

    };
  }

  async loadSearchResults(query) {
    try {
      this.state.search.query = query;
      // get array of movies by query
      const data = await AJAX('title', {title: query, page: 1});
      // filter movies with poster
      const movies = data.results.filter((movie, i) => movie.backdrop_path && movie.poster_path && i < 10);
      this.state.search.results = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
          release: movie.release_date.slice(0,4),
          rate: movie.vote_average.toFixed(2),
          overview: movie.overview,
          
        };
      });
    } catch(err) {
      console.log(err);
    }
  }

  async getDataById(id) {
    try {
      const data = await AJAX('id', {id: id});
      const obj = this.createMovieObj(data);
      return obj;
    } catch(e) {
      '';
    }
  }
  async getTrailer(id) {
    try {
      const trailer = await AJAX('trailer', {id: id});
      return trailer ;
    } catch(e) {
      '';
    }
  }

  addToFavs(data) {
    this.state.favMovies.push(data);
    this.saveData();
  }

  deleteFromFavs(data) {
    const index = this.state.favMovies.findIndex(movie => movie.id === data.id);
    this.state.favMovies.splice(index, 1);
    this.saveData();
  }
  saveData() {
    localStorage.setItem('favourites', JSON.stringify(this.state.favMovies));
  }
  restoreData() {
    const savedData = JSON.parse(localStorage.getItem('favourites'));
    this.state.favMovies = savedData;
  }

  getFavPage(page = this.state.search.page) {
    this.state.search.page = page;
    
    const start = (page - 1) * this.state.search.resultsPerPage;
    const end = page * this.state.search.resultsPerPage;

    return this.state.favMovies.slice(start, end);
  }
  async getFilmsByGenre(genre) {
    try {
      const data = await AJAX('genre', {genre: genre});
      return data.results;
    } catch(e) {
      '';
    }
  }
} 


