<template>
    <div id="app">
        <appHeader></appHeader>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import appHeader from './components/global/header.vue';

  export default {
    name: 'app',
    components: {appHeader},

    beforeMount: function () {
      require('./lib/foundation')();
    }
  }
</script>

<style lang="scss">
    @import './css/settings';
    @import 'foundation';
    @import 'motion-ui';

    @include foundation-global-styles;
    @include foundation-menu;
    @include foundation-top-bar;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;

    @import 'font-awesome';
</style>