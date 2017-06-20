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
      fetch({commit}, options) {
        const base = config.proxy.base || '/api';

        let uri = 'http://localhost:3000' + base + '/' + options.endpoint;

        if (options.id) {
          uri += '/' + options.id;
        }

        return axios.get(uri)
            .then(function (response) {
              if (options.id) {
                commit('setItem', {
                  id: options.id,
                  item: response.data
                });
              } else {
                commit('replaceItems', response.data);
              }
            })
            .catch(error => console.log(error));
      }
    },
    getters: {
      getItemById: state => id => state.items.find(item => item.id === id)
    },
    mutations: {
      setItem (state, { id, item }) {
        const idx = state.items.find(item => item.id === id);

        if (idx) {
          state.items[idx] = item;
        } else {
          state.items.push(item);
        }
      },

      replaceItems (state, items) {
        state.items = items;
      }
    }
  });
}