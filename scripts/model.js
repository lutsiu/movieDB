import {key, url} from './config.js'; 
import AJAX from './requests.js';

export default class Model {
  constructor() {
    this.state = {
      movie: {},
      search: {
        query: '',
        results: [],
      },
      favMovies: [],
      page: 1
    };
  }
  // create movie gets data from another functions and then returns object 
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
  /* 
    1. Load results from query +
    2. create movies objects 
    3. update results in state
    4. in controller fetch this data to view in order to render this results on the page
  */
  async loadSearchResults(query) {
    try {
      this.state.search.query = query;
      // get array of movies by query
      const data = await AJAX('title', {title: query, page: 1});
      // filter movies with poster
      const movies = data.results.filter((movie, i) => movie.backdrop_path && movie.poster_path && i < 6);
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

  // 1. load data from AJAX
  // 2. add this data to the id or movie or etc
  // 3. create obj by this id
  // 4. use this in function
  async getDataById(id) {
    const data = await AJAX('id', {id: id});
    const obj = this.createMovieObj(data);
    return obj;
  }
  addMovieToTheList(movie) {
    this.state.favMovies.push(movie);
  }
} 


