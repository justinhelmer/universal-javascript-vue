<template>
    <div id="item">
        <h1>This is {{item.title}}</h1>
        <router-link :to="{ name: 'items' }">Back to Items</router-link>
    </div>
</template>

<script>
  export default {
    name: 'item',

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        id: route.params.id,
        endpoint: 'items'
      });
    },

    computed: {
      item () {
        return this.$store.getters.getItemById(this.$route.params.id);
      }
    }
  }
</script>