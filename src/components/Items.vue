<template>
    <div id="items">
        <h1>Items</h1>
        <div :class="$style.element">secondary color</div>
        <ul>
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
    /**
     * An example of styling a component using "composes". Note that this method is not recommended, because
     * all loaders (and their options) inline, everywhere "composes" is used:
     *
     *      composes: secondary from 'postcss-loader!../css/colors.css';
     *
     * @see https://github.com/justinhelmer/universal-javascript-vue/issues/8
     */
    .element {
        composes: secondary from 'postcss-loader!../css/colors.css';
        composes: margin-small from 'postcss-loader!../css/layout.css';
    }
</style>