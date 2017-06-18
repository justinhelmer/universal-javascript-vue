<template>
    <div id="heroes">
        <h1>Heroes</h1>
        <ul>
            <li v-for="hero in heroes">
                <router-link :to="{ name: 'hero', params: { id: hero.id } }">{{hero.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'heroes',

    asyncData ({store}) {
      return store.dispatch('fetch', 'v1/heroes');
    },

    computed: {
      heroes () {
        return this.$store.state.items;
      }
    }
  }
</script>
