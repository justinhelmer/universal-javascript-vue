<template>
    <div id="heroes">
        <h1>{{hero.name}}</h1>
    </div>
</template>

<script>
  export default {
    name: 'hero',

    asyncData ({store, route}) {
      return store.dispatch('fetch', 'v1/heroes', route.params.id);
    },

    computed: {
      hero () {
        return this.$store.getters.getItemById(this.$route.params.id);
      }
    }
  }
</script>
