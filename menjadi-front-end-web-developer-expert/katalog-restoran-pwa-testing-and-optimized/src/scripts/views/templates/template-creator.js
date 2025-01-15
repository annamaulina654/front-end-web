import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
<img class="restaurant__poster" src="${
  CONFIG.BASE_IMAGE_URL + restaurant.pictureId
}" alt="${restaurant.name}" />
<h4 class="restaurant__title" id="maincontent">${restaurant.name}</h4>
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

  <div class="resto">

        <p class="location">📍 Kota ${restaurants.city || '-'}</p>
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${
  restaurants.name || '-'
}" width="150">
        <div class="card-content">
          <p class="rating">${restaurants.rating || '-'} ⭐</p>
          <a href="#/detail/${restaurants.id}" class="name restaurant__name">${
  restaurants.name || '-'
}</a>
          <p class="description">${restaurants.description || '-'}</p>
        </div>
  </div>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let skeletons = '';
  for (let i = 0; i < count; i++) {
    skeletons += `
      <div class="resto skeleton">
        <div class="skeleton location"></div>
        <div class="skeleton-image"></div>
        <div class="card-content">
          <div class="skeleton skeleton-rating"></div>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-description">
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
          </div>
        </div>
      </div>
    `;
  }
  return skeletons;
};



const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
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
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createReviewButtonTemplate,
  createSkeletonRestaurantTemplate,
};
