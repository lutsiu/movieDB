export default class Favouritesview {
  constructor() {
    this.favList = document.querySelector(`.favourites__list`);
    this.buttonPaginationClicked();
  }

  updateFavs(movies, htmlBtns) {
    this.favList.innerHTML = '';
    const html = movies.map(data => {
      return `
      <li class="favourites__item" data-film-id="${data.id}">
        <div class="favourites__img">
        <img class ="favourites__poster" src="${data.backdrop}">
        </div>
        <div class="favourites__content">
          <h4 class="favourites__title title--quaternary">${data.title}<span class="span--year">(${data.release})</span></h4>
          <div class="favourites__info">
            <span class="span--rating-small">Rate: ${data.rate}</span>
            <span class="btn btn--delete-fav">Delete</span>
          </div>
        </div>
      </li>
    `;
    });
    html.forEach(data => {
      this.favList.insertAdjacentHTML('beforeend', data);
    });
    // update buttons
    htmlBtns? this.favList.insertAdjacentHTML('beforeend', htmlBtns) : '';
  }
  addHandlerClick(handlerDelete, handlerMainPage) {
    this.favList.addEventListener('click' , e => {
      if (e.target.closest('.btn--delete-fav')) {
        e.stopImmediatePropagation();
        const btnDelete = e.target.closest('.btn--delete-fav');
        const id = btnDelete.closest('.favourites__item').dataset.filmId;
        if (id === document.querySelector('.home__content').dataset.filmId) {
          handlerMainPage();
        }

        handlerDelete(id);
      }
    });
  }
  showTrailer(handler) {
    this.favList.addEventListener('click', e => {
      const target = e.target.closest('.favourites__item');
      if (!target) return;
      handler(target.dataset.filmId);
    });
  }
  // pagination

  createBtn(prev, next, page) {
    if (next && !prev) {
      return `
      <li class="favourites__pagination">
        <div></div>
        <button class="btn btn--pagination btn--pagination--next" data-go-to-page="${page + 1}">Next</button>
      </li>
      `;
    } 
    if (prev && !next) {
      return `
      <li class="favourites__pagination">
        <button class="btn btn--pagination btn--pagination--prev" data-go-to-page="${page - 1}">Previous</button>
      </li>
      `;
    }
    if (prev && next) { 
      return `
      <li class="favourites__pagination">
        <button class="btn btn--pagination btn--pagination--prev" data-go-to-page="${page - 1}">Previous</button>
        <button class="btn btn--pagination btn--pagination--next" data-go-to-page="${page + 1}">Next</button>
      </li>
      `;
    }
  }
  renderButtons(movies, data, getNewFavPage) {
    let curPage = data.search.page;
    const numOfPages = Math.ceil(data.favMovies.length / data.search.resultsPerPage);
    if (movies.length === 0) {
      curPage -= 1;
      movies = getNewFavPage(curPage);
    }
    if (curPage === 1 && numOfPages > 1) {
      const html = this.createBtn(false, true, curPage);
      this.updateFavs(movies, html);
    }
    if (curPage > 1 && curPage < numOfPages) {
      const html = this.createBtn(true, true, curPage);
      this.updateFavs(movies, html);
    }
    if (curPage === numOfPages && numOfPages > 1) {
      const html = this.createBtn(true, false, curPage);
      this.updateFavs(movies, html);
    }
  }
  buttonPaginationClicked(handler) {
    this.favList.addEventListener('click', e => {
      const btn = e.target.closest('.btn--pagination');
      if (!btn) return;
      const goToPage = +btn.dataset.goToPage;

      try {
        handler(goToPage);
      } catch {
        '';
      }
    });
  }
}