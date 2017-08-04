<template>
    <div id="items">
        <h1>Items</h1>
        <ul class="list">
            <li v-for="item in items">
                <router-link :to="{ name: 'item', params: { id: item.id } }">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'items',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        endpoint: 'items'
      });
    },

    computed: {
      items () {
        return this.$store.state.items;
      }
    }
  }
</script>

<style module>

    .list {
        display: inline-block;
        margin: 0 m-small 0 0;
    }
</style>