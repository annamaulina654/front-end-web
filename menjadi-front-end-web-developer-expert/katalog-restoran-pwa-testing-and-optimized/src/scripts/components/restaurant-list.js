class RestaurantList extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="catalog">
        <div id="restaurantList">
          <h1 class="restaurant" id="maincontent">Explore Restaurant</h1>
          <div class="card-container" id="card"></div>
        </div>
      </section>
      `;
  }
}

customElements.define('restaurant-list', RestaurantList);