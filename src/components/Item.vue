<template>
    <div id="item">
        <h1>This is {{item.title}}</h1>
        <div :class="$style.element">tertiary color</div>
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

<style module>
    /**
     * An example of styling a component using "composes". Note that this method is not recommended, because
     * all loaders (and their options) inline, everywhere "composes" is used:
     *
     *      'postcss-loader!../css/colors.css';
     *
     * @see https://github.com/justinhelmer/universal-javascript-vue/issues/8
     */
    .element {
        composes: colorTertiary from 'postcss-loader!../css/colors.css';
        composes: marginBottomSmall from 'postcss-loader!../css/layout.css';
    }
</style>