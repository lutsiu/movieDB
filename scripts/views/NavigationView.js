import View from "./View.js";
export default class NavigationView extends View{
  constructor({nav, overlay, searchOverlayBtn, searchNavBtn, hamburger, navFavs, heart} = {}) {
    super();
    this.els = {
      nav: document.querySelector(nav),
      overlay: document.querySelector(overlay),
      overlayGenre: document.querySelectorAll('.overlay__list__item'),
      btnSearchOverlay: document.querySelector(searchOverlayBtn),
      btnSearchNav: document.querySelector(searchNavBtn),
      hamburger: document.querySelector(hamburger),
      spans: document.querySelectorAll('.hamburger span'),
      navFavourites: document.querySelector(navFavs),
      navHeart: document.getElementById(heart),
      overlayGenres: document.querySelector('.overlay__movies-genres'),
      overlaySearchBox: document.querySelector('.overlay__search-movie'),
      favourites: document.querySelector('.favourites'),
    }
    this.addStartAnimations = false,
    this.click = false,
    this.init();
  }

  
  // change hamburger styles
  showHamburger(show) {
    if (show) {
      this.els.spans[0].classList.replace('undo-rotate-right','rotate-right');
      this.els.spans[1].classList.replace('fade-in','fade-out');
      this.els.spans[2].classList.replace('undo-rotate-left','rotate-left');
      this.els.hamburger.dataset.showGenres = true;
    } else {
      this.els.spans[0].classList.replace('rotate-right','undo-rotate-right');
      this.els.spans[1].classList.replace('fade-out','fade-in');
      this.els.spans[2].classList.replace('rotate-left', 'undo-rotate-left');
      this.els.hamburger.dataset.showGenres = false;
    }
  }
  // click hamburger
  toggleHamburger(e) {
    this.click = !this.click;
    if (this.click) {
      this.showHamburger(true);
      this.showEl(false, this.els.nav, 'fade-in', 'fade-out'); //navigation
      this.showEl(true, this.els.overlayGenres, 'slide-to-right', 'slide-to-left'); // genres
      this.showEl(true, this.els.overlay, 'fade-in', 'fade-out'); // overlay
    } else {
      this.showHamburger(false);
      this.showEl(false, this.els.overlayGenres, 'slide-to-right', 'slide-to-left'); // genres
      this.showEl(false, this.els.overlay, 'fade-in', 'fade-out'); // overlay
    }
  }
  // click overlay
  toggleOverlay(e) {
    const target = e.target;
    if (!target.classList.contains('overlay') && !target.closest('li')) return;
    this.showHamburger(false);
    this.showEl(false, this.els.overlayGenres, 'slide-to-right', 'slide-to-left'); // genres
    this.showEl(false, this.els.overlay, 'fade-in', 'fade-out'); // overlay
    this.showEl(true, this.els.nav, 'fade-in', 'fade-out'); // navigation
    this.showEl(false, this.els.overlaySearchBox, 'fade-in', 'fade-out'); //search box
    this.showEl(false, this.els.favourites, 'show-favs', 'hide-favs'); // favs
    this.click = false;
  }
  
  // click heart
  toggleFavs(e) {
    this.showEl(false, this.els.nav, 'fade-in', 'fade-out'); //navigation
    this.showEl(true, this.els.overlay, 'fade-in', 'fade-out'); // overlay
    this.showEl(true, this.els.favourites, 'show-favs', 'hide-favs'); // favs
  }
  // click search navigation
  toggleSearchBox(e) {
    e.target.dataset.showSearchBox = true;
    this.showEl(true, this.els.overlay, 'fade-in', 'fade-out'); // overlay
    this.showEl(true, this.els.overlaySearchBox, 'fade-in', 'fade-out'); // searchbox
    this.showEl(false, this.els.nav, 'fade-in', 'fade-out'); //navigation
  }
  // click search Overlay

  init() {
    if (!this.addStartAnimations) {
      this.els.spans[0].classList.add('undo-rotate-right');
      this.els.spans[1].classList.add('fade-in');
      this.els.spans[2].classList.add('undo-rotate-left');
      this.els.overlayGenres.classList.add('slide-to-left');
      this.els.overlay.classList.add('fade-out');
      setTimeout(() => {
        this.els.overlay.classList.remove('u-hidden');
      }, 1000);
      this.els.overlaySearchBox.classList.add('fade-out');
      this.els.nav.classList.add('fade-in');
      this.els.favourites.classList.add('hide-favs');
    }
    this.els.hamburger.addEventListener('click', this.toggleHamburger.bind(this));
    this.els.overlay.addEventListener('click', this.toggleOverlay.bind(this));
    this.els.overlayGenre.forEach(genre => genre.addEventListener('click', this.toggleOverlay.bind(this)));
    this.els.btnSearchNav.addEventListener('click', this.toggleSearchBox.bind(this));
    this.els.navHeart.addEventListener('click', this.toggleFavs.bind(this));
    this.addStartAnimations = true;
  }
}
