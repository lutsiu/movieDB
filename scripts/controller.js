import Model from './model.js';
import { moviesForPoster } from './config.js';
import NavigationView from './views/NavigationView.js';
import OverlayView from './views/OverlayView.js';
import MainPageView from './views/MainPageView.js';
import FavouritesView from './views/FavouritesView.js';
class Controller {

  constructor() {
    this.model = new Model();
    this.navigationView = new NavigationView();
    this.overlayView = new OverlayView();
    this.mainPage = new MainPageView();
    this.favourites = new FavouritesView();
  }
  async controlAddFav() {
  
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
  launchYoutubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  async controlTrailer(id) {
    // get data after click
    const data = await this.model.getDataById(id);
    // get trailer
    const trailer = await this.model.getTrailer(id);
    // add trailer to the data
    data.trailer = trailer;
    // create trailer in overlay view
    this.overlayView.createTrailer(data);
  }

  async controlQuery(query) {
    // get results
    await this.model.loadSearchResults(query);
    // load results in overlay
    this.overlayView.createSearchResults(this.model.state.search.results, this.controlTrailer.bind(this));
  }
  chooseRandom(quantity) {
    return Math.floor(Math.random() * quantity);
  }
  async start() {
    this.controlAddFav();
    this.controlMainPage();
    this.launchYoutubeAPI();
    this.mainPage.addHandlerClick(this.controlTrailer.bind(this));
    this.overlayView.getQuery(this.controlQuery.bind(this));
/*     await this.model.loadSearchResults('hobbit');
    console.log(this.model.state.search.results); */
  }
}
const controller = new Controller();
controller.start();

