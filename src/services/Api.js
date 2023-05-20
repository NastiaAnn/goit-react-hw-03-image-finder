import axios from 'axios';

export class PixabayApi {
  #APIKEY = '35232464-dd394eb40b88e49b2f7bb554e';
  #BASE_API = 'https://pixabay.com';

  page = 1;
  count = 12;

  fetchImages = async imageName => {
    try {
      return await axios.get(`${this.#BASE_API}/api/`, {
        params: {
          q: imageName,
          page: this.page,
          per_page: this.count,
          key: this.#APIKEY,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
