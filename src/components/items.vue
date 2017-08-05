<template>
    <div id="items" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1>Items</h1>
            <ul class="list">
                <li v-for="item in items">
                    <router-link :to="{ name: 'item', params: { id: item._id } }">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'items',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        endpoint: '/cms/item',
        store: 'items'
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
    $list-margin: 5px;

    ul.list {
        margin: 0;
        padding: 0;

        li {
            display: inline-block;
            margin: 0 $list-margin 0 0;
        }
    }
</style>