import axios from 'axios';

const APIKey = '35232464-dd394eb40b88e49b2f7bb554e';
const baseAPI = 'https://pixabay.com';

export const fetchImages = async imageName => {
  return await axios.get(`${baseAPI}/api/`, {
    params: {
      q: imageName,
      page: 1,
      per_page: 12,
      key: APIKey,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });
};
