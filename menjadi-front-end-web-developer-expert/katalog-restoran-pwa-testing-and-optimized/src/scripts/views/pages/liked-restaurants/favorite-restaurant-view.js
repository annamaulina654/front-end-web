import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {

    return `
    <div class="container">
      <h1 class="restaurant" id="maincontent">Favorite Restaurant</h1>
      <input id="query" type="text" placeholder="Search your favorite restaurant..." />
      <div class="card-container" id="restaurants">
      </div>
    </div>
  `;

  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => `${carry  }<article class="restaurant-item">${createRestaurantItemTemplate(restaurant)}</article>`, '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
          <div class="restaurant-item__not__found">
            Tidak ada restoran untuk ditampilkan
          </div>
        `;
  }
}

export default FavoriteRestaurantView;