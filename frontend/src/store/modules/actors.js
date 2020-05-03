import actorService from '@/services/actorService';

const state = {
  all: []
};

export const getters = {};

export const actions = {
  async fetchActors({ commit }) {
    const response = await actorService.fetchActors();

    commit('setActors', response.data.results);
  }
};

export const mutations = {
  setActors(state, actors) {
    state.all = actors;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
