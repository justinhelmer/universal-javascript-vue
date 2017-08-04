<template>
    <div id="home" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1>Welcome</h1>

            <router-link :to="{ name: 'items' }" class="link">Items</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss" scoped>
    @import '../css/settings';

    $black: get-color(black);

    .link {
        color: $black;
        font-size: 20px;
    }
</style>