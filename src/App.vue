<template>
    <div id="app">
        <appHeader></appHeader>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import appHeader from './components/global/Header.vue';

  export default {
    name: 'app',
    components: {appHeader}
  }
</script>

