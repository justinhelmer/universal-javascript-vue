<template>
    <div id="items" class="content">
        <h1>Items</h1>
        <ul class="list">
            <li v-for="item in items">
                <router-link :to="{ name: 'item', params: { id: item._id } }">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'items',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        endpoint: 'items',
        namespace: 'items'
      });
    },

    computed: {
      items () {
        return this.$store.state.items;
      }
    }
  }
</script>
