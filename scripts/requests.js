import {key, url} from './config.js';
export default async function(req, {title = 'forest gump', id = 238, page = 1, qual = 'w500', singleImg} = {}) {
  // title is ok
  if (req === 'title') {
    const res = await fetch(`
    ${url}/search/movie?api_key=${key}&language=en-US&query=${title}&page=${page}&include_adult=false`);
    const data = await fetchData(res);
    return data;
  }
  // top rated is ok
  if (req === 'topRated') {
    const res = await fetch(`${url}/movie/top_rated?api_key=${key}&page=${page}`); 
    const data = await fetchData(res);
    return data;
  }
  // trailer is ok
  if (req === 'trailer') {
    const res = await fetch(`${url}/movie/${id}/videos?api_key=${key}&language=en-US`); 
    const data = await fetchData(res);
    console.log(data.results);
    return data.results.length > 0 ? data.results[0].key : 'poster';
  }
  // id 
  if (req === 'id') {
    return getMovieById(id);
  }

  if (req === 'img') {
    // single img is working
    if (singleImg) {
      const film = await getMovieById(id);
      const path = `https://image.tmdb.org/t/p/${qual}/${film.poster_path}`;
      return path;
    }
    // set of images is ok
    if (!singleImg) {
      // this if statement returns array of object with id, title and poster
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=14&page=${page}`);
      const data = await fetchData(res);
      const results = data.results;
      return results.map(result => {
        return {
          id: result.id,
          title: result.title,
          poster: `https://image.tmdb.org/t/p/${qual}/${result.poster_path}`
        };
      });
    }
  }
}

const fetchData = async function(res) {
  const data = await res.json();
  return await data;
}
const getMovieById = async function(id) {
  const res = await fetch(`
    ${url}/movie/${id}?api_key=${key}&language=en-US`);
    const film = await fetchData(res);
    return film;
}
// query to search film by title

/* const res = await fetch(`
  ${url}/search/movie?api_key=${key}&language=en-US&query=FILM-TITLE&page=1&include_adult=false`) */ 

// top rated
  /* const res = await fetch(`${url}/movie/top_rated?api_key=${key}`); // &page=integer */ 

// find trailer

/* const res = await fetch(`${url}/movie/MOVIE-ID/videos?api_key=${key}&language=en-US`); */

// img configuration
/* https://developers.themoviedb.org/3/configuration/get-api-configuration 
  const path = `https://image.tmdb.org/t/p/SIZE/${data.results[9].poster_path}`;
*/