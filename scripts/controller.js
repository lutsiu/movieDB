import Model from './model.js';
import NavigationView from './views/NavigationView.js';
class Controller {

  constructor() {
    this.model = new Model();
    
  }
  async controlAddFav() {
    /* await this.model.loadSearchResults('avengers');
    console.log(this.model.state.search.results); */
  }
  controlPagination() {

  }
  controlHamburger() {
    const navigationView = new NavigationView({
      nav: '.nav',
      overlay:'.overlay',
      searchOverlayBtn:'.search--overlay',
      searchNavBtn: '.search--nav',
      hamburger:'.hamburger',
      navFavs: '.nav__section',
      heart: 'heart'
    });
  }


  async start() {
    this.controlHamburger();
    this.controlAddFav();
    await this.model.loadSearchResults('avengers');
    console.log(this.model.state.search.results);
  }
}
const controller = new Controller();
controller.start();

