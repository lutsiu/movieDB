export default class SliderView {
  constructor(container) {
    this.container = document.getElementById(container);
    this.slider = this.container.querySelector('.genres__container');
    this.buttons = this.container.querySelectorAll('.genres__button');
    this.title = container.replace(container[0], container[0].toUpperCase()).replaceAll('-', ' ');
    this.click = 0;
  }
  init() {
    // determine how many slides will be scrolled per click
    if (window.innerWidth > 992) {
      this.slidesPerClick = 5;
      this.maxClick = Math.ceil(this.slides.length / this.slidesPerClick);
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.remainder = this.slidesPerClick * 10;
    } 
    if (window.innerWidth < 993 && window.innerWidth > 568) {
      this.slidesPerClick = 4;
      this.maxClick = Math.ceil(this.slides.length / this.slidesPerClick);
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.remainder = this.slidesPerClick * 10;
    } 
    if (window.innerWidth < 569) {
      this.slidesPerClick = 2;
      this.maxClick = Math.ceil(this.slides.length / this.slidesPerClick);
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.remainder = this.slidesPerClick * 10;
    }
    // add event listeners
    this.buttons.forEach(btn => {
      btn.addEventListener('click', this.transform.bind(this, btn));
    });
  }
  createMarkup(data) {
    // create slides
    const html = data.map(movie => {
      return `
      <div class="genres__movie" data-film-id="${movie.id}" style="background-image: url('https://image.tmdb.org/t/p/original//${movie.poster_path}')" title="${movie.title}">
      </div>
      `;
    });
    /* insert html */
    html.forEach(markup => {
      this.slider.insertAdjacentHTML('beforeend', markup);
    });
    this.slides = Array.from(this.slider.children);
    /* start programm */
    this.init();
  }
  showTrailer(handler) {
    this.slides.forEach(slide => {
      slide.addEventListener('click', e => {
        const target = e.target.closest('.genres__movie');
        if (!target) return;
        handler(target.dataset.filmId);
      });
    });
  }
  transform(btn, e) {
    if (btn.classList.contains('genres__button--prev')) {
      this.click--;
      if (this.click === -1) {
        this.changeTransform(this.maxClick - 1);
        this.click = this.maxClick - 1;
        return;
      }
      this.changeTransform(this.click);
    }
    if (btn.classList.contains('genres__button--next')) {
      this.click++;
      if (this.click === this.maxClick) {
        this.slider.style.transform = `translateX(0)`;
        this.click = 0;
        return;
      }
      this.changeTransform(this.click);
    }
  }
  changeTransform(click) {
    const distance = click * (this.slideWidth * this.slidesPerClick);
    this.slider.style.transform = `translateX(-${distance + click * this.remainder}px)`;
  }
}