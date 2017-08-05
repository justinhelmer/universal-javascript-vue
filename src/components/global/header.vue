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
                    <li>
                        <a href="/keystone">
                            <i class="fa fa-cog"></i><span class="show-for-medium">Admin Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
  export default {
    name: 'header'
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