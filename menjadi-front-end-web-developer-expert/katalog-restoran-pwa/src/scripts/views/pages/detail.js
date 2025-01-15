import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate,  createReviewButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';


const Detail = {
  async render() {
    return `
      <div class="container">
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>  
        <div class="popup-box">
        <div class="popup">
            <div class="content">
            <header>
                <p></p>
                <i class="uil uil-times"></i>
            </header>
            <form action="#">
                <div class="row title">
                <label for="title">Nama</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    minlength="5"
                    aria-describedby="titleValidation"
                />
                <p
                    id="titleValidation"
                    class="validation-message"
                    aria-live="polite"
                ></p>
                </div>
                <div class="row description">
                <label for="description">Review</label>
                <textarea
                    id="description"
                    name="description"
                    minlength="10"
                    spellcheck="false"
                    aria-describedby="descriptionValidation"
                ></textarea>
                <p
                    id="descriptionValidation"
                    class="validation-message"
                    aria-live="polite"
                ></p>
                </div>
                <button></button>
            </form>
            </div>
            </div>
        </div>
        <div id="reviewButtonContainer"></div>
    </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);

    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
    const reviewButtonContainer = document.querySelector('#reviewButtonContainer');
    reviewButtonContainer.innerHTML = createReviewButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        pictureId: restaurant.restaurant.pictureId,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
      },
    });

    const addBox = document.querySelector('#reviewButtonContainer');
    addBox.addEventListener('click', () => {
      this.showAddPopup('Add Review', 'Save');
    });

    const closeIcon = document.querySelector('.popup-box header i');
    closeIcon.addEventListener('click', () => {
      this.hidePopup();
    });

    const addBtn = document.querySelector('form');
    addBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveReview();
      this.hidePopup();

    });

  },

  showAddPopup(titleText, buttonText) {
    const popupBox = document.querySelector('.popup-box');
    const popupTitle = document.querySelector('.popup-box header p');
    const addBtn = document.querySelector('.popup-box button');
    const body = document.querySelector('body');
    const titleTag = document.querySelector('.popup-box input');

    popupTitle.innerText = titleText;
    addBtn.innerText = buttonText;
    popupBox.classList.add('show');
    body.style.overflow = 'hidden';

    if (window.innerWidth > 660) {
      titleTag.focus();
    }
  },

  hidePopup() {
    const popupBox = document.querySelector('.popup-box');
    const body = document.querySelector('body');
    const titleTag = document.querySelector('.popup-box input');
    const descTag = document.querySelector('.popup-box textarea');
    const addBtn = document.querySelector('.popup-box button');

    titleTag.value = '';
    descTag.value = '';
    titleTag.disabled = false;
    descTag.disabled = false;
    addBtn.style.display = 'block';
    popupBox.classList.remove('show');
    body.style.overflow = 'auto';
  },

  refreshReview(data, date) {
    const reviewContainer = document.querySelector('.restaurant__reviews ul'); // Sesuaikan selector sesuai struktur HTML Anda
    reviewContainer.innerHTML += `
        <li class="review-item">
            <div class="review-header">
                <p><strong>${data.name}</strong> <span class="review-date">(${date})</span></p>
            </div>
            <p class="review-text">${data.review}</p>
        </li>
        `;
  },

  async saveReview() {
    const titleTag = document.querySelector('.popup-box input');
    const descTag = document.querySelector('.popup-box textarea');
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const title = titleTag.value.trim();
    const description = descTag.value.trim();

    if (title || description) {
      const data = {
        id: url.id,
        name: title,
        review: description,
      };

      const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      await TheRestaurantDbSource.addReview(data);

      this.refreshReview(data, date);

    }
  },

};

export default Detail;