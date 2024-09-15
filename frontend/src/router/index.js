import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';
import AddMovie from '../views/AddMovie.vue';
import loginView from '../views/loginView.vue';

import { useUserStore } from '../stores/UserStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/MovieView/:movieId',
    name: 'Movie',
    component: MovieView,
    props: true,
    meta: { requiresAuth: true }
  },{
    path: '/AddMovie',
    name: 'AddMovie',
    component: AddMovie,
    meta: { requiresAuth: true }
  }, {
    path: '/login',
    name: 'login',
    component: loginView
  }
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})
export default router;