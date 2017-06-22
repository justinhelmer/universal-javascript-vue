<template>
    <div id="items">
        <h1>Items</h1>
        <div :class="[css.layout.marginBottomSmall, css.colors.colorSecondary]">secondary color</div>
        <ul>
            <li v-for="item in items" :class="$style.list">
                <router-link :to="{ name: 'item', params: { id: item.id } }">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  // an example of styling a component via JS using CSS Modules, importing only the used CSS
  import { marginBottomSmall } from '../css/layout.css';
  import { colorSecondary } from '../css/colors.css';

  export default {
    name: 'items',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        endpoint: 'items'
      });
    },

    data () {
      return {
        css: {
          layout: { marginBottomSmall },
          colors: { colorSecondary }
        }
      }
    },

    computed: {
      items () {
        return this.$store.state.items;
      }
    }
  }
</script>

<style module>
    @value small as m-small from '../css/layout.css';

    .list {
        display: inline-block;
        margin: 0 m-small 0 0;
    }
</style>