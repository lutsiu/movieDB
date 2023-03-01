import View from "./View.js";
export default class MainPageView extends View{
  constructor() {
    super();
    this.home = document.getElementById('home');
  }

  // load the content to the main page
  loadPage(movie) {
    this.home.style.backgroundImage = `url(${movie.backdrop})`;
    const html = `
    <div class="home__content" data-film-id="${movie.id}">
        <h1 class="home__title title--main">${movie.title}</h1>
        <p class="paragraph home__overview paragraph--main">"${movie.overview}"</p>
        <div class="black-buttons-container">
          <span class="btn btn--black btn--home-list"><i class="fa-solid fa-plus"></i>My list</span>
          <span class="btn btn--black btn--home-trailer" data-film-id="${movie.id}"><i class="fa-brands fa-youtube"></i>Show trailer</span>
        </div>
    </div>
    `;
    this.home.insertAdjacentHTML('beforeend', html);
  }
  addHandlerClick(handler) {
    this.home.addEventListener('click', (e) => {
      if (e.target.closest('.btn--home-trailer')) {
        const id = e.target.closest('.btn--home-trailer').dataset.filmId;
        handler(id);
      }
      /* if (e.target.closest('.btn--home.btn--list')) {
        
      } */
    });
  }
}
