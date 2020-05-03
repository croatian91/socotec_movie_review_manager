import Vue from 'vue';
import VueRouter from 'vue-router';
import MovieDetail from '@/components/MovieDetail';
import MovieList from '@/components/MovieList';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'movie-list', component: MovieList },
  { path: '/movies/:id', name: 'movie', component: MovieDetail }
];

export default new VueRouter({
  routes: routes
});
