import movieService from '@/services/movieService';
import reviewService from '@/services/reviewService';

const state = {
  all: [],
  count: 0,
  pagesVisited: []
};

export const getters = {
  movieById: (state) => (id) => state.all.find((m) => m.id === id)
};

export const actions = {
  async fetchMovies({ commit }, page) {
    const response = await movieService.fetchMovies(page);

    commit('setPagesVisited', page);
    commit('setCount', response.data.count);
    commit('setMovies', response.data.results);
  },
  async updateMovie({ commit }, movie) {
    const response = await movieService.updateMovie(movie);

    commit('updateMovie', response.data);
  },
  async addReview({ commit }, review) {
    const response = await reviewService.addReview(review);

    commit('updateMovie', response.data);
  }
};

export const mutations = {
  setMovies(state, movies) {
    state.all = [...state.all, ...movies];
  },
  updateMovie(state, movie) {
    const idx = state.all.findIndex((m) => m.id === movie.id);

    if (~idx) state.all.splice(idx, 1, movie);
  },
  setPagesVisited(state, page) {
    // Using Set to make sure we don't add duplicates
    state.pagesVisited = [...new Set([...state.pagesVisited, page])];
  },
  setCount(state, count) {
    state.count = count;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
