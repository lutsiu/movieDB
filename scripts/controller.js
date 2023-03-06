import Model from './model.js';
import { moviesForPoster } from './config.js';
import NavigationView from './views/NavigationView.js';
import OverlayView from './views/OverlayView.js';
import MainPageView from './views/MainPageView.js';
import FavouritesView from './views/FavouritesView.js';
import ButtonView from './views/ButtonsView.js';
import SliderView from './views/SliderView.js';
class Controller {
  constructor() {
    this.model = new Model();
    this.navigationView = new NavigationView();
    this.overlayView = new OverlayView();
    this.mainPage = new MainPageView();
    this.favouritesView = new FavouritesView();
    this.buttonView = new ButtonView();
    this.sliderView = new SliderView();
  }
  controlUpdateDOM() {
    this.model.restoreData();
    this.favouritesView.updateFavs(this.model.state.favMovies);
    this.controlPagination(this.model.state.search.page);
  }


  controlPagination(goToPage) {
    this.favouritesView.renderButtons(this.model.getFavPage(goToPage), this.model.state, this.model.getFavPage.bind(this.model));
  }

  async controlAddFav(id) {
    // get data 
    const data = await this.model.getDataById(id);
    // check if this data is currently on the list 
    if (this.model.state.favMovies.some(movie => movie.id === data.id)) {
      this.model.deleteFromFavs(data);
    } else {
      this.model.addToFavs(data);

    }
    // update favourites
    this.controlUpdateDOM();

  }
  async controlDelFavourite(id) {
    const data = await this.model.getDataById(id);
    this.model.deleteFromFavs(data);
    this.controlUpdateDOM();
  }

  async controlMainPage() {
    // add random one of 10 movies as a main poster
    const chosenMovie = moviesForPoster[this.chooseRandom(moviesForPoster.length)];
    // retrieve data about one of the movies
    const movieData = await this.model.getDataById(chosenMovie.id);
    // load data
    this.mainPage.loadPage(movieData, this.model.state.favMovies);
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
    this.overlayView.createTrailer(data, this.controlAddFav.bind(this), this.buttonView.updateButton.bind(this.buttonView), this.model.state.favMovies);
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
    window.addEventListener('DOMContentLoaded', this.controlUpdateDOM.bind(this));
    this.controlMainPage();
    this.launchYoutubeAPI();
    this.mainPage.addHandlerClick(this.controlTrailer.bind(this), this.controlAddFav.bind(this), this.buttonView.updateButton.bind(this.buttonView));
    this.overlayView.getQuery(this.controlQuery.bind(this));
    this.favouritesView.addHandlerClick(this.controlDelFavourite.bind(this), this.buttonView.updateButtonMainPage.bind(this.buttonView));
    this.favouritesView.showTrailer(this.controlTrailer.bind(this));
    this.favouritesView.buttonPaginationClicked(this.controlPagination.bind(this));

  }
}
const controller = new Controller();
controller.start();

