import Model from './model.js';
import { moviesForPoster } from './config.js';
import NavigationView from './views/NavigationView.js';
import MainPageView from './views/MainPageView.js';
class Controller {

  constructor() {
    this.model = new Model();
    this.navigationView = new NavigationView();
    this.mainPage = new MainPageView();
    
  }
  async controlAddFav() {
    /* await this.model.loadSearchResults('avengers');
    console.log(this.model.state.search.results); */
  }
  controlPagination() {

  }

  async controlMainPage() {
    // add random one of 10 movies as a main poster
    const chosenMovie = moviesForPoster[this.chooseRandom(moviesForPoster.length)];
    // retrieve data about one of the movies
    const movieData = await this.model.getDataById(chosenMovie.id);
    // load data
    this.mainPage.loadPage(movieData);
  }
  async controlInfo(id) {
    // get data after click
    const data = await this.model.getDataById(id);
    // show data with overlay
  }
  chooseRandom(quantity) {
    return Math.floor(Math.random() * quantity);
  }
  async start() {
    this.controlAddFav();
    this.controlMainPage();
    this.mainPage.addHandlerClick(this.controlInfo.bind(this));
/*     await this.model.loadSearchResults('demon slayer');
    console.log(this.model.state.search.results); */
  }
}
const controller = new Controller();
controller.start();

