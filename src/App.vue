<template>
    <div id="app">
        <header>
            <router-link :to="{ name: 'home' }">
                <img src="/public/logo.png" :class="linkClass">
            </router-link>
            <div class="title">{{title}}</div>
        </header>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  const config = require('../config');

  // example using CSS modules https://glenmaddern.com/articles/css-modules
  import styles from './App.css';

  export default {
    name: 'app',
    data () {
      return {
        title: config.template.title,
        linkClass: styles.scaled
      }
    }
  }
</script>

<style lang="scss">
    // example using SASS http://sass-lang.com/
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;

        .title {
            font-size: 30px;
            margin: 20px;
        }
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            display: inline-block;
            margin: 0 10px;
        }
    }

    a {
        color: #42b983;
    }
</style>
