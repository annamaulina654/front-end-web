import API_ENDPOINT from '../globals/api-endpoint';
import '../components/loading-spinner';
import swal from 'sweetalert';

class TheRestaurantDbSource {
  static async showRestaurantList() {
    // const loadingSpinner = document.createElement('loading-spinner');
    // document.body.appendChild(loadingSpinner);

    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Failed to load restaurant list:', error);

      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat daftar restoran. Silakan coba lagi nanti.',
        footer: 'Periksa koneksi internet Anda.',
      });

      return [];
    }
  }

  static async detailRestaurant(id) {
    const loadingSpinner = document.createElement('loading-spinner');
    document.body.appendChild(loadingSpinner);

    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to load restaurant details for ID ${id}:`, error);

      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memuat detail restoran. Silakan coba lagi nanti.',
      });

      return null;
    } finally {
      loadingSpinner.remove();
    }
  }

  static async addReview(data) {
    const loadingSpinner = document.createElement('loading-spinner');
    document.body.appendChild(loadingSpinner);

    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      swal({
        icon: 'success',
        title: 'Review Terkirim!',
        text: 'Terima kasih atas review Anda.',
        timer: 3000,
      });

      return responseJson;
    } catch (error) {
      console.error('Failed to add review:', error);

      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengirim ulasan. Silakan coba lagi nanti.',
      });

      return null;
    } finally {
      loadingSpinner.remove();
    }
  }
}

export default TheRestaurantDbSource;