<template>
    <div id="items">
        <h1>Items</h1>
        <ul>
            <li v-for="item in items">
                <router-link :to="{ name: 'item', params: { id: item.id } }" class="link">{{item.title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'items',

    asyncData ({store}) {
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

<style lang="scss" scoped>
    .link {
        color: black;
    }
</style>