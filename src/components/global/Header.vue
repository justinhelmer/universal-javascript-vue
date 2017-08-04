<template>
    <header>
        <router-link :to="{ name: 'home' }">
            <img src="/public/logo.png" :class="$style.logo">
        </router-link>
    </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style module>
    .logo {  max-width: 320px;  width: 100%;  }
</style>