<template>
    <div id="home">
        <h1>Welcome</h1>
        <div :class="$style.element">primary color</div>
        <router-link :to="{ name: 'items' }">Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style module>
    /* an example of styling a component via CSS using postcss-icss-values, importing only the used CSS */
    @value primary from '../css/colors.css';
    @value small as m-small from '../css/layout.css';

    .element {
        color: primary;
        margin-bottom: m-small;
    }

    .list {
        display: inline-block;
        margin: 0 m-small 0 0;
    }
</style>