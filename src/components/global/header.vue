<template>
    <header>
        <nav id="nav" class="nav top-bar">
            <ul class="menu">
                <li>
                    <router-link :to="{ name: 'home' }">
                        <i class="fa fa-home"></i><span class="show-for-medium">Home</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="scss" scoped>
    @import '../../css/settings.scss';

    $white: get-color(white);

    a {  color: $white;  }
    i {  margin-right: rem-calc(5); }
</style>