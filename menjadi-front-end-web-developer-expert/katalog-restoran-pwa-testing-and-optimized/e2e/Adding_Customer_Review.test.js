// eslint-disable-next-line no-undef
Feature('Customer Reviews');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#');
});

// eslint-disable-next-line no-undef
Scenario('adding a customer review', async ({ I }) => {
  I.seeElement('.card-content a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.card-content a').first();
  I.click(firstRestaurant);

  I.seeElement('#reviewButtonContainer button');
  I.click('#reviewButtonContainer button');

  I.seeElement('.popup-box');
  I.fillField('input[name="title"]', 'Test Reviewer');
  I.fillField('textarea[name="description"]', 'This is a test review with e2e testing.');

  I.click('.popup-box button');

  I.dontSeeElement('.popup-box.show');

  I.seeElement('.restaurant__reviews ul');
  I.see('Test Reviewer', '.restaurant__reviews ul .review-item');
  I.see('This is a test review with e2e testing.', '.restaurant__reviews ul .review-item');
});

