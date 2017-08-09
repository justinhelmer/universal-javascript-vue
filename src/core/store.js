import axios from 'axios';
import config from '../../config';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore () {
  const base = config.api.base || '/api';
  const defaultOpts = {
    proxy: { port: config.port }
  };

  return new Vuex.Store({
    state: {
      global: {
        user: {
          _id: Vue.cookies.get('uid') || ''
        }
      },
      items: []
    },
    actions: {
      fetch({commit}, {endpoint, store, id, params}) {
        const base = config.api.base || '/api';
        let uri = base + '/' + endpoint;

        if (id) {
          uri += '/' + id;
        }

        return axios
          .get(uri, Object.assign({ params }, defaultOpts))
          .then(function ({data}) {
            if (id && !global) {
              store.commit('setItem', {namespace, id, data});
            } else {
              store.commit('replaceItems', {namespace, data, global});
            }
          })
          .catch(errorHandler);
      }
    },
    getters: {
      getItemById: state => (id, namespace) => state[namespace].find(item => item._id === id)
    },
    mutations: {
      setItem (state, { namespace, id, data }) {
        const idx = state[namespace].findIndex(item => item._id === id);

        if (idx > 0) {
          state[namespace][idx] = data;
        } else {
          state[namespace].push(data);
        }
      },

      replaceItems (state, {namespace, data, global}) {
        if (global) {
          state.global[namespace] = Object.assign({}, data);
        } else {
          state[namespace] = data;
        }
      }
    }
  });

  function errorHandler(err) {
    console.error(err);
  }
}