<template>
    <div id="home" class="content">
        <h1>Welcome</h1>
        <router-link :to="{ name: 'items' }" class="button">Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>