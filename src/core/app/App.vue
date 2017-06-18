<template>
  <div id="app">
    <header>
      <img id="logo" src="../../assets/paragon-logo.png">
      <ul>
        <li v-for="link in links">
          <router-link :to="{ name: link }">{{link | capitalize}}</router-link>
        </li>
      </ul>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import {capitalize} from '../../lib/vue-filters';

  export default {
    name: 'app',
    data () {
      return {
        links: ['home', 'heroes', 'cards']
      }
    },
    filters: {capitalize}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  img#logo {
    width: 80%;
    max-width: 480px;
  }
</style>
