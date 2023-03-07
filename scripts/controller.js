import Model from './model.js';
import { moviesForPoster } from './config.js';
import { chooseRandom } from './config.js';
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
    this.sliderFantasies = new SliderView('fantasies');
    this.sliderComedies = new SliderView('comedies');
    this.sliderAdventures = new SliderView('adventures');
    this.sliderHorrors = new SliderView('horrors');
    this.sliderThrillers = new SliderView('thrillers');
    this.sliderRomances = new SliderView('romances');
    this.sliderHistorical = new SliderView('historical');
    this.sliderWarFilms = new SliderView('war-films');
    this.sliderFilmsForFamilies = new SliderView('films-for-families');
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
    const chosenMovie = moviesForPoster[chooseRandom(moviesForPoster.length)];
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
  async controlGenres() {
    const fantasies = await this.model.getFilmsByGenre(14);
    const comedies = await this.model.getFilmsByGenre(35);
    const adventures = await this.model.getFilmsByGenre(12);
    const horrors = await this.model.getFilmsByGenre(27);
    const thrillers = await this.model.getFilmsByGenre(53);
    const romances = await this.model.getFilmsByGenre(10749);
    const historicals = await this.model.getFilmsByGenre(36);
    const wars = await this.model.getFilmsByGenre(10752);
    const forFamily = await this.model.getFilmsByGenre(10751);
    this.sliderFantasies.createMarkup(fantasies);
    this.sliderComedies.createMarkup(comedies);
    this.sliderAdventures.createMarkup(adventures);
    this.sliderHorrors.createMarkup(horrors);
    this.sliderThrillers.createMarkup(thrillers);
    this.sliderRomances.createMarkup(romances);
    this.sliderHistorical.createMarkup(historicals);
    this.sliderWarFilms.createMarkup(wars);
    this.sliderFilmsForFamilies.createMarkup(forFamily);
    [this.sliderAdventures, this.sliderComedies, this.sliderFantasies, this.sliderFilmsForFamilies, this.sliderHistorical, this.sliderHorrors, this.sliderRomances, this.sliderThrillers, this.sliderWarFilms].forEach(slider => slider.showTrailer(this.controlTrailer.bind(this)));
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
    this.controlGenres();
    
  }
}
const controller = new Controller();
controller.start();

