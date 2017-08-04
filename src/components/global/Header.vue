<template>
    <header>
        <router-link :to="{ name: 'home' }"  class="fa fa-home fa-lg">Home</router-link>
    </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="scss" scoped>
    @import '../../css/settings.scss';

    header {
        a {
            color: $green;
            text-decoration: none;
        }
    }
</style>