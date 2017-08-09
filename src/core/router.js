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

import axios from 'axios';
import Vue from 'vue'
import Router from 'vue-router';
import config from '../../config';
import keystoneConfig from '../../config/keystone.config';

Vue.use(Router);

export function createRouter (store) {
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
      },
      {
        name: 'login',
        path: '/user/login',
        component: () => import('../components/login.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.global.user._id) {
            return next(keystoneConfig['signin redirect']);
          }

          next();
        }
      },
      {
        name: 'logout',
        path: '/user/logout',
        beforeEnter: (to, from, next) => {
          if (!store.state.global.user._id) {
            return next(keystoneConfig['signout redirect']);
          }

          axios
            .post(config.api.base + '/user/logout', { proxy: { port: config.port } })
            .then(() => {
              next(keystoneConfig['signout redirect']);
              store.state.global.user._id = null;
            })
            .catch(error => console.log(error));
        }
      },
      {
        name: 'profile',
        path: '/user/profile',
        component: () => import('../components/profile.vue'),
        beforeEnter: (to, from, next) => {
          if (!store.state.global.user._id) {
            return next(keystoneConfig['signin url']);
          }

          next();
        }
      }
    ]
  });
}
