<template>
    <div id="home">
        <h1>Welcome</h1>
        <router-link :to="{ name: 'items' }">Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>
