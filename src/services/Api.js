import axios from 'axios';

const APIKey = '35232464-dd394eb40b88e49b2f7bb554e';
const baseAPI = 'https://pixabay.com';

export const getImages = async values => {
  const response = await axios.get(`${baseAPI}/api/`, {
    params: {
      q: values.searchedImg,
      page: 1,
      per_page: 12,
      key: APIKey,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });
  return response.data;
};
