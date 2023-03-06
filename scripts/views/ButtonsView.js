export default class ButtonView {
  changeIcon(button) {
    const icon = button.querySelector('i');
    icon.classList.contains('fa-plus') ? icon.classList.replace('fa-plus', 'fa-check') : icon.classList.replace('fa-check', 'fa-plus'); 
  }
  updateButton(e) {
    const button = e.target.closest('.btn--list');
    this.changeIcon(button);
  }
  updateButtonMainPage() {
    const button = document.querySelector('.home__content .btn--list');
    this.changeIcon(button);
  }
}