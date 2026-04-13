import axios from 'axios';

const API_URL = 'https://gabor-dani-gabor.great-site.net/server/api.php';

const movieService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCinemas: async () => {
    const response = await axios.get(`${API_URL}?type=mozi`);
    return response.data;
  },

  create: async (movieData) => {
    const dataToSend = {
      ...movieData,
      szines: movieData.szines === -1 || movieData.szines === true ? 1 : 0,
    };
    const response = await axios.post(API_URL, dataToSend);
    return response.data;
  },

  update: async (id, movieData) => {
    const dataToSend = {
      ...movieData,
      fkod: id,
      szines: movieData.szines === -1 || movieData.szines === true ? 1 : 0,
    };
    const response = await axios.put(API_URL, dataToSend);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}?fkod=${id}`);
    return response.data;
  },
};

export default movieService;
