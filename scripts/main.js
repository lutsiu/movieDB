import {key, url} from './config.js';
const getGenre = async (movie) => {
  /* const res = await fetch(`${url}/movie/top_rated?api_key=${key}&genre=western`); // &page=integer */ // top rated
  const res = await fetch(`${url}/genre/movie/list?api_key=${key}`); // &page=integer
  /* const res = await fetch(`
  ${url}/search/movie?api_key=${key}&language=en-US&query=godfather&page=1&include_adult=false`) */ // query to search film by title
  const data = await res.json();
  
  console.log(data.genres);
/*   console.log(data); */
  const a = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=14&page=2`); // get films by genres
  const b = await a.json();
  console.log(b);
};  
getGenre();
