import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <main id="maincontent">
            <hero-element></hero-element>
            <services-section></services-section>
            <restaurant-list></restaurant-list>
            <testimoni-section></testimoni-section>
        </main>
      `;
  },

  async afterRender() {
    const restaurantCardContainer = document.getElementById('card');
    const restaurant = await TheRestaurantDbSource.showRestaurantList();

    restaurant.forEach((restaurants) => {
      const restaurantItem = document.createElement('article');
      restaurantItem.classList.add('restaurant-item');

      restaurantItem.innerHTML += createRestaurantItemTemplate(restaurants);

      restaurantCardContainer.appendChild(restaurantItem);
    });

  },
};

export default Home;