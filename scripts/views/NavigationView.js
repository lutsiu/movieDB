import View from "./View.js";
import OverlayView from "./OverlayView.js";
export default class NavigationView extends View {
 constructor() {
    super();
    this.overlay = new OverlayView();
    this.nav = document.querySelector('.nav');
    this.hamburger = this.nav.querySelector('.hamburger');
    this.search = this.nav.querySelector('.search--nav');
    this.favourites = this.nav.querySelector('.fa-heart-nav');
    this.init();
  }

  
  addStartingAnimations() {
    this.nav.classList.add('fade-in');
  }
  
  preventStartingAnimations() {
    this.nav.classList.add('u-preload');
    setTimeout(() => {
      this.nav.classList.remove('u-preload');
    }, 400);
  }
  switchNav(turnOn) {
    if (turnOn) {
      this.showEl(true, this.nav, 'fade-in', 'fade-out');
    } else {
      this.showEl(false, this.nav, 'fade-in', 'fade-out');
    }
  }

  switchHamburger() {
    this.switchNav(false);
    this.overlay.switchOverlay(true);
    this.overlay.switchGenres(true);
  }

  switchSearch() {
    this.switchNav(false);
    this.overlay.switchOverlay(true);
    this.overlay.switchSearch(true);
  }

  switchFavourites() {
    this.switchNav(false);
    this.overlay.switchOverlay(true);
    this.overlay.switchCross(true);
    this.overlay.switchFavourites(true);
  }
  init() {
    this.addStartingAnimations();
    this.preventStartingAnimations();
    this.hamburger.addEventListener('click', this.switchHamburger.bind(this));
    this.search.addEventListener('click', this.switchSearch.bind(this));
    this.favourites.addEventListener('click', this.switchFavourites.bind(this));
  }

}
