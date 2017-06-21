<template>
    <div id="item">
        <h1>This is {{item.title}}</h1>
        <div :class="[css.layout.marginSmall, css.colors.tertiary]">tertiary color</div>
        <router-link :to="{ name: 'items' }" :class="css.colors.primary">Back to Items</router-link>
    </div>
</template>

<script>
  import { marginSmall } from '../css/layout.css';
  import { primary, tertiary } from '../css/colors.css';

  export default {
    name: 'item',

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        id: route.params.id,
        endpoint: 'items'
      });
    },

    data () {
      return {
        css: {
          layout: { marginSmall },
          colors: { primary, tertiary }
        }
      }
    },

    computed: {
      item () {
        return this.$store.getters.getItemById(this.$route.params.id);
      }
    }
  }
</script>