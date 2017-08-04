<template>
    <div id="app">
        <header>
            <router-link :to="{ name: 'home' }">
                <img src="/public/logo.png" :class="$style.logo">
            </router-link>
            <div :class="$style.title">{{title}}</div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
  const config = require('../config');

  export default {
    name: 'app',
    data () {
      return {
        title: config.template.title
      }
    }
  }
</script>

