export default class Favouritesview {
  constructor() {
    this.favList = document.querySelector(`.favourites__list`);
    
  }

  createFav(data) {
    const html = `
    <li class="favourites__item" data-film-id="${data.id}>
      <div class="favourites__img" style="background-image: url('${data.poster}')"></div>
      <div class="favourites__content">
        <h4 class="favourites__title title--quaternary">${data.title}<span class="span--year">(${data.release})</span></h4>
        <div class="favourites__info">
          <span class="span--rating-small">Rate: ${data.rating}</span>
          <span class="btn btn--delete-fav">Delete</span>
        </div>
      </div>
    </li>
    `;
    this.favList.insertAdjacentHTML('beforeend', html);
  }
}