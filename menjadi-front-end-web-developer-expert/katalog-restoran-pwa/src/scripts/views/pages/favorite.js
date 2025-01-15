import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div class="container">
        <h1 class="restaurant">Favorite Restaurant</h1>
        <div class="card-container" id="card"></div>
    </div>
      `;
  },

  async afterRender() {
    const restaurantCardContainer = document.getElementById('card');
    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();

    restaurant.forEach((restaurants) => {
      const restaurantItem = document.createElement('article');
      restaurantItem.classList.add('restaurant-item');

      restaurantItem.innerHTML += createRestaurantItemTemplate(restaurants);

      restaurantCardContainer.appendChild(restaurantItem);
    });
  },
};

export default Favorite;