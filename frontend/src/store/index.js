import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import moduleActors from './modules/actors';
import moduleMovies from './modules/movies';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    moduleActors,
    moduleMovies
  },
  strict: debug,
  plugins: [createPersistedState()]
});
