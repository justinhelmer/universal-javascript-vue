import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: () => import('../components/Home.vue')
      },
      {
        name: 'heroes',
        path: '/heroes',
        component: () => import('../components/Heroes.vue')
      },
      {
        name: 'hero',
        path: '/hero/:id',
        component: () => import('../components/Hero.vue')
      },
      {
        name: 'cards',
        path: '/cards',
        component: () => import('../components/Cards.vue')
      }
    ]
  });
}
