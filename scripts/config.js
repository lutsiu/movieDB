export const key = `148db226d8f5c2dbaabc54dd0a43a589`;
export const url =`https://api.themoviedb.org/3`;
export const moviesForPoster = [
  {title: 'avengers: the end game', id:299536},
  {title: 'no way home', id: 634649},
  {title: 'hobbit 2', id: 57158},
  {title: 'hobbit 3', id: 122917},
];
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