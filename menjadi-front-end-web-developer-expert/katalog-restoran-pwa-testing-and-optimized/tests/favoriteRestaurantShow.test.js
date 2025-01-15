/* eslint-disable no-undef */
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restautants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {


    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.resto').length).toEqual(2);
        done();
      });
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            description: 'Sebuah resto A',
            pictureId: 3,
            city: 'Surabaya',
            rating: 4,
          },
          {
            id: 22,
            name: 'B',
            description: 'Sebuah resto B',
            pictureId: 4,
            city: 'Madura',
            rating: 5,

          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

});