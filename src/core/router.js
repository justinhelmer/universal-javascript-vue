/**
 * Application router, used by both the client and server.
 *
 * Serves as the basis for code splitting and componentization. The run-time imports will cause bundle split
 * points for webpack, and as a result, load chunks on-demand (when navigating between routes).
 *
 * @see https://ssr.vuejs.org/en/routing.html
 * @see https://webpack.js.org/guides/code-splitting-async/
 * @see https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import
 */

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
        component: () => import('../components/home.vue')
      },
      {
        name: 'items',
        path: '/items',
        component: () => import('../components/items.vue')
      },
      {
        name: 'item',
        path: '/items/:id',
        component: () => import('../components/item.vue')
      }
    ]
  });
}
