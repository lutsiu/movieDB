import View from "./View.js";
export default class OverlayView extends View { 
  constructor() {
    super();
    this.overlay = document.querySelector('.overlay');
    this.spinner = document.querySelector('.overlay__spinner');
    this.cross = document.querySelector('.overlay__x');
    this.genresList = this.overlay.querySelector('.overlay__movies-genres');
    this.genre = this.genresList.querySelectorAll('.overlay__list__item');
    this.searchContainer = this.overlay.querySelector('.overlay__search-movie');
    this.searchBtn = document.querySelector('.search--overlay');
    this.form = this.searchContainer.querySelector('form');
    this.favourites = this.overlay.querySelector('.overlay__favourites');
    this.nav = document.querySelector('.nav');
    this.overlayResults = document.querySelector('.overlay__results');
    this.init();
  }
  pageLoaded() {
    window.addEventListener('DOMContentLoaded', () => {
      this.switchOverlay(false);
      this.switchSpinner(false);
    });
  }
  addStartingAnimations() {
    this.overlay.classList.add('fade-in');
    this.spinner.classList.add('fade-in');
    this.cross.classList.add('fade-out');
    this.genresList.classList.add('slide-to-left');
    this.searchContainer.classList.add('fade-out');
    this.favourites.classList.add('hide-favs');
  }
  preventStartingAnimations() {
    Array.from(this.overlay.children).forEach(child => {
      if (!child.classList.contains('overlay__spinner')) {
        child.classList.add('u-preload');
        setTimeout(() => {
          child.classList.remove('u-preload');
        }, 400);
      }
    });
  }
  
  switchOverlay(turnOn) {
    if (turnOn) {
      this.showEl(true, this.overlay, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.overlay, 'fade-in', 'fade-out');
    }
  }
  switchSpinner(turnOn) {
    if (turnOn) {
      this.showEl(true, this.spinner, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.spinner, 'fade-in', 'fade-out');
    }
  } 

  switchGenres(turnOn) {
    if (turnOn) {
      this.showEl(true, this.genresList, 'slide-to-right', 'slide-to-left');
    } else {
      this.showEl(false, this.genresList, 'slide-to-right', 'slide-to-left');
    }
  }

  switchCross(turnOn) {
    if (turnOn) {
      this.showEl(true, this.cross, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.cross, 'fade-in', 'fade-out');
    }
  }
  switchSearch(turnOn) {
    if (turnOn) {
      this.showEl(true, this.searchContainer, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.searchContainer, 'fade-in', 'fade-out');
    }
  }

  switchFavourites(turnOn) {
    if (turnOn) {
      this.showEl(true, this.favourites, 'show-favs', 'hide-favs');
    } else {
      this.showEl(false, this.favourites, 'show-favs', 'hide-favs');
    }
  }
  switchTrailer(turnOn) {
    if (turnOn) {
      this.showEl(true, this.trailer, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.trailer, 'fade-in', 'fade-out');
    }
  }
  switchNav(turnOn) {
    if (turnOn) {
      this.showEl(true, this.nav, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.nav, 'fade-in', 'fade-out');
    }
  }
  createSearchResults(data, handler) {
    if (data.length > 1) {
      const html = data.map(movie => {
        return `
        <div class="results__element" data-film-id="${movie.id}" style="background-image: url('${movie.poster}')" title="${movie.title}">
        </div>
        `;
      });
      html.forEach(h => {
        this.overlayResults.insertAdjacentHTML('beforeend', h);
      });
    } else {
      const html = 
      `
      <div class="results__error">
        <p class="paragraph--error">Sorry, we couldn't find any movie with this title :(</p>
      </div>
      `;
      this.overlayResults.insertAdjacentHTML('beforeend', html);
    }
    // load the trailer from the movie user searched
    this.searchedMovies = this.overlayResults.children;
    Array.from(this.searchedMovies).forEach(movie => {
      movie.addEventListener('click', handler.bind(null, movie.dataset.filmId));
      movie.addEventListener('click', this.hideAll.bind(this, true));
    })
    this.switchOverlay(true);
    this.switchNav(false);
  }
  createTrailer(data) {
    const html = `
    <div class="overlay__trailer trailer" data-film-id="${data.id}>
      <div class="trailer__video">
        <div id="player"></div>
        <div class="trailer__cross">
          <i class="fa-solid fa-xmark cross cross--trailer"></i>
        </div>
      </div>
      <div class="trailer__content">
        <h3 class="title--tertiary trailer__title">${data.title}</h3>
        <div class="black-buttons-container">
          <span class="trailer__rating">Rate:${data.rate}</span>
          <span class="btn btn--black btn--list" data-film-id="${data.id}"><i class="fa-solid fa-plus"></i>My list</span>
        </div>
        <p class="paragraph u-margin-top--small">${data.overview}</p>
      </div>
    </div>
    `;
    this.overlay.insertAdjacentHTML('beforeend', html);
    this.trailer = this.overlay.querySelector('.overlay__trailer');
    this.trailerCross = this.trailer.querySelector('.trailer__cross');
    this.createIframe(data.trailer);
    this.switchOverlay(true);
    this.trailer.classList.add('fade-in');
    this.switchNav(false);
    this.trailerCross.addEventListener('click', this.stopVideo.bind(this));
  }

  createIframe(trailer) {
    this.player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: trailer,
    });
  }

  stopVideo(e) {
    this.switchOverlay(false);
    this.switchTrailer(false);
    this.trailer.remove();
    this.switchNav(true);
  }
  
  seekMovie(handler, e) {
    e.preventDefault();
    const query = this.form.elements['search-movie'].value;
    if (!query) return;
    handler(query);
    this.hideAll(true, e);
    this.form.reset();
  }

  getQuery(handler) {
    this.form.addEventListener('submit', this.seekMovie.bind(this, handler));
    this.searchBtn.addEventListener('click', this.seekMovie.bind(this, handler));
  }
  
  hideAll(hide, e) {
    if (e.target !== this.overlay && !e.target.closest('.overlay__list__item') &&
        e.target !== this.cross && e.target !==this.overlayResults && 
     !hide) return;
    if (this.player) this.stopVideo();
    this.switchOverlay(false);
    this.switchGenres(false);
    this.switchFavourites(false);
    this.switchSearch(false);
    this.switchCross(false);
    this.overlayResults.innerHTML = '';
    this.switchNav(true);
    
  }
  init() {
    this.addStartingAnimations(); 
    this.preventStartingAnimations();
    this.pageLoaded();

    // event listeners
    this.overlay.addEventListener('click', this.hideAll.bind(this, false));
    this.overlayResults.addEventListener('click', this.hideAll.bind(this, false));
  }
}