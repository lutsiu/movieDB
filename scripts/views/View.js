export default class View {
  showEl(show, el, animStart, animEnd) {
    show ? el.classList.replace(animEnd, animStart) : el.classList.replace(animStart, animEnd);
  }
  showInfo(data) {

  }
}