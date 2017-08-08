import axios from 'axios';
import config from '../../config';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: []
    },
    actions: {
      fetch({commit}, {endpoint, store, id, params}) {
        const base = config.api.base || '/api';
        let uri = base + '/' + endpoint;

        if (id) {
          uri += '/' + id;
        }

        return axios.get(uri, {
            params,
            proxy: { port: config.port }
          })
          .then(function ({data}) {
            if (id) {
              commit('setItem', {store, id, data});
            } else {
              commit('replaceItems', {store, data});
            }
          })
          .catch(error => console.log(error));
      }
    },
    getters: {
      getItemById: state => (id, store) => state[store].find(item => item._id === id)
    },
    mutations: {
      setItem (state, { store, id, data }) {
        const idx = state[store].findIndex(item => item._id === id);

        if (idx > 0) {
          state[store][idx] = data;
        } else {
          state[store].push(data);
        }
      },

      replaceItems (state, {store, data}) {
        state[store] = data;
      }
    }
  });
}