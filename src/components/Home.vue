<template>
    <div id="home">
        <h1>Welcome</h1>
        <router-link :to="{ name: 'items' }" class="link">Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss" scoped>
    @import '../css/settings.scss';

    .link {
        color: $black;
        font-size: 20px;
    }
</style>