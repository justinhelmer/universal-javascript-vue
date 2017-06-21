<template>
    <div id="app">
        <header>
            <router-link :to="{ name: 'home' }">
                <img src="/public/logo.png" :class="$style.logo">
            </router-link>
            <div :class="[css.layout.marginNormal, css.typography.xxLarge]">{{title}}</div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
  const config = require('../config');

  import { marginNormal } from './css/layout.css';
  import { xxLarge } from './css/typography.css';

  export default {
    name: 'app',
    data () {
      return {
        title: config.template.title,
        css: {
          layout: { marginNormal },
          typography: { xxLarge }
        }
      }
    }
  }
</script>

<style module>
    .logo {
        max-width: 320px;
        width: 100%;
    }
</style>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
    }

    h1 {
        font-size: 32px;
        font-weight: normal;
    }

    h2 {
        font-size: 20px;
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
        color: #2c3e50;
    }

    header {
        border-bottom: 2px solid #2c3e50;
    }

    main {
        margin: 40px;
    }
</style>
