// eslint-disable-next-line no-undef
const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');


  I.seeElement('.card-content a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.card-content a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// eslint-disable-next-line no-undef
Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.card-content a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    // eslint-disable-next-line no-undef
    I.click(locate('.card-content a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.resto');
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  const matchingRestaurants = titles.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.resto');
  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);
  for (let i = 0; i < matchingRestaurants.length; i++) {

    // eslint-disable-next-line no-undef
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__name').at(i + 1));
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});

// eslint-disable-next-line no-undef
Scenario('adding a customer review to a favorite restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.seeElement('.card-content a');

  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.card-content a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // eslint-disable-next-line no-undef
  I.click(locate('.resto a').first());

  I.seeElement('#reviewButtonContainer button');
  I.click('#reviewButtonContainer button');
  I.seeElement('.popup-box');

  I.fillField('input[name="title"]', 'Favorite Reviewer');
  I.fillField('textarea[name="description"]', 'This is a test review on a favorite restaurant.');

  I.click('.popup-box button');

  I.dontSeeElement('.popup-box.show');

  I.seeElement('.restaurant__reviews ul');
  I.see('Favorite Reviewer', '.restaurant__reviews ul .review-item');
  I.see('This is a test review on a favorite restaurant.', '.restaurant__reviews ul .review-item');
});



