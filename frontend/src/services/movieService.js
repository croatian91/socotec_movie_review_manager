import api from '@/services/api';

const baseUrl = 'http://localhost:8000/api/movies';

export default {
  fetchMovies(page = 1) {
    const url = `${baseUrl}/?page=${page}`;

    return api.get(url);
  },
  async updateMovie(movie) {
    return await api.put(`${baseUrl}/${movie.id}/`, movie);
  }
};
