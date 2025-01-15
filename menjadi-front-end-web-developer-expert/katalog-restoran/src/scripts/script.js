// Memilih elemen utama dari dokumen
const main = document.querySelector('main');
const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const drawer = document.querySelector('.nav__list');

// Menangani klik pada menu untuk menampilkan drawer
menu.addEventListener('click', (event) => {
  drawer.classList.toggle('show');
  event.stopPropagation();
});

// Menyembunyikan drawer ketika area hero atau main diklik
hero.addEventListener('click', () => {
  drawer.classList.remove('show');
});

main.addEventListener('click', () => {
  drawer.classList.remove('show');
});

// Mengambil data restoran dari file JSON
fetch('/data/DATA.json')
  .then((response) => response.json())
  .then((data) => {
    const restaurantCardContainer = document.getElementById('card');
    const restaurants = data.restaurants;

    // Membuat elemen HTML untuk setiap restoran
    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement('article');
      restaurantItem.classList.add('restaurant-item');
      
      // Mengisi elemen dengan konten restoran
      restaurantItem.innerHTML = `
        <p class="location">📍 Kota ${restaurant.city}</p>
        <img src="${restaurant.pictureId}" alt="${restaurant.alt}" width="150">
        <div class="card-content">
          <p class="rating">${restaurant.rating} ⭐</p>
          <a href="#" class="name">${restaurant.name}</a>
          <p class="description">${restaurant.description}</p>
        </div>
      `;

      // Menambahkan elemen restoran ke dalam container
      restaurantCardContainer.appendChild(restaurantItem);
    });
  })
  .catch((error) => console.error('Error fetching data:', error));
