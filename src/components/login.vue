<template>
    <div id="login" class="content">
        <h1>User Login</h1>

        <form v-on:submit.prevent="login">
            <label>Email address<input v-model.trim="email" type="email"></label>
            <label>Password<input v-model="password" type="password"></label>
            <input type="submit" class="button" value="Submit">
        </form>
    </div>
</template>

<script>
  import config from '../../config';

  export default {
    name: 'login',

    data() {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      login() {
        this.$store.dispatch('login', this)
          .then((data) => {
            this.$router.push({ name: 'profile' });
            this.$store.state.global.uid = data._id;
          });
      }
    }
  }
</script>

<style scoped>

</style>