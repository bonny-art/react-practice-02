import axios from 'axios';

const API_KEY = 'oSFuouzqY4a08e1toFUCihl5DgL0L8ZYR7fN90vAEfLTOBh6Yhs8QrYR';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const resp = await axios.get(`search?query=${query}&page=${page}`);
    return resp.data;
  } catch (err) {
    throw new Error(`You have error: ${err.message}`);
  }
};
