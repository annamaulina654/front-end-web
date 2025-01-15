import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate, createSkeletonRestaurantTemplate } from '../templates/template-creator';

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
    restaurantCardContainer.innerHTML = createSkeletonRestaurantTemplate(20);
    const restaurant = await TheRestaurantDbSource.showRestaurantList();

    restaurantCardContainer.innerHTML = '';
    restaurant.forEach((restaurants) => {
      const restaurantItem = document.createElement('article');
      restaurantItem.classList.add('restaurant-item');

      restaurantItem.innerHTML += createRestaurantItemTemplate(restaurants);

      restaurantCardContainer.appendChild(restaurantItem);
    });

  },
};

export default Home;