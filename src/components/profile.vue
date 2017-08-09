<template>
    <div id="profile" class="content">
        <h1>{{fullName}}</h1>
        <h3>Email address</h3>
        <div>{{user.email}}</div>
        <hr/>
        <a v-if="user.canAccessKeystone" href="/keystone" class="button">Admin Dashboard</a>
    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'profile',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        id: store.state.global.user._id,
        endpoint: 'users',
        namespace: 'user',
        global: true
      });
    },

    computed: {
      user () {
        return this.$store.state.global.user;
      },

      fullName() {
        const name = this.$store.state.global.user.name;

        if (name) {
          return this.$store.state.global.user.name.first + ' ' + this.$store.state.global.user.name.last;
        }

        return '';
      }
    }
  }
</script>