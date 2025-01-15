import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<img class="restaurant__poster" src="${
  CONFIG.BASE_IMAGE_URL + restaurant.pictureId
}" alt="${restaurant.name}" />
<h4 class="restaurant__title">${restaurant.name}</h4>
    <div class="restaurant__rating">
      <div class="rating-container">
        <span class="rating-value">${restaurant.rating}</span>
        <div class="rating-stars">
          ${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(
  5 - Math.floor(restaurant.rating)
)}
        </div>
        <p>${restaurant.customerReviews.length} Reviews</p>
      </div>
      <p>${restaurant.city}</p>
    </div>
    <hr>
    <div class="restaurant__description">
      <p>${restaurant.description}</p>
    </div>
    <hr>
    <div class="restaurant__info">
  
      <h4><i class="fa fa-map-marker-alt"></i> ${restaurant.address}
    </h4>
      <p>Kategori : ${restaurant.categories
    .map((category) => category.name)
    .join(', ')}</p>
    </div>

 <div class="restaurant__menus">
  <p>List Menu</p> <!-- This will stay above and not part of the grid -->
  <div class="restaurant__grid">
    <div class="restaurant__foods">
      <p>Foods : ${restaurant.menus.foods
    .map((food) => food.name)
    .join(', ')}<p>
    </div>
    <div class="restaurant__drinks">
      <p>Drinks : ${restaurant.menus.drinks
    .map((drink) => drink.name)
    .join(', ')}</p>
    </div>
  </div>
</div>

    <div class="restaurant__reviews">
      <h3>Customer Reviews</h3>
      <ul>
        ${restaurant.customerReviews
    .map(
      (review) => `
          <li class="review-item">
            <div class="review-header">
              <p><strong>${review.name}</strong> <span class="review-date">(${review.date})</span></p>
            </div>
            <p class="review-text">${review.review}</p>
          </li>
        `
    )
    .join('')}
      </ul>
    </div>
`;

const createRestaurantItemTemplate = (restaurants) => `

        <p class="location">📍 Kota ${restaurants.city}</p>
        <img src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${
  restaurants.name
}" width="150">
        <div class="card-content">
          <p class="rating">${restaurants.rating} ⭐</p>
          <a href="#/detail/${restaurants.id}" class="name">${
  restaurants.name
}</a>
          <p class="description">${restaurants.description}</p>
        </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createReviewButtonTemplate = () => `
  <button aria-label="add review this restaurant" id="reviewButton" class="review">
    <i class="fa fa-comment"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createReviewButtonTemplate,
};
