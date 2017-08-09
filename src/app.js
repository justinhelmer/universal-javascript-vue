import Vue from 'vue';
import App from './app.vue';
import {createRouter} from './core/router';
import {createStore} from './core/store';
import {sync} from 'vuex-router-sync';

export function createApp() {
  const store = createStore();
  const router = createRouter(store);

  sync(store, router);

  const app = new Vue({router, store, render: h => h(App)});

  return {app, router, store};
}
