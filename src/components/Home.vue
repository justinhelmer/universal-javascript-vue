<template>
    <div id="home">
        <h1>Welcome</h1>
        <div :class="[css.layout.marginSmall, css.colors.primary]">primary color</div>
        <router-link :to="{ name: 'items' }">Items</router-link>
    </div>
</template>

<script>
  /**
   * An example of styling a component using CSS Modules, importing only the used CSS within each module.
   * This is the recommended method.
   */
  import { marginSmall } from '../css/layout.css';
  import { primary } from '../css/colors.css';

  export default {
    name: 'home',

    data () {
      return {
        css: {
          layout: { marginSmall },
          colors: { primary }
        }
      }
    }
  }
</script>
