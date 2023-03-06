export default class SliderView {
  constructor() {
    this.slider = document.querySelector('.genres__container');
    this.slides = Array.from(this.slider.children);
    this.buttons =  document.querySelectorAll('.genres__button');
    this.click = 0;
    this.init();
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
  transform(btn, e) {
    const slides = this.slides.length;
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
    console.log(distance);
    this.slider.style.transform = `translateX(-${distance + click * this.remainder}px)`;
  }
}