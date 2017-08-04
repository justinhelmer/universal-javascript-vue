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

<style module>

    .element {
        color: primary;
        margin-bottom: m-small;
    }

    .list {
        display: inline-block;
        margin: 0 m-small 0 0;
    }
</style>