<template>
    <header>
        <nav class="top-bar">
            <div class="top-bar-left">
                <ul class="menu">
                    <li>
                        <router-link :to="{ name: 'home' }">
                            <i class="fa fa-home"></i><span class="show-for-medium">Home</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="top-bar-right">
                <ul class="menu align-right">
                    <li v-if="uid">
                        <router-link :to="{ name: 'profile' }">
                            <i class="fa fa-user"></i><span class="show-for-medium">Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link v-if="!uid" :to="{ name: 'login' }">
                            <i class="fa fa-sign-in"></i><span class="show-for-medium">Login</span>
                        </router-link>
                        <router-link v-if="uid" :to="{ name: 'logout' }">
                            <i class="fa fa-sign-out"></i><span class="show-for-medium">Logout</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'header',

    computed: {
      uid() {
        return this.$store.state.global.user._id
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../css/settings';

    $white: get-color(white);

    a {  color: $white;  }
    i { margin-right: 1em; }

    @include breakpoint(small only) {
        .menu.align-right li:last-child i {
            margin: 0;
        }
    }
</style>