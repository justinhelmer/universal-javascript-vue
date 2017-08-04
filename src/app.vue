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
    components: {appHeader}
  }
</script>

<style lang="scss">
    @import './css/settings.scss';
    @import 'foundation.scss';
    @import 'motion-ui';
    @import 'font-awesome.scss';

    @include foundation-global-styles;
    @include foundation-menu;
    @include foundation-top-bar;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;
</style>