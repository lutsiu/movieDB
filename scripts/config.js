export const key = `148db226d8f5c2dbaabc54dd0a43a589`;
export const url =`https://api.themoviedb.org/3`;
export const moviesForPoster = [
  {title: 'avengers: the end game', id:299536},
  {title: 'no way home', id: 634649},
  {title: 'hobbit 2', id: 57158},
  {title: 'hobbit 3', id: 122917},
];
export const chooseRandom = function(quantity) {
  return Math.floor(Math.random() * quantity);
}
